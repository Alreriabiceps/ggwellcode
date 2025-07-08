import React from 'react';
import { useAuth } from '../lib/auth';
import { Navigate } from 'react-router-dom';
import ProviderDashboard from './ProviderDashboard';
import ClientDashboard from './ClientDashboard';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Route to appropriate dashboard based on user role
  if (user.role === 'provider') {
    return <ProviderDashboard />;
  } else if (user.role === 'client') {
    return <ClientDashboard />;
  } else if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else {
    // Default to client dashboard for any other role
    return <ClientDashboard />;
  }
};

export default Dashboard; 