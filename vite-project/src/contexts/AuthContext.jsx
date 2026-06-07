import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simula verificação de autenticação ao carregar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simula chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validação simulada
      if (email === 'admin@m74.ao' && password === 'admin123') {
        const userData = {
          id: '1',
          email: 'admin@m74.ao',
          name: 'Fernando Rodrigues',
          role: 'admin',
          avatar: '👤',
          phone: '+244 222 000 000',
          nif: '1234567890',
          company: 'M74 Gestão'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }

      if (email === 'user@m74.ao' && password === 'user123') {
        const userData = {
          id: '2',
          email: 'user@m74.ao',
          name: 'Maria Santos',
          role: 'user',
          avatar: '👩',
          phone: '+244 222 111 111',
          nif: '0987654321',
          company: 'M74 Gestão'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, message: 'Email ou senha inválidos' };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
