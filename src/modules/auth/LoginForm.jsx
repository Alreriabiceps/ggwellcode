import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../lib/auth.jsx';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';

const LoginForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData);
      const user = response.data.user;
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        // For both providers and clients, go to home page after login
        // They can access dashboard through navigation if needed
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      
      {/* Email Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <Input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          leftIcon={FaEnvelope}
          variant={error ? 'error' : 'default'}
          fullWidth
        />
      </div>
      
      {/* Password Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          leftIcon={FaLock}
          rightIcon={showPassword ? FaEyeSlash : FaEye}
          onRightIconClick={() => setShowPassword(!showPassword)}
          variant={error ? 'error' : 'default'}
          fullWidth
        />
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-apple-lg text-sm animate-slide-down">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}
      
      {/* Forgot Password */}
      <div className="text-right">
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          Forgot Password?
        </button>
      </div>
      
      {/* Submit Button */}
      <Button 
        type="submit" 
        size="lg"
        loading={loading}
        disabled={!formData.email || !formData.password}
        fullWidth
      >
        Sign In
      </Button>
      
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>
      
      {/* Toggle Mode */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            Sign up now
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm; 