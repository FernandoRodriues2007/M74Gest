// Utilitários de validação
export const validations = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  password: (password) => {
    return password.length >= 6;
  },
  
  passwordStrength: (password) => {
    if (password.length < 6) return 'fraca';
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return 'media';
    if (/[!@#$%^&*]/.test(password)) return 'forte';
    return 'media';
  },
  
  phone: (phone) => {
    const re = /^[0-9]{9}$/;
    return re.test(phone.replace(/\D/g, ''));
  },
  
  nif: (nif) => {
    return nif.length >= 10 && /^[0-9]+$/.test(nif);
  },
  
  isEmpty: (value) => {
    return !value || value.trim() === '';
  },
  
  isNumber: (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  
  minLength: (value, length) => {
    return value && value.length >= length;
  },
  
  maxLength: (value, length) => {
    return value && value.length <= length;
  }
};

export const getErrorMessage = (field, rule, value = '') => {
  const errors = {
    email: {
      invalid: 'Email inválido',
      required: 'Email é obrigatório'
    },
    password: {
      invalid: 'Senha deve ter no mínimo 6 caracteres',
      required: 'Senha é obrigatória'
    },
    phone: {
      invalid: 'Telefone inválido (9 dígitos)',
      required: 'Telefone é obrigatório'
    },
    nif: {
      invalid: 'NIF inválido',
      required: 'NIF é obrigatório'
    },
    required: `${field} é obrigatório`,
    minLength: `${field} deve ter no mínimo ${value} caracteres`,
    maxLength: `${field} pode ter no máximo ${value} caracteres`,
  };
  
  return errors[field]?.[rule] || errors[rule] || 'Campo inválido';
};
