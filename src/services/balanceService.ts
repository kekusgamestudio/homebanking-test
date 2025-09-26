import { Account } from '../types/Account';

export const fetchAccountBalances = async (accounts: Account[]): Promise<Account[]> => {
  const accountNumbers = accounts.map(acc => acc.accountNumber).join(',');
  const endpoint = `http://localhost:3000/balance?list=${accountNumbers}`;
  
  try {
    // Simulamos una llamada real al endpoint
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const balanceData = await response.json();
    
    // Actualizamos las cuentas con los saldos obtenidos
    return accounts.map(account => ({
      ...account,
      balance: balanceData[account.accountNumber] || 0
    }));
  } catch (error) {
    // En caso de error de conexión, simulamos datos de respaldo
    console.warn('Error conectando al endpoint, usando datos simulados:', error);
    
    // Simulamos saldos aleatorios para demostración
    return accounts.map(account => ({
      ...account,
      balance: Math.floor(Math.random() * 50000) + 1000
    }));
  }
};