const express = require('express');
const db = require('../db');
const { authenticate, adminOnly } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  const clientes = db.prepare('SELECT * FROM clientes ORDER BY id DESC').all();
  res.json({ success: true, data: clientes });
});

router.post('/', authenticate, (req, res) => {
  const { nome, email, telefone, nif, cidade, status } = req.body;
  if (!nome || !email || !telefone || !nif || !cidade) {
    return res.status(400).json({ success: false, message: 'Nome, email, telefone, NIF e cidade são obrigatórios.' });
  }

  const stmt = db.prepare(
    'INSERT INTO clientes (nome, email, telefone, nif, cidade, status) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(nome, email, telefone, nif, cidade, status || 'Ativo');
  const cliente = db.prepare('SELECT * FROM clientes WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ success: true, data: cliente });
});

router.put('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, nif, cidade, status } = req.body;
  const cliente = db.prepare('SELECT * FROM clientes WHERE id = ?').get(id);
  if (!cliente) {
    return res.status(404).json({ success: false, message: 'Cliente não encontrado.' });
  }

  db.prepare(
    'UPDATE clientes SET nome = ?, email = ?, telefone = ?, nif = ?, cidade = ?, status = ? WHERE id = ?'
  ).run(
    nome || cliente.nome,
    email || cliente.email,
    telefone || cliente.telefone,
    nif || cliente.nif,
    cidade || cliente.cidade,
    status || cliente.status,
    id
  );

  const updatedCliente = db.prepare('SELECT * FROM clientes WHERE id = ?').get(id);
  res.json({ success: true, data: updatedCliente });
});

router.delete('/:id', authenticate, adminOnly, (req, res) => {
  const { id } = req.params;
  const cliente = db.prepare('SELECT id FROM clientes WHERE id = ?').get(id);
  if (!cliente) {
    return res.status(404).json({ success: false, message: 'Cliente não encontrado.' });
  }

  db.prepare('DELETE FROM clientes WHERE id = ?').run(id);
  res.json({ success: true, message: 'Cliente removido com sucesso.' });
});

module.exports = {
  clientesRouter: router
};
