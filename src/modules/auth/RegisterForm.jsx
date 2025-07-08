import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAuth } from '../../lib/auth.jsx';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaPhone, FaUsers } from 'react-icons/fa';

const RegisterForm = ({ onToggleMode, initialRole = 'client' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: initialRole
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate phone number format if provided
    if (formData.phone && !/^(\+639|09)\d{9}$/.test(formData.phone)) {
      setError('Please enter a valid Philippine phone number (09XXXXXXXXX or +639XXXXXXXXX)');
      setLoading(false);
      return;
    }

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone: formData.phone,
        userType: formData.role
      });

      // Redirect based on role
      if (formData.role === 'provider') {
        navigate('/register-provider');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      let errorMessage = 'Registration failed';
      
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        // Handle validation errors from backend
        const validationErrors = err.response.data.errors.map(error => error.msg || error.message);
        errorMessage = validationErrors.join(', ');
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.password && 
           formData.confirmPassword &&
           formData.password === formData.confirmPassword;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            First Name
          </label>
          <Input
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Juan"
            leftIcon={FaUser}
            variant={error ? 'error' : 'default'}
            fullWidth
          />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Last Name
          </label>
          <Input
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Dela Cruz"
            leftIcon={FaUser}
            variant={error ? 'error' : 'default'}
            fullWidth
          />
        </div>
      </div>
      
      {/* Email Field */}
      <div className="space-y-1 sm:space-y-2">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
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
      
      {/* Phone Field */}
      <div className="space-y-1 sm:space-y-2">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <Input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value;
            // Allow only Philippine phone number format
            if (value === '' || /^(\+639|09|9)\d{0,9}$/.test(value)) {
              handleChange(e);
            }
          }}
          placeholder="09XXXXXXXXX or +639XXXXXXXXX"
          leftIcon={FaPhone}
          variant={error ? 'error' : 'default'}
          helpText="Format: 09XXXXXXXXX or +639XXXXXXXXX (Philippine numbers only)"
          fullWidth
        />
      </div>
      
      {/* Account Type */}
      <div className="space-y-1 sm:space-y-2">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
          Account Type
        </label>
        <Select
          name="role"
          value={formData.role}
          onChange={handleChange}
          leftIcon={FaUsers}
          fullWidth
        >
          <option value="client">Client (Looking for services)</option>
          <option value="provider">Service Provider</option>
        </Select>
      </div>
      
      {/* Password Fields */}
      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
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
        
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <Input
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            leftIcon={FaLock}
            rightIcon={showConfirmPassword ? FaEyeSlash : FaEye}
            onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            variant={error ? 'error' : 'default'}
            fullWidth
          />
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-3 py-2 sm:px-4 sm:py-3 rounded-apple-lg text-xs sm:text-sm animate-slide-down">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}
      
      {/* Terms & Conditions */}
      <div className="bg-gray-50 border border-gray-200 rounded-apple-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-600">
        <p className="mb-2">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
          {' '}and acknowledge that you have read our{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
      
      {/* Submit Button */}
      <Button 
        type="submit" 
        size="lg"
        loading={loading}
        disabled={!isFormValid()}
        fullWidth
      >
        Create Account
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
        <p className="text-xs sm:text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            Sign in now
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm; 