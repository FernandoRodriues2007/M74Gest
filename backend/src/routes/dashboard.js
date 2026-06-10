const express = require('express');
const db = require('../db');
const { authenticate, adminOnly } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticate, adminOnly, (req, res) => {
  const totalProdutos = db.prepare('SELECT COUNT(*) AS count FROM produtos').get().count;
  const totalClientes = db.prepare('SELECT COUNT(*) AS count FROM clientes').get().count;
  const totalVendas = db.prepare('SELECT COUNT(*) AS count FROM vendas').get().count;
  const receitaTotal = db.prepare('SELECT IFNULL(SUM(total), 0) AS sum FROM vendas').get().sum;
  const vendasRecentes = db.prepare('SELECT * FROM vendas ORDER BY created_at DESC LIMIT 5').all();

  res.json({
    success: true,
    data: {
      totalProdutos,
      totalClientes,
      totalVendas,
      receitaTotal,
      vendasRecentes
    }
  });
});

module.exports = {
  dashboardRouter: router
};
