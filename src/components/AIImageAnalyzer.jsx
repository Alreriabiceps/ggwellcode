import React, { useState, useRef } from 'react';
import { 
  FaCamera, FaUpload, FaBrain, FaCheckCircle, FaExclamationTriangle,
  FaTools, FaClock, FaDollarSign, FaUsers, FaStar
} from 'react-icons/fa';

const AIImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [additionalContext, setAdditionalContext] = useState('');
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear previous results
      setAnalysisResult(null);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('description', additionalContext);

      const response = await fetch('http://localhost:5000/api/ai-smart-matching/analyze-image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Image analysis error:', error);
      // Fallback result for demo
      setAnalysisResult({
        success: true,
        imageAnalysis: {
          detectedProblem: 'Unable to connect to AI service - showing demo result',
          detectedServices: ['Plumbing Repair', 'Faucet Installation'],
          urgencyLevel: 'MEDIUM',
          complexityScore: 6,
          estimatedCost: { min: 1500, max: 5000, currency: 'PHP' },
          timeframe: '2-4 hours',
          requiredSkills: ['Licensed Plumber'],
          tools: ['Wrench set', 'Pipe sealant', 'Replacement parts'],
          materials: ['New faucet parts', 'Pipe fittings', 'Sealant'],
          imageConfidence: 85,
          recommendedProviderTypes: ['Plumber', 'General Handyman']
        },
        suggestedProviders: [
          {
            _id: 1,
            businessName: 'Bataan Plumbing Experts',
            rating: 4.8,
            municipality: 'Balanga',
            services: ['Plumbing', 'Repair']
          }
        ],
        fallback: true
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'EMERGENCY': return 'text-red-600 bg-red-100';
      case 'HIGH': return 'text-orange-600 bg-orange-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mr-4">
            <FaCamera className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            AI Image Analyzer
          </h2>
          <div className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            <FaBrain className="inline mr-2" />
            Powered by Gemini Vision
          </div>
        </div>
        <p className="text-slate-600 text-lg">
          Upload a photo of your problem and get instant AI analysis with provider recommendations
        </p>
      </div>

      {/* Image Upload Section */}
      <div className="mb-8">
        <div 
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <div className="space-y-4">
              <img 
                src={imagePreview} 
                alt="Selected" 
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-600">Click to change image</p>
            </div>
          ) : (
            <div className="space-y-4">
              <FaUpload className="text-4xl text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">Upload an image</p>
                <p className="text-sm text-gray-600">
                  Take or upload a photo of broken faucets, damaged walls, electrical issues, etc.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Additional Context */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Additional Context (Optional)
          </label>
          <textarea
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Describe any additional details about the problem..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyzeImage}
          disabled={!selectedImage || isAnalyzing}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"></div>
              AI Analyzing Image...
            </>
          ) : (
            <>
              <FaBrain className="mr-3" />
              Analyze with AI Vision
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysisResult && analysisResult.success && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <FaCheckCircle className="mr-3 text-green-600" />
              AI Analysis Results
            </h3>

            {/* Problem Detection */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Detected Problem</h4>
                <p className="text-slate-700 bg-white p-3 rounded-lg">
                  {analysisResult.imageAnalysis.detectedProblem}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Urgency Level</h4>
                <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getUrgencyColor(analysisResult.imageAnalysis.urgencyLevel)}`}>
                  <FaExclamationTriangle className="mr-2" />
                  {analysisResult.imageAnalysis.urgencyLevel}
                </span>
              </div>
            </div>

            {/* Services & Details */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                  <FaTools className="mr-2" />
                  Required Services
                </h4>
                <div className="space-y-1">
                  {analysisResult.imageAnalysis.detectedServices.map((service, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-1">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                  <FaClock className="mr-2" />
                  Estimated Time
                </h4>
                <p className="text-slate-700 bg-white p-3 rounded-lg">
                  {analysisResult.imageAnalysis.timeframe}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                  <FaDollarSign className="mr-2" />
                  Estimated Cost
                </h4>
                <p className="text-slate-700 bg-white p-3 rounded-lg">
                  ₱{analysisResult.imageAnalysis.estimatedCost.min.toLocaleString()} - 
                  ₱{analysisResult.imageAnalysis.estimatedCost.max.toLocaleString()}
                </p>
              </div>
            </div>

            {/* AI Confidence */}
            <div className="mb-6">
              <h4 className="font-semibold text-slate-800 mb-2">AI Confidence Score</h4>
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Analysis Confidence</span>
                  <span className="font-bold text-slate-900">{analysisResult.imageAnalysis.imageConfidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${analysisResult.imageAnalysis.imageConfidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Providers */}
          {analysisResult.suggestedProviders && analysisResult.suggestedProviders.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <FaUsers className="mr-3 text-blue-600" />
                Recommended Service Providers ({analysisResult.providerCount})
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisResult.suggestedProviders.map((provider, index) => (
                  <div key={provider._id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">{provider.businessName}</h4>
                      <div className="flex items-center text-yellow-500">
                        <FaStar className="mr-1" />
                        <span className="font-bold">{provider.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{provider.municipality}, Bataan</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.services?.slice(0, 2).map((service, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                    {provider.compatibility && (
                      <div className="mt-2 text-sm">
                        <span className="text-green-600 font-semibold">
                          {provider.compatibility}% Match
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIImageAnalyzer; 