try {
  require('dotenv').config();
} catch (error) {
  // dotenv is optional when environment vars are provided by the host
}

const express = require('express');
const cors = require('cors');
const path = require('path');
const { authRouter } = require('./routes/auth');
const { produtosRouter } = require('./routes/produtos');
const { clientesRouter } = require('./routes/clientes');
const { vendasRouter } = require('./routes/vendas');
const { dashboardRouter } = require('./routes/dashboard');

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/produtos', produtosRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/vendas', vendasRouter);
app.use('/api/dashboard', dashboardRouter);

if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../../vite-project/dist');
  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});