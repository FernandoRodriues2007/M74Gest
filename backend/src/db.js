const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'm74gest.sqlite');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    phone TEXT,
    nif TEXT,
    company TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL,
    preco REAL NOT NULL,
    quantidade INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Ativo',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    nif TEXT NOT NULL,
    cidade TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Ativo',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT NOT NULL,
    produto TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    preco REAL NOT NULL,
    total REAL NOT NULL,
    data TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pendente',
    funcionario TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Adicionar coluna funcionario se ainda não existir (migração)
try {
  db.prepare('ALTER TABLE vendas ADD COLUMN funcionario TEXT NOT NULL DEFAULT ""').run();
} catch {
  // Coluna já existe, ignorar
}

// Seed do admin
const adminEmail = 'admin@m74.ao';
const adminPassword = 'Admin123!';
const adminName = 'Rodrigues Mateus';

const adminExists = db.prepare('SELECT id, role FROM users WHERE email = ?').get(adminEmail);
if (!adminExists) {
  const passwordHash = bcrypt.hashSync(adminPassword, 10);
  db.prepare(
    'INSERT INTO users (name, email, password_hash, role, phone, nif, company) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(adminName, adminEmail, passwordHash, 'admin', '+244 222 000 000', '1234567890', 'M74 Gestão');
  console.log('Admin seed criado:', adminEmail);
} else if (adminExists.role !== 'admin') {
  db.prepare('UPDATE users SET role = ?, name = ? WHERE id = ?').run('admin', adminName, adminExists.id);
  console.log('Admin atualizado para role admin');
}

module.exports = db;
