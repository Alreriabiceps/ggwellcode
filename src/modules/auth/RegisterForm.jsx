import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../lib/auth.jsx';

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
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <Input
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Juan"
            error={!!error}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <Input
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Dela Cruz"
            error={!!error}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <Input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={!!error}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <Input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          error={!!error}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Type
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="client">Client (Looking for services)</option>
          <option value="provider">Service Provider</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <Input
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={!!error}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <Input
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={!!error}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
      
      <Button type="submit" className="w-full" loading={loading}>
        Create Account
      </Button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-blue-600 hover:underline text-sm"
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
};

export default RegisterForm; 