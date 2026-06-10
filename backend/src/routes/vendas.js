const express = require('express');
const db = require('../db');
const { authenticate, adminOnly } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  const vendas = db.prepare('SELECT * FROM vendas ORDER BY id DESC').all();
  res.json({ success: true, data: vendas });
});

router.post('/', authenticate, (req, res) => {
  const { cliente, produto, quantidade, preco, data, status } = req.body;
  if (!cliente || !produto || quantidade == null || preco == null || !data) {
    return res.status(400).json({ success: false, message: 'Cliente, produto, quantidade, preço e data são obrigatórios.' });
  }

  const total = Number(quantidade) * Number(preco);
  const stmt = db.prepare(
    'INSERT INTO vendas (cliente, produto, quantidade, preco, total, data, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(cliente, produto, quantidade, preco, total, data, status || 'Pendente');
  const venda = db.prepare('SELECT * FROM vendas WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ success: true, data: venda });
});

router.put('/:id', authenticate, adminOnly, (req, res) => {
  const { id } = req.params;
  const { cliente, produto, quantidade, preco, data, status } = req.body;
  const venda = db.prepare('SELECT * FROM vendas WHERE id = ?').get(id);
  if (!venda) {
    return res.status(404).json({ success: false, message: 'Venda não encontrada.' });
  }

  const updatedQuantidade = quantidade != null ? quantidade : venda.quantidade;
  const updatedPreco = preco != null ? preco : venda.preco;
  const total = updatedQuantidade * updatedPreco;

  db.prepare(
    'UPDATE vendas SET cliente = ?, produto = ?, quantidade = ?, preco = ?, total = ?, data = ?, status = ? WHERE id = ?'
  ).run(
    cliente || venda.cliente,
    produto || venda.produto,
    updatedQuantidade,
    updatedPreco,
    total,
    data || venda.data,
    status || venda.status,
    id
  );

  const updated = db.prepare('SELECT * FROM vendas WHERE id = ?').get(id);
  res.json({ success: true, data: updated });
});

router.delete('/:id', authenticate, adminOnly, (req, res) => {
  const { id } = req.params;
  const venda = db.prepare('SELECT id FROM vendas WHERE id = ?').get(id);
  if (!venda) {
    return res.status(404).json({ success: false, message: 'Venda não encontrada.' });
  }

  db.prepare('DELETE FROM vendas WHERE id = ?').run(id);
  res.json({ success: true, message: 'Venda removida com sucesso.' });
});

module.exports = {
  vendasRouter: router
};
