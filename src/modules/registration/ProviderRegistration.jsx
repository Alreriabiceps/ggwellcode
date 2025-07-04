import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  CameraIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { providerAPI } from '../../lib/api';

const ProviderRegistration = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    businessName: '',
    description: '',
    ownerName: '',
    
    // Contact Info
    email: '',
    phone: '',
    address: '',
    
    // Location
    municipality: '',
    barangay: '',
    
    // Services
    services: [],
    specialties: [],
    
    // Business Details
    yearsExperience: '',
    category: '',
    businessHours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '8:00 AM - 12:00 PM',
      sunday: 'Closed'
    },
    
    // Portfolio
    portfolio: []
  });

  const municipalities = [
    'Abucay', 'Bagac', 'Balanga', 'Dinalupihan', 'Hermosa',
    'Limay', 'Mariveles', 'Morong', 'Orani', 'Orion', 'Pilar', 'Samal'
  ];

  const serviceCategories = [
    'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason',
    'Roofer', 'Landscaper', 'Cleaner', 'Mechanic', 'Welder',
    'Contractor', 'Interior Designer', 'Architect', 'Engineer'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleArrayAdd = (field, value) => {
    if (value && !formData[field].includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Determine primary category from services
      const primaryCategory = formData.services.length > 0 ? formData.services[0] : 'Other';
      
      // Prepare the data for submission to match backend schema
      const submitData = {
        businessName: formData.businessName,
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        municipality: formData.municipality,
        barangay: formData.barangay,
        address: formData.address || '',
        category: primaryCategory,
        services: formData.services,
        specialties: formData.specialties,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        description: formData.description,
        // Additional fields that might be expected
        businessHours: formData.businessHours,
        portfolio: formData.portfolio
      };

      console.log('Submitting provider data:', submitData);
      const response = await providerAPI.register(submitData);
      
      if (response.data && response.data.success) {
        alert('Registration successful! Your profile is now under review.');
        if (onSuccess) {
          onSuccess(response.data);
        } else {
          navigate('/dashboard');
        }
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.[0]?.msg || 
                          'Failed to register. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <BuildingOfficeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
        <p className="text-gray-600">Tell us about your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Business Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Owner Name *
          </label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => handleInputChange('ownerName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Full Name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your business, services, and what makes you unique..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Years of Experience
        </label>
        <input
          type="number"
          value={formData.yearsExperience}
          onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="How many years of experience do you have?"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPinIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Contact & Location</h2>
        <p className="text-gray-600">How can clients reach you?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+63 9XX XXX XXXX"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Municipality *
          </label>
          <select
            value={formData.municipality}
            onChange={(e) => handleInputChange('municipality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Municipality</option>
            {municipalities.map(municipality => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Barangay *
          </label>
          <input
            type="text"
            value={formData.barangay}
            onChange={(e) => handleInputChange('barangay', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter barangay"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Complete Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Street address, landmarks, etc."
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <BuildingOfficeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Services & Specialties</h2>
        <p className="text-gray-600">What services do you offer?</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Services *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {serviceCategories.map(service => (
            <button
              key={service}
              type="button"
              onClick={() => handleArrayAdd('services', service)}
              className={`p-2 text-sm border rounded-md transition-colors ${
                formData.services.includes(service)
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {service}
            </button>
          ))}
        </div>

        {formData.services.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.services.map((service, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {service}
                <button
                  type="button"
                  onClick={() => handleArrayRemove('services', index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specialties (Optional)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add a specialty (e.g., Solar Panel Installation)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleArrayAdd('specialties', e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              const input = e.target.previousElementSibling;
              handleArrayAdd('specialties', input.value);
              input.value = '';
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        {formData.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.specialties.map((specialty, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {specialty}
                <button
                  type="button"
                  onClick={() => handleArrayRemove('specialties', index)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CameraIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Business Hours & Portfolio</h2>
        <p className="text-gray-600">Final details to complete your profile</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Business Hours
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData.businessHours).map(([day, hours]) => (
            <div key={day} className="flex items-center gap-3">
              <span className="w-20 text-sm font-medium capitalize">{day}:</span>
              <input
                type="text"
                value={hours}
                onChange={(e) => handleNestedInputChange('businessHours', day, e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 8:00 AM - 5:00 PM or Closed"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review Your Information</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Business:</strong> {formData.businessName}</p>
          <p><strong>Owner:</strong> {formData.ownerName}</p>
          <p><strong>Location:</strong> {formData.barangay}, {formData.municipality}</p>
          <p><strong>Services:</strong> {formData.services.join(', ')}</p>
          {formData.specialties.length > 0 && (
            <p><strong>Specialties:</strong> {formData.specialties.join(', ')}</p>
          )}
        </div>
      </div>
    </div>
  );

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.businessName && formData.ownerName && formData.description;
      case 2:
        return formData.email && formData.phone && formData.municipality && formData.barangay;
      case 3:
        return formData.services.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!isStepValid(currentStep)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !isStepValid(currentStep)}
                className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegistration; 
