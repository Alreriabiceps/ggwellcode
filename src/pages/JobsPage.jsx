import React from 'react';

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Jobs</h1>
        <p className="text-gray-600 mb-8">Post jobs and manage your requests</p>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Post Job Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Post a Job</h3>
              <p className="text-sm text-gray-600">Job posting form will go here</p>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Your Jobs</h3>
              <p className="text-sm text-gray-600">Job listings will go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage; 