import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Task Manager</h1>
        <p>Organize your tasks efficiently</p>

        <button
          onClick={() => loginWithRedirect()}
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Loading...' : 'Login with Auth0'}
        </button>

        <div className="mt-6 pt-6 border-t">
          <p className="text-center text-sm">
            Don't have an account? You can sign up during the login process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
