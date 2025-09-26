import React from 'react';
import { Building2, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
  showLogout?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, showLogout = false }) => {
  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-100 shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg shadow-md">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">BancoBooster</h1>
              <p className="text-xs text-blue-600">Confianza y Seguridad</p>
            </div>
          </div>
          
          {showLogout && (
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all duration-200 hover:shadow-md"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Cerrar Sesión</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;