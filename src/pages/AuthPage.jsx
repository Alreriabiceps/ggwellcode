import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import LoginForm from '../modules/auth/LoginForm';
import RegisterForm from '../modules/auth/RegisterForm';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const initialRole = searchParams.get('mode') === 'provider' ? 'provider' : 'client';

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isLogin ? 'Welcome Back' : 'Join Bataan Connect'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Sign in to your account' 
              : 'Create your account to get started'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isLogin ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <RegisterForm onToggleMode={toggleMode} initialRole={initialRole} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage; 