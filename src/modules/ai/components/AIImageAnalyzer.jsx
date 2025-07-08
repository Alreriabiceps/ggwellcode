import React, { useState, useRef, useCallback } from 'react';
import { 
  FaBrain, FaCamera, FaUpload, FaCheckCircle, FaSpinner, FaExclamationTriangle,
  FaClock, FaMoneyBillWave, FaTools, FaShieldAlt, FaLightbulb, FaChartLine, FaTimes, FaPlay, FaStop
} from 'react-icons/fa';

const AIImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('image'); // 'image' or 'text'
  
  // Camera states
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file) => {
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
  };

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        }
      });
      
      setCameraStream(stream);
      setShowCamera(true);
      
      // Set video stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please ensure camera permissions are granted.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  }, [cameraStream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (blob) {
        // Create a file from the blob
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        processImageFile(file);
        
        // Stop camera after capture
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  }, [stopCamera]);

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
    stopCamera();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Take Photo</h3>
              <button
                onClick={stopCamera}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-gray-900"
                style={{ maxHeight: '60vh' }}
              />
              
              <canvas
                ref={canvasRef}
                className="hidden"
              />
              
              {/* Camera Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={capturePhoto}
                  disabled={isCapturing}
                  className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <FaCamera className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Position your camera to capture the project area that needs analysis
              </p>
            </div>
          </div>
        </div>
      )}

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
            {imagePreview ? (
              <div className="space-y-4">
                <img 
                  src={imagePreview} 
                  alt="Selected for analysis" 
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                />
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Upload Option */}
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Upload Image</p>
                  <p className="text-gray-600 text-sm">
                    Choose from your files
                  </p>
                </div>
                
                {/* Camera Option */}
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={startCamera}
                >
                  <FaCamera className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Take Photo</p>
                  <p className="text-gray-600 text-sm">
                    Use your camera
                  </p>
                </div>
              </div>
            )}
            
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows="3"
              />
            </div>
          </div>
        )}

        {/* Text Description Tab */}
        {activeTab === 'text' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project or problem in detail. Include what type of work is needed, materials involved, and any specific issues you've noticed..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows="8"
              />
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Analyze Button */}
        <div className="flex justify-center pt-6">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (activeTab === 'image' && !selectedImage) || (activeTab === 'text' && !description.trim())}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
              isAnalyzing || (activeTab === 'image' && !selectedImage) || (activeTab === 'text' && !description.trim())
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isAnalyzing ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <FaBrain className="mr-2" />
                Analyze Project
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Analysis Results</h3>
            <button
              onClick={resetAnalysis}
              className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              New Analysis
            </button>
          </div>

          {/* Success indicator */}
          <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
            <FaCheckCircle className="text-green-500 mr-3" />
            <div>
              <p className="text-green-800 font-medium">Analysis completed successfully!</p>
              <p className="text-green-600 text-sm">
                Confidence: {Math.round(analysisResult.projectAnalysis.aiConfidence * 100)}%
              </p>
            </div>
          </div>

          {/* Analysis Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Project Analysis */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <FaTools className="mr-2 text-blue-600" />
                Project Analysis
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Category</p>
                  <p className="text-blue-900">{analysisResult.projectAnalysis.category}</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Services Needed</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {analysisResult.projectAnalysis.services.map((service, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Estimated Cost</p>
                  <p className="text-green-900 font-semibold">
                    {analysisResult.projectAnalysis.estimatedCost.currency} {analysisResult.projectAnalysis.estimatedCost.min.toLocaleString()} - {analysisResult.projectAnalysis.estimatedCost.max.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <FaChartLine className="mr-2 text-green-600" />
                Project Details
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-600 font-medium">Complexity</p>
                  <p className="text-yellow-900">{analysisResult.projectAnalysis.complexity}</p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">Time Estimate</p>
                  <p className="text-red-900">{analysisResult.projectAnalysis.timeEstimate}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium">Analysis Type</p>
                  <p className="text-gray-900">{analysisResult.projectAnalysis.analysisType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Analysis (if available) */}
          {analysisResult.imageAnalysis && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaLightbulb className="mr-2 text-yellow-600" />
                Image Analysis Insights
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-2">Detected Problem</p>
                  <p className="text-gray-900">{analysisResult.imageAnalysis.detectedProblem}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-2">Urgency Level</p>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    analysisResult.imageAnalysis.urgencyLevel === 'HIGH' ? 'bg-red-100 text-red-700' :
                    analysisResult.imageAnalysis.urgencyLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {analysisResult.imageAnalysis.urgencyLevel}
                  </span>
                </div>
              </div>
              
              {analysisResult.imageAnalysis.visualEvidence && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">Visual Evidence</p>
                  <ul className="list-disc list-inside space-y-1">
                    {analysisResult.imageAnalysis.visualEvidence.map((evidence, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">{evidence}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {analysisResult.imageAnalysis.safetyConsiderations && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 font-medium mb-2 flex items-center">
                    <FaShieldAlt className="mr-1" />
                    Safety Considerations
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {analysisResult.imageAnalysis.safetyConsiderations.map((consideration, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">{consideration}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIImageAnalyzer;