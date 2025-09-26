import React from 'react';
import { CreditCard, PiggyBank, Wallet } from 'lucide-react';
import { Account } from '../types/Account';

interface AccountCardProps {
  account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const getAccountTypeInfo = (type: Account['accountType']) => {
    switch (type) {
      case 'checking':
        return {
          icon: Wallet,
          name: 'Cuenta Corriente',
          color: 'bg-gradient-to-r from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        };
      case 'savings':
        return {
          icon: PiggyBank,
          name: 'Cuenta de Ahorros',
          color: 'bg-gradient-to-r from-green-500 to-green-600',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'credit':
        return {
          icon: CreditCard,
          name: 'Tarjeta de Crédito',
          color: 'bg-gradient-to-r from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700'
        };
    }
  };

  const accountInfo = getAccountTypeInfo(account.accountType);
  const Icon = accountInfo.icon;

  const formatAccountNumber = (number: string) => {
    return number.replace(/(\d{4})(?=\d)/g, '$1-');
  };

  const formatBalance = (balance: number | undefined) => {
    if (balance === undefined) return '---';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(balance);
  };

  return (
    <div className={`${accountInfo.bgColor} rounded-xl p-6 border border-opacity-20 hover:shadow-lg transition-all duration-200 hover:scale-105`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`${accountInfo.color} p-3 rounded-lg shadow-md`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Saldo</p>
          <p className={`text-lg font-bold ${accountInfo.textColor}`}>
            {formatBalance(account.balance)}
          </p>
        </div>
      </div>
      
      <div>
        <h3 className={`font-semibold ${accountInfo.textColor} mb-1`}>
          {accountInfo.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{account.holderName}</p>
        <p className="text-sm font-mono text-gray-500">
          {formatAccountNumber(account.accountNumber)}
        </p>
      </div>
    </div>
  );
};

export default AccountCard;