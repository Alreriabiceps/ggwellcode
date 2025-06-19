import React from 'react';

const ProviderDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your provider profile and applications</p>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Profile Overview</h3>
              <p className="text-sm text-gray-600">Profile stats will go here</p>
            </div>
          </div>
          
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Recent Applications</h3>
              <p className="text-sm text-gray-600">Job applications will go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 