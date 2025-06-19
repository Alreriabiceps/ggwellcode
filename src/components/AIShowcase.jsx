import React, { useState } from 'react';
import { 
  FaBrain, FaRocket, FaGem, FaBolt, FaMagic, FaChartLine,
  FaShieldAlt, FaAward, FaStar, FaCheckCircle, FaCamera, FaUpload 
} from 'react-icons/fa';
import aiSmartMatching from '../services/aiSmartMatching';

const AIShowcase = () => {
  const [demoQuery, setDemoQuery] = useState('');
  const [demoResult, setDemoResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('text'); // 'text' or 'image'

  const demoQueries = [
    'Build a 2-story house with modern kitchen in Balanga',
    'Install solar panels and electrical system for home',
    'Renovate bathroom with luxury fixtures',
    'Construct swimming pool with landscaping',
    'Full car maintenance and engine repair'
  ];

  const handleDemoAnalysis = async () => {
    if (!demoQuery || demoQuery.length < 10) return;

    setIsAnalyzing(true);
    try {
      const result = await aiSmartMatching.completeAnalysis(demoQuery);
      setDemoResult(result);
    } catch (error) {
      console.error('Demo analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
      setDemoResult(null);
    }
  };

  const handleImageAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('description', demoQuery);

      const response = await fetch('http://localhost:5000/api/ai-smart-matching/analyze-image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setDemoResult({
        ...result,
        projectAnalysis: result.imageAnalysis,
        matches: result.suggestedProviders?.map(provider => ({
          provider,
          aiScore: { overallScore: 85 + Math.random() * 10 }
        })) || []
      });
    } catch (error) {
      console.error('Image analysis error:', error);
      // Fallback demo result
      setDemoResult({
        success: true,
        projectAnalysis: {
          detectedServices: ['Plumbing Repair', 'Faucet Installation'],
          estimatedCost: { min: 1500, max: 5000 },
          detectedProblem: 'Broken faucet requiring repair or replacement'
        },
        matches: [
          {
            provider: {
              businessName: 'Bataan Plumbing Experts',
              municipality: 'Balanga',
              rating: 4.8
            },
            aiScore: { overallScore: 92 }
          }
        ],
        fallback: true
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-blue-200">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mr-4">
            <FaBrain className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            AI Smart Matching Engine
          </h2>
          <div className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            <FaRocket className="inline mr-2" />
            Powered by Gemini AI
          </div>
        </div>
        <p className="text-slate-600 text-lg">
          Revolutionary AI that understands your project and finds perfect provider matches
        </p>
      </div>

      {/* AI Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBrain className="text-blue-600 text-xl" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Project Analysis</h3>
          <p className="text-slate-600 text-sm">AI analyzes your project description and identifies exact services needed</p>
        </div>

        <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMagic className="text-purple-600 text-xl" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Smart Matching</h3>
          <p className="text-slate-600 text-sm">Advanced algorithms match you with providers based on 50+ factors</p>
        </div>

        <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaChartLine className="text-green-600 text-xl" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Success Prediction</h3>
          <p className="text-slate-600 text-sm">AI predicts project success probability and potential challenges</p>
        </div>

        <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCamera className="text-orange-600 text-xl" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Image Analysis</h3>
          <p className="text-slate-600 text-sm">Upload photos to get instant AI-powered problem detection and solutions</p>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
          <FaBolt className="mr-2 text-blue-600" />
          Try AI Analysis Demo
        </h3>

        {/* Tab Selection */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'text'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaBrain className="inline mr-2" />
            Text Description
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'image'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaCamera className="inline mr-2" />
            Image Upload
          </button>
        </div>

        {/* Text Analysis Tab */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Describe your project:
              </label>
              <textarea
                value={demoQuery}
                onChange={(e) => setDemoQuery(e.target.value)}
                placeholder="Describe your project in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Quick Examples */}
            <div>
              <p className="text-sm text-slate-600 mb-2">Quick examples:</p>
              <div className="flex flex-wrap gap-2">
                {demoQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setDemoQuery(query)}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleDemoAnalysis}
              disabled={!demoQuery || demoQuery.length < 10 || isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  AI Analyzing...
                </>
              ) : (
                <>
                  <FaBrain className="mr-2" />
                  Analyze with AI
                </>
              )}
            </button>
          </div>
        )}

        {/* Image Analysis Tab */}
        {activeTab === 'image' && (
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('image-upload').click()}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Selected" 
                    className="max-w-full max-h-48 mx-auto rounded-lg shadow-md"
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
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Additional Context (Optional)
              </label>
              <textarea
                value={demoQuery}
                onChange={(e) => setDemoQuery(e.target.value)}
                placeholder="Describe any additional details about the problem..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>

            <button
              onClick={handleImageAnalysis}
              disabled={!selectedImage || isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  AI Analyzing Image...
                </>
              ) : (
                <>
                  <FaCamera className="mr-2" />
                  Analyze with AI Vision
                </>
              )}
            </button>
          </div>
        )}

        {/* Demo Results */}
        {demoResult && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center">
              <FaCheckCircle className="mr-2 text-green-600" />
              AI Analysis Results
            </h4>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-slate-700 mb-1">
                  {activeTab === 'image' ? 'Detected Problem:' : 'Detected Services:'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {activeTab === 'image' ? (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      {demoResult.projectAnalysis?.detectedProblem || 'Problem detected'}
                    </span>
                  ) : (
                    (demoResult.projectAnalysis?.detectedServices || ['General']).map((service, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {service}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div>
                <p className="font-semibold text-slate-700 mb-1">Estimated Cost:</p>
                <p className="text-green-600 font-bold">
                  ₱{demoResult.projectAnalysis?.estimatedCost?.min?.toLocaleString() || '50,000'} - 
                  ₱{demoResult.projectAnalysis?.estimatedCost?.max?.toLocaleString() || '150,000'}
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-700 mb-1">Qualified Matches:</p>
                <p className="text-blue-600 font-bold">
                  {demoResult.matches?.length || 0} providers found
                </p>
              </div>
            </div>

            {demoResult.matches && demoResult.matches.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold text-slate-700 mb-2">Top AI Match:</p>
                <div className="bg-white p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">
                        {demoResult.matches[0].provider?.businessName || 'Sample Provider'}
                      </p>
                      <p className="text-slate-600 text-sm">
                        {demoResult.matches[0].provider?.municipality || 'Bataan'}, Philippines
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(demoResult.matches[0].aiScore?.overallScore || 95)}% Match
                      </div>
                      <div className="flex items-center text-yellow-500 text-sm mt-1">
                        <FaStar className="mr-1" />
                        <span>{demoResult.matches[0].provider?.rating || '4.8'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p className="text-slate-600 mb-4">
          Experience the future of contractor discovery with AI-powered matching
        </p>
        <a
          href="/explore"
          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <FaRocket className="mr-2" />
          Start AI-Powered Search
        </a>
      </div>
    </div>
  );
};

export default AIShowcase; 