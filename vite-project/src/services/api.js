import { API_CONFIG } from '../config';

const getAuthHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw payload;
  }
  return payload;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_CONFIG.baseURL}${path}`, options);
  return parseResponse(response);
};

export const api = {
  login: async (email, password) => {
    return request('/auth/login', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password })
    });
  },

  register: async (payload) => {
    return request('/auth/register', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
  },

  me: async (token) => {
    return request('/auth/me', {
      headers: getAuthHeaders(token)
    });
  },

  updateProfile: async (token, payload) => {
    return request('/auth/me', {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(payload)
    });
  },

  changePassword: async (token, payload) => {
    return request('/auth/me/password', {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(payload)
    });
  },

  getProdutos: async (token) => {
    return request('/produtos', {
      headers: getAuthHeaders(token)
    });
  },

  addProduto: async (token, produto) => {
    return request('/produtos', {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(produto)
    });
  },

  updateProduto: async (token, id, produto) => {
    return request(`/produtos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(produto)
    });
  },

  deleteProduto: async (token, id) => {
    return request(`/produtos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
  },

  getClientes: async (token) => {
    return request('/clientes', {
      headers: getAuthHeaders(token)
    });
  },

  addCliente: async (token, cliente) => {
    return request('/clientes', {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(cliente)
    });
  },

  updateCliente: async (token, id, cliente) => {
    return request(`/clientes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(cliente)
    });
  },

  deleteCliente: async (token, id) => {
    return request(`/clientes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
  },

  getVendas: async (token) => {
    return request('/vendas', {
      headers: getAuthHeaders(token)
    });
  },

  addVenda: async (token, venda) => {
    return request('/vendas', {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(venda)
    });
  },

  updateVenda: async (token, id, venda) => {
    return request(`/vendas/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(venda)
    });
  },

  deleteVenda: async (token, id) => {
    return request(`/vendas/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
  },

  getDashboardStats: async (token) => {
    return request('/dashboard', {
      headers: getAuthHeaders(token)
    });
  }
};
