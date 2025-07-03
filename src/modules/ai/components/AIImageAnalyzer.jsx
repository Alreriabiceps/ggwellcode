import React, { useState } from 'react';
import { 
  FaBrain, FaCamera, FaUpload, FaCheckCircle, FaSpinner, FaExclamationTriangle,
  FaClock, FaMoneyBillWave, FaTools, FaShieldAlt, FaLightbulb, FaChartLine
} from 'react-icons/fa';

const AIImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('image'); // 'image' or 'text'

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG, WebP)');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      setError(null);
      
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

  const handleAnalyze = async () => {
    if (activeTab === 'image' && !selectedImage) {
      setError('Please select an image to analyze');
      return;
    }

    if (activeTab === 'text' && !description.trim()) {
      setError('Please provide a project description');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      
      if (activeTab === 'image' && selectedImage) {
        formData.append('images', selectedImage);
      }
      
      formData.append('description', description || 'AI analysis from uploaded image');
      formData.append('location', 'Bataan, Philippines');
      formData.append('hasImages', activeTab === 'image' ? 'true' : 'false');

      const response = await fetch('http://localhost:5000/api/ai/analyze-project', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setAnalysisResult(result);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Analysis failed. Please try again.');
      
      // Fallback demo result for development
      setAnalysisResult({
        success: true,
        projectAnalysis: {
          category: 'Repair Work',
          services: ['General Repair', 'Maintenance'],
          estimatedCost: { min: 2000, max: 8000, currency: 'PHP' },
          complexity: 'Medium',
          timeEstimate: '2-5 days',
          aiConfidence: 0.85,
          analysisType: activeTab === 'image' ? 'Image Analysis' : 'Text Analysis'
        },
        imageAnalysis: activeTab === 'image' ? {
          detectedProblem: 'Maintenance or repair work needed',
          urgencyLevel: 'MEDIUM',
          visualEvidence: ['Visual inspection suggests repair requirements'],
          safetyConsiderations: ['Follow safety protocols', 'Use appropriate protective equipment']
        } : null,
        fallback: true
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDescription('');
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Upload/Analysis Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        {/* Tab Selection */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'image'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaCamera className="inline mr-2" />
            Image Analysis
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'text'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaBrain className="inline mr-2" />
            Text Description
          </button>
        </div>

        {/* Image Upload Tab */}
        {activeTab === 'image' && (
          <div className="space-y-6">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('image-upload').click()}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Selected for analysis" 
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600">Click to change image</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <FaUpload className="text-5xl text-gray-400 mx-auto" />
                  <div>
                    <p className="text-xl font-medium text-gray-900 mb-2">Upload Project Image</p>
                    <p className="text-gray-600">
                      Take or upload photos of broken faucets, damaged walls, electrical issues, or any repair needs
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: JPG, PNG, WebP • Max size: 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Context (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe any additional details about the problem or what you see in the image..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Text Description Tab */}
        {activeTab === 'text' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe Your Project
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project in detail... What needs to be fixed, built, or repaired?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={6}
              />
            </div>

            {/* Quick Examples */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Quick examples:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'Broken faucet in kitchen needs replacement',
                  'Electrical outlet not working, possible wiring issue',
                  'Cracked wall needs repair and repainting',
                  'Leaking roof during heavy rain',
                  'Air conditioning unit not cooling properly',
                  'Damaged tiles in bathroom floor'
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setDescription(example)}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-left"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Analyze Button */}
        <div className="mt-6">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (activeTab === 'image' && !selectedImage) || (activeTab === 'text' && !description.trim())}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
          >
            {isAnalyzing ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <FaBrain className="mr-2" />
                Analyze with AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <FaCheckCircle className="text-green-500 text-2xl mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">AI Analysis Results</h3>
            {analysisResult.fallback && (
              <span className="ml-auto text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Demo Mode
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Category */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FaTools className="text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Project Category</h4>
              </div>
              <p className="text-blue-700 font-medium">{analysisResult.projectAnalysis.category}</p>
            </div>

            {/* Estimated Cost */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FaMoneyBillWave className="text-green-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Estimated Cost</h4>
              </div>
              <p className="text-green-700 font-medium">
                ₱{analysisResult.projectAnalysis.estimatedCost.min.toLocaleString()} - 
                ₱{analysisResult.projectAnalysis.estimatedCost.max.toLocaleString()}
              </p>
            </div>

            {/* Time Estimate */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FaClock className="text-purple-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Time Estimate</h4>
              </div>
              <p className="text-purple-700 font-medium">{analysisResult.projectAnalysis.timeEstimate}</p>
            </div>

            {/* Complexity */}
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FaChartLine className="text-orange-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Complexity</h4>
              </div>
              <p className="text-orange-700 font-medium">{analysisResult.projectAnalysis.complexity}</p>
            </div>

            {/* AI Confidence */}
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FaBrain className="text-indigo-600 mr-2" />
                <h4 className="font-semibold text-gray-900">AI Confidence</h4>
              </div>
              <p className="text-indigo-700 font-medium">
                {Math.round(analysisResult.projectAnalysis.aiConfidence * 100)}%
              </p>
            </div>

            {/* Analysis Type */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FaCamera className="text-gray-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Analysis Method</h4>
              </div>
              <p className="text-gray-700 font-medium">{analysisResult.projectAnalysis.analysisType}</p>
            </div>
          </div>

          {/* Services Needed */}
          {analysisResult.projectAnalysis.services && analysisResult.projectAnalysis.services.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FaTools className="mr-2 text-blue-600" />
                Services Needed
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.projectAnalysis.services.map((service, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Image Analysis Details */}
          {analysisResult.imageAnalysis && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FaLightbulb className="mr-2 text-yellow-600" />
                Image Analysis Insights
              </h4>
              
              {analysisResult.imageAnalysis.detectedProblem && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700">Detected Problem:</p>
                  <p className="text-gray-900">{analysisResult.imageAnalysis.detectedProblem}</p>
                </div>
              )}

              {analysisResult.imageAnalysis.urgencyLevel && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700">Urgency Level:</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    analysisResult.imageAnalysis.urgencyLevel === 'HIGH' ? 'bg-red-100 text-red-800' :
                    analysisResult.imageAnalysis.urgencyLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {analysisResult.imageAnalysis.urgencyLevel}
                  </span>
                </div>
              )}

              {analysisResult.imageAnalysis.safetyConsiderations && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaShieldAlt className="mr-1 text-red-500" />
                    Safety Considerations:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisResult.imageAnalysis.safetyConsiderations.map((consideration, index) => (
                      <li key={index} className="text-gray-900 text-sm">{consideration}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Reset Button */}
          <div className="mt-6 text-center">
            <button
              onClick={resetAnalysis}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Analyze Another Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIImageAnalyzer;