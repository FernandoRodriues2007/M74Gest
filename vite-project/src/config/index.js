// Configurações gerais da aplicação

export const APP_CONFIG = {
  name: 'M74 Gestão',
  version: '1.0.0',
  language: 'pt-AO',
  currency: 'AOA',
  dateFormat: 'dd/MM/yyyy',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'dd/MM/yyyy HH:mm'
};

// Configurações de autenticação
export const AUTH_CONFIG = {
  tokenKey: 'auth_token',
  userKey: 'user',
  expiresIn: 24 * 60 * 60 * 1000, // 24 horas em ms
  refreshThreshold: 5 * 60 * 1000 // 5 minutos
};

// Configurações de validação
export const VALIDATION_RULES = {
  password: {
    minLength: 6,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: false
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    pattern: /^[0-9]{9}$/,
    length: 9
  },
  nif: {
    minLength: 10,
    pattern: /^[0-9]+$/
  }
};

// Configurações de API
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000
};

// Configurações de UI
export const UI_CONFIG = {
  toastDuration: 3000,
  modalAnimationDuration: 300,
  paginationItemsPerPage: 10
};

// Módulos da aplicação
export const MODULES = {
  PRODUTOS: 'produtos',
  CLIENTES: 'clientes',
  VENDAS: 'vendas',
  DASHBOARD: 'dashboard',
  ADMIN: 'admin',
  PERFIL: 'perfil'
};

// Permissões por role
export const PERMISSIONS = {
  admin: [
    'produtos.view',
    'produtos.create',
    'produtos.edit',
    'produtos.delete',
    'clientes.view',
    'clientes.create',
    'clientes.edit',
    'clientes.delete',
    'vendas.view',
    'vendas.create',
    'vendas.edit',
    'vendas.delete',
    'dashboard.view',
    'admin.view',
    'users.manage'
  ],
  user: [
    'produtos.view',
    'clientes.view',
    'vendas.view',
    'vendas.create'
  ]
};

// Status de entidades
export const STATUS = {
  ATIVO: 'Ativo',
  INATIVO: 'Inativo',
  BAIXO: 'Baixo',
  CRITICO: 'Crítico',
  PENDENTE: 'Pendente',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado',
  VENCIDO: 'Vencido'
};

export const STATUS_COLORS = {
  Ativo: 'bg-green-100 text-green-800',
  Inativo: 'bg-red-100 text-red-800',
  Baixo: 'bg-yellow-100 text-yellow-800',
  Crítico: 'bg-red-100 text-red-800',
  Pendente: 'bg-yellow-100 text-yellow-800',
  Concluído: 'bg-green-100 text-green-800',
  Cancelado: 'bg-red-100 text-red-800',
  Vencido: 'bg-red-100 text-red-800',
  Paga: 'bg-green-100 text-green-800'
};
