// Simula uma API para a aplicação
const API_DELAY = 500; // ms

const mockData = {
  produtos: [
    { id: 1, nome: 'Laptop Dell XPS', categoria: 'Eletrônicos', preco: 15000, quantidade: 5, status: 'Ativo' },
    { id: 2, nome: 'Mouse Logitech', categoria: 'Acessórios', preco: 2500, quantidade: 45, status: 'Ativo' },
    { id: 3, nome: 'Teclado Mecânico', categoria: 'Acessórios', preco: 8000, quantidade: 12, status: 'Baixo' },
  ],
  clientes: [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '+244 222 000 001', nif: '1234567890' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '+244 222 000 002', nif: '0987654321' },
  ],
  vendas: [
    { id: 1, cliente: 'João Silva', produto: 'Laptop Dell XPS', quantidade: 1, total: 15000, data: '2024-01-20' },
  ]
};

export const api = {
  // Produtos
  getProdutos: async () => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return { success: true, data: mockData.produtos };
  },

  addProduto: async (produto) => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    mockData.produtos.push({ ...produto, id: Date.now() });
    return { success: true, data: produto };
  },

  updateProduto: async (id, produto) => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    const index = mockData.produtos.findIndex(p => p.id === id);
    if (index !== -1) {
      mockData.produtos[index] = { ...mockData.produtos[index], ...produto };
      return { success: true, data: mockData.produtos[index] };
    }
    return { success: false, error: 'Produto não encontrado' };
  },

  deleteProduto: async (id) => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    mockData.produtos = mockData.produtos.filter(p => p.id !== id);
    return { success: true };
  },

  // Clientes
  getClientes: async () => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return { success: true, data: mockData.clientes };
  },

  addCliente: async (cliente) => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    mockData.clientes.push({ ...cliente, id: Date.now() });
    return { success: true, data: cliente };
  },

  // Vendas
  getVendas: async () => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return { success: true, data: mockData.vendas };
  },

  addVenda: async (venda) => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    mockData.vendas.push({ ...venda, id: Date.now() });
    return { success: true, data: venda };
  },

  // Dashboard
  getDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return {
      success: true,
      data: {
        totalProdutos: mockData.produtos.length,
        totalClientes: mockData.clientes.length,
        totalVendas: mockData.vendas.length,
        receita: mockData.vendas.reduce((sum, v) => sum + v.total, 0)
      }
    };
  }
};
