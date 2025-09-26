export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'credit';
  holderName: string;
  balance?: number;
}

export interface User {
  username: string;
  name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}