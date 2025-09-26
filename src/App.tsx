import { useAuth } from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  const { user, isLoading, error, login, logout, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={logout} showLogout={true} />
        <Dashboard user={user} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header showLogout={false} />
      <LoginForm 
        onLogin={login}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default App;