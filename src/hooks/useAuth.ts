import { useState } from 'react';
import { User, LoginCredentials } from '../types/Account';

// Credenciales válidas
const VALID_CREDENTIALS = {
  username: 'Guillermo',
  password: 'Hola1234'
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError('');
    
    // Simulamos una llamada asíncrona
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (
      credentials.username === VALID_CREDENTIALS.username &&
      credentials.password === VALID_CREDENTIALS.password
    ) {
      setUser({
        username: credentials.username,
        name: 'Guillermo Rodríguez'
      });
      setIsLoading(false);
      return true;
    } else {
      setError('Usuario o contraseña incorrectos');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setError('');
  };

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };
};