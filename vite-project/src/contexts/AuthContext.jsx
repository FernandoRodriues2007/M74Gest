import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextObject';
import { api } from '../services/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('auth_token');

    if (storedToken) {
      api.me(storedToken)
        .then((response) => {
          if (response.success) {
            setUser(response.data);
            setToken(storedToken);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await api.login(email, password);
      if (!result.success) {
        return { success: false, message: result.message || 'Credenciais inválidas' };
      }

      const { user: userData, token: authToken } = result.data;
      localStorage.setItem('auth_token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setToken(authToken);
      setIsAuthenticated(true);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, message: error.message || 'Erro ao autenticar' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (values) => {
    setIsLoading(true);
    try {
      const result = await api.register(values);
      if (!result.success) {
        return { success: false, message: result.message || 'Erro ao registrar usuário' };
      }

      const { user: userData, token: authToken } = result.data;
      localStorage.setItem('auth_token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setToken(authToken);
      setIsAuthenticated(true);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, message: error.message || 'Erro ao registrar usuário' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (updatedData) => {
    setIsLoading(true);
    try {
      const result = await api.updateProfile(token, updatedData);
      if (result.success) {
        setUser(result.data);
        localStorage.setItem('user', JSON.stringify(result.data));
        return { success: true, user: result.data };
      }
      return { success: false, message: result.message || 'Erro ao atualizar perfil.' };
    } catch (error) {
      return { success: false, message: error.message || 'Erro ao atualizar perfil.' };
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (passwordData) => {
    setIsLoading(true);
    try {
      const result = await api.changePassword(token, passwordData);
      if (result.success) {
        return { success: true, message: result.message || 'Senha atualizada com sucesso.' };
      }
      return { success: false, message: result.message || 'Erro ao alterar senha.' };
    } catch (error) {
      return { success: false, message: error.message || 'Erro ao alterar senha.' };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      isAuthenticated,
      login,
      register,
      logout,
      updateUser,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}
