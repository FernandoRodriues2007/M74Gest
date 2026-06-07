// Mensagens da aplicação em português

export const MESSAGES = {
  // Sucesso
  success: {
    login: 'Login realizado com sucesso!',
    logout: 'Você saiu com sucesso!',
    create: 'Registro criado com sucesso!',
    update: 'Registro atualizado com sucesso!',
    delete: 'Registro deletado com sucesso!',
    save: 'Alterações salvas com sucesso!',
    passwordChanged: 'Senha alterada com sucesso!'
  },

  // Erros
  error: {
    login: 'Email ou senha inválidos',
    required: 'Este campo é obrigatório',
    invalidEmail: 'Email inválido',
    invalidPassword: 'Senha deve ter no mínimo 6 caracteres',
    passwordMismatch: 'As senhas não coincidem',
    serverError: 'Erro ao conectar ao servidor',
    networkError: 'Erro de conexão. Verifique sua internet',
    unauthorized: 'Você não tem permissão para acessar isso',
    notFound: 'Recurso não encontrado'
  },

  // Avisos
  warning: {
    unsavedChanges: 'Você tem alterações não salvas',
    deleteConfirm: 'Tem certeza que deseja deletar?',
    logout: 'Tem certeza que deseja sair?'
  },

  // Informações
  info: {
    loading: 'Carregando...',
    noData: 'Nenhum dado encontrado',
    sessionExpired: 'Sua sessão expirou. Faça login novamente'
  }
};

// Validações
export const VALIDATION_MESSAGES = {
  email: {
    required: 'Email é obrigatório',
    invalid: 'Email inválido'
  },
  password: {
    required: 'Senha é obrigatória',
    toShort: 'Senha deve ter no mínimo 6 caracteres',
    weak: 'Senha fraca. Use maiúsculas, números e símbolos'
  },
  name: {
    required: 'Nome é obrigatório',
    toShort: 'Nome deve ter no mínimo 3 caracteres'
  },
  phone: {
    required: 'Telefone é obrigatório',
    invalid: 'Telefone inválido (9 dígitos)'
  },
  nif: {
    required: 'NIF é obrigatório',
    invalid: 'NIF inválido'
  },
  price: {
    required: 'Preço é obrigatório',
    invalid: 'Preço deve ser um número positivo'
  },
  quantity: {
    required: 'Quantidade é obrigatória',
    invalid: 'Quantidade deve ser um número positivo'
  }
};

// Confirmações
export const CONFIRMATIONS = {
  deleteProduct: 'Tem certeza que deseja deletar este produto?',
  deleteClient: 'Tem certeza que deseja deletar este cliente?',
  deleteSale: 'Tem certeza que deseja cancelar esta venda?',
  logout: 'Tem certeza que deseja sair?',
  changePassword: 'Sua senha será alterada. Tem certeza?'
};

// Labels de formulário
export const FORM_LABELS = {
  email: 'Email',
  password: 'Senha',
  currentPassword: 'Senha Atual',
  newPassword: 'Nova Senha',
  confirmPassword: 'Confirmar Senha',
  name: 'Nome Completo',
  phone: 'Telefone',
  nif: 'NIF',
  company: 'Empresa',
  city: 'Cidade',
  productName: 'Nome do Produto',
  category: 'Categoria',
  price: 'Preço',
  quantity: 'Quantidade',
  status: 'Status',
  date: 'Data',
  description: 'Descrição'
};

// Placeholders
export const PLACEHOLDERS = {
  email: 'seu@email.com',
  password: '••••••••',
  name: 'João da Silva',
  phone: '+244 222 000 000',
  nif: '1234567890',
  search: 'Pesquisar...',
  productName: 'Digite o nome do produto'
};

// Tooltips
export const TOOLTIPS = {
  passwordStrength: 'Mínimo 6 caracteres. Use maiúsculas, números e símbolos para maior segurança',
  nifFormat: 'Insira seu NIF sem espaços ou caracteres especiais',
  phoneFormat: 'Insira seu telefone com 9 dígitos'
};
