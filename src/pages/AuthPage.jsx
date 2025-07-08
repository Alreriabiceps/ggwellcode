import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import LoginForm from '../modules/auth/LoginForm';
import RegisterForm from '../modules/auth/RegisterForm';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const initialRole = searchParams.get('type') === 'provider' ? 'provider' : 'client';

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(0_0_0_/_8%)_1px,_transparent_0)] [background-size:20px_20px] opacity-30"></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-40 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 px-2 sm:px-4">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          
          {/* Header */}
          <div className="text-center mb-6 animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-apple-lg mx-auto mb-4 flex items-center justify-center shadow-apple-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join Rekomendito'}
            </h1>
            <p className="text-sm text-gray-600">
              {isLogin 
                ? 'Sign in to continue your journey' 
                : 'Create your account to get started'
              }
            </p>
          </div>
          
          {/* Auth Card */}
          <Card 
            variant="glass" 
            className="backdrop-blur-apple-lg border-white/30 shadow-apple-xl animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="p-3 sm:p-4 md:p-6">
              {isLogin ? (
                <LoginForm onToggleMode={toggleMode} />
              ) : (
                <RegisterForm onToggleMode={toggleMode} initialRole={initialRole} />
              )}
            </div>
          </Card>
          
          {/* Footer */}
          <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 