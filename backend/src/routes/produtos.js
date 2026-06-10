const express = require('express');
const db = require('../db');
const { authenticate, adminOnly } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  const produtos = db.prepare('SELECT * FROM produtos ORDER BY id DESC').all();
  res.json({ success: true, data: produtos });
});

router.post('/', authenticate, adminOnly, (req, res) => {
  const { nome, categoria, preco, quantidade, status } = req.body;
  if (!nome || !categoria || preco == null || quantidade == null) {
    return res.status(400).json({ success: false, message: 'Nome, categoria, preço e quantidade são obrigatórios.' });
  }

  const stmt = db.prepare(
    'INSERT INTO produtos (nome, categoria, preco, quantidade, status) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(nome, categoria, preco, quantidade, status || 'Ativo');
  const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ success: true, data: produto });
});

router.put('/:id', authenticate, adminOnly, (req, res) => {
  const { id } = req.params;
  const { nome, categoria, preco, quantidade, status } = req.body;
  const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
  if (!produto) {
    return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
  }

  db.prepare(
    'UPDATE produtos SET nome = ?, categoria = ?, preco = ?, quantidade = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(
    nome || produto.nome,
    categoria || produto.categoria,
    preco != null ? preco : produto.preco,
    quantidade != null ? quantidade : produto.quantidade,
    status || produto.status,
    id
  );

  const updatedProduto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
  res.json({ success: true, data: updatedProduto });
});

router.delete('/:id', authenticate, adminOnly, (req, res) => {
  const { id } = req.params;
  const produto = db.prepare('SELECT id FROM produtos WHERE id = ?').get(id);
  if (!produto) {
    return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
  }

  db.prepare('DELETE FROM produtos WHERE id = ?').run(id);
  res.json({ success: true, message: 'Produto removido com sucesso.' });
});

module.exports = {
  produtosRouter: router
};
