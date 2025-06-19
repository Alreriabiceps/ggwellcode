import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { jobAPI } from '../../lib/api';
import { SERVICE_CATEGORIES, BATAAN_MUNICIPALITIES, URGENCY_LEVELS } from '../../lib/utils';
import { useGeolocation } from '../../hooks/useGeolocation';

const JobForm = ({ onJobCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'medium',
    budget: {
      min: '',
      max: '',
      type: 'fixed'
    },
    location: {
      address: '',
      barangay: '',
      municipality: 'Balanga'
    },
    timeline: {
      startDate: '',
      duration: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { latitude, longitude } = useGeolocation();

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const jobData = {
        ...formData,
        location: {
          ...formData.location,
          ...(latitude && longitude && {
            coordinates: { latitude, longitude }
          })
        }
      };

      const response = await jobAPI.create(jobData);
      
      if (onJobCreated) {
        onJobCreated(response.data.data.job);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        urgency: 'medium',
        budget: { min: '', max: '', type: 'fixed' },
        location: { address: '', barangay: '', municipality: 'Balanga' },
        timeline: { startDate: '', duration: '' }
      });

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <Input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., House Painting Job"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {SERVICE_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the work you need done..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Municipality *
              </label>
              <select
                required
                value={formData.location.municipality}
                onChange={(e) => handleInputChange('location.municipality', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BATAAN_MUNICIPALITIES.map(municipality => (
                  <option key={municipality} value={municipality}>
                    {municipality}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Barangay
              </label>
              <Input
                type="text"
                value={formData.location.barangay}
                onChange={(e) => handleInputChange('location.barangay', e.target.value)}
                placeholder="Enter barangay"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget (PHP)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                value={formData.budget.min}
                onChange={(e) => handleInputChange('budget.min', e.target.value)}
                placeholder="Min"
              />
              <Input
                type="number"
                value={formData.budget.max}
                onChange={(e) => handleInputChange('budget.max', e.target.value)}
                placeholder="Max"
              />
              <select
                value={formData.budget.type}
                onChange={(e) => handleInputChange('budget.type', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urgency
            </label>
            <select
              value={formData.urgency}
              onChange={(e) => handleInputChange('urgency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {URGENCY_LEVELS.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <Input
                type="date"
                value={formData.timeline.startDate}
                onChange={(e) => handleInputChange('timeline.startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <Input
                type="text"
                value={formData.timeline.duration}
                onChange={(e) => handleInputChange('timeline.duration', e.target.value)}
                placeholder="e.g., 2 days, 1 week"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full">
            Post Job
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobForm; 