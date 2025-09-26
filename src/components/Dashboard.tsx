import React, { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Account } from '../types/Account';
import { mockAccounts } from '../data/mockAccounts';
import { fetchAccountBalances } from '../services/balanceService';
import AccountCard from './AccountCard';

interface DashboardProps {
  user: { name: string; username: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [balanceError, setBalanceError] = useState<string>('');

  const handleFetchBalances = async () => {
    setIsLoadingBalances(true);
    setBalanceError('');
    
    try {
      const accountsWithBalances = await fetchAccountBalances(accounts);
      setAccounts(accountsWithBalances);
    } catch (error) {
      setBalanceError('Error al consultar los saldos. Intente nuevamente.');
      console.error('Error fetching balances:', error);
    } finally {
      setIsLoadingBalances(false);
    }
  };

  const hasBalances = accounts.some(account => account.balance !== undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bienvenido, {user.name}
          </h1>
          <p className="text-gray-600">Gestiona tus cuentas bancarias de forma segura</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Mis Cuentas</h2>
            <div className="text-sm text-gray-500">
              {accounts.length} cuenta{accounts.length !== 1 ? 's' : ''} registrada{accounts.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-gray-600">
                {hasBalances ? (
                  <span className="flex items-center text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Saldos actualizados
                  </span>
                ) : (
                  <span className="flex items-center text-amber-600">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    Saldos no consultados
                  </span>
                )}
              </div>
              
              <button
                onClick={handleFetchBalances}
                disabled={isLoadingBalances}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 ${isLoadingBalances ? 'animate-spin' : ''}`} />
                <span>
                  {isLoadingBalances ? 'Consultando...' : 'Consultar Saldos'}
                </span>
              </button>
            </div>
            
            {balanceError && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{balanceError}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Información sobre consulta de saldos:</p>
              <p>El sistema intenta conectar a <code className="bg-blue-100 px-1 rounded text-xs">http://localhost:3000/balance</code>. 
              En caso de no poder conectar, se mostrarán saldos simulados para demostración.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;