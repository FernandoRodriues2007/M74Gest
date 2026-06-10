const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'm74gest-secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';

function sanitizeUser(user) {
  if (!user) return null;
  const { password_hash, ...safeUser } = user;
  return safeUser;
}

router.post('/register', async (req, res) => {
  const { name, email, password, phone, nif, company } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Nome, email e senha são obrigatórios.' });
  }

  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Já existe um usuário com esse email.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const insert = db.prepare(
    'INSERT INTO users (name, email, password_hash, role, phone, nif, company) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const result = insert.run(name, email, passwordHash, 'user', phone || '', nif || '', company || '');
  const user = db.prepare('SELECT id, name, email, role, phone, nif, company FROM users WHERE id = ?').get(result.lastInsertRowid);

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

  res.status(201).json({ success: true, data: { user, token } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email e senha são obrigatórios.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
  }

  const safeUser = sanitizeUser(user);
  const token = jwt.sign({ id: safeUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  res.json({ success: true, data: { user: safeUser, token } });
});

router.get('/me', authenticate, (req, res) => {
  res.json({ success: true, data: req.user });
});

router.put('/me', authenticate, (req, res) => {
  const { name, phone, nif, company } = req.body;
  const update = db.prepare(
    'UPDATE users SET name = ?, phone = ?, nif = ?, company = ? WHERE id = ?'
  );
  update.run(name || req.user.name, phone || req.user.phone, nif || req.user.nif, company || req.user.company, req.user.id);

  const user = db.prepare('SELECT id, name, email, role, phone, nif, company FROM users WHERE id = ?').get(req.user.id);
  res.json({ success: true, data: user });
});

router.put('/me/password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Senha atual e nova senha são obrigatórias.' });
  }

  const userRecord = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
  const matches = await bcrypt.compare(currentPassword, userRecord.password_hash);
  if (!matches) {
    return res.status(401).json({ success: false, message: 'Senha atual incorreta.' });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, req.user.id);
  res.json({ success: true, message: 'Senha alterada com sucesso.' });
});

module.exports = {
  authRouter: router
};
