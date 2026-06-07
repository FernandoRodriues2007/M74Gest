// Middleware de segurança

// Sanitização XSS - Remove scripts e tags perigosas
export const sanitizeInput = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Validação de CSRF (simulada)
export const generateCSRFToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Rate limiting simples em cliente
class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = {};
  }

  isLimited(key) {
    const now = Date.now();
    if (!this.attempts[key]) {
      this.attempts[key] = [];
    }

    // Remove tentativas antigas
    this.attempts[key] = this.attempts[key].filter(time => now - time < this.windowMs);

    if (this.attempts[key].length >= this.maxAttempts) {
      return true;
    }

    this.attempts[key].push(now);
    return false;
  }
}

export const loginLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 tentativas em 15 minutos

// Validação de dados sensíveis
export const isValidPassword = (password) => {
  // Mínimo 6 caracteres
  if (password.length < 6) return false;
  // Não armazenar em logs
  return true;
};

// Proteção contra localStorage
export const secureStorage = {
  set: (key, value) => {
    try {
      // Não armazenar senhas em localStorage em produção
      if (key.toLowerCase().includes('password')) {
        console.warn('⚠️ Aviso de Segurança: Senhas não devem ser armazenadas no localStorage');
        return false;
      }
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Erro ao armazenar dados:', e);
      return false;
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Erro ao recuperar dados:', e);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Erro ao remover dados:', e);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Erro ao limpar localStorage:', e);
      return false;
    }
  }
};

// Validação de integridade de dados
export const validateDataIntegrity = (data, schema) => {
  for (const key in schema) {
    if (!(key in data)) {
      return false;
    }
    if (typeof data[key] !== schema[key]) {
      return false;
    }
  }
  return true;
};

// Log de segurança
export const securityLog = (action, details, severity = 'info') => {
  const timestamp = new Date().toISOString();
  const log = {
    timestamp,
    action,
    details,
    severity,
    userAgent: navigator.userAgent
  };

  // Em produção, enviar para servidor de logs
  if (import.meta.env.DEV) {
    console.log(`[${severity.toUpperCase()}] ${action}:`, details);
  }

  return log;
};

// Criptografia básica (simulada)
export const encrypt = (text) => {
  return btoa(text); // Base64 - apenas para exemplo, usar library real em produção
};

export const decrypt = (text) => {
  return atob(text); // Base64 - apenas para exemplo
};
