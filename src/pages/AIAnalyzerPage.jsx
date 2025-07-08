import React, { useState } from 'react';
import AIImageAnalyzer from '../modules/ai/components/AIImageAnalyzer';
import { FaBrain, FaHistory, FaImage, FaTrash, FaClock, FaPlus } from 'react-icons/fa';

const AIAnalyzerPage = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [analysisHistory, setAnalysisHistory] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 14:30',
      type: 'image',
      title: 'Kitchen renovation analysis',
      result: 'Identified plumbing and electrical issues',
      status: 'completed',
      confidence: 92
    },
    {
      id: 2,
      timestamp: '2024-01-14 09:15',
      type: 'text',
      title: 'Bathroom repair description',
      result: 'Recommended waterproofing specialists',
      status: 'completed',
      confidence: 88
    },
    {
      id: 3,
      timestamp: '2024-01-13 16:45',
      type: 'image',
      title: 'Roof damage assessment',
      result: 'Urgent roofing repair needed',
      status: 'completed',
      confidence: 95
    },
    {
      id: 4,
      timestamp: '2024-01-12 11:20',
      type: 'text',
      title: 'Electrical wiring issue',
      result: 'Certified electrician required',
      status: 'completed',
      confidence: 90
    },
    {
      id: 5,
      timestamp: '2024-01-11 16:30',
      type: 'image',
      title: 'Floor tile replacement',
      result: 'Flooring specialist recommended',
      status: 'completed',
      confidence: 87
    }
  ]);

  const clearHistory = () => {
    setAnalysisHistory([]);
  };

  const deleteHistoryItem = (id) => {
    setAnalysisHistory(prev => prev.filter(item => item.id !== id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <FaBrain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">AI Project Analyzer</h1>
              <p className="text-sm text-gray-500">Analyze and get instant recommendations</p>
            </div>
          </div>
          
          {/* Tab Navigation - Compact */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('analyze')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'analyze'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaImage className="inline mr-2 w-3 h-3" />
              Analyze
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaHistory className="inline mr-2 w-3 h-3" />
              History
              <span className="ml-1 px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">
                {analysisHistory.length}
              </span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="pb-8">
          {activeTab === 'analyze' ? (
            <div className="max-w-4xl mx-auto">
              <AIImageAnalyzer />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* History Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">History</h3>
                    <button
                      onClick={() => setActiveTab('analyze')}
                      className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <FaPlus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {analysisHistory.slice(0, 8).map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className={`w-2 h-2 rounded-full ${
                            item.type === 'image' ? 'bg-blue-500' : 'bg-green-500'
                          }`}></div>
                          <span className="text-xs text-gray-500">{formatDate(item.timestamp)}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{item.confidence}% confidence</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHistoryItem(item.id);
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {analysisHistory.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="w-full mt-4 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Clear All History
                    </button>
                  )}
                </div>
              </div>

              {/* Main History Content */}
              <div className="lg:col-span-3">
                {analysisHistory.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHistory className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No analysis history</h3>
                    <p className="text-gray-500 mb-6">Your analysis history will appear here</p>
                    <button
                      onClick={() => setActiveTab('analyze')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Start Analyzing
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analysisHistory.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  item.type === 'image' ? 'bg-blue-500' : 'bg-green-500'
                                }`}></div>
                                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                  {item.type === 'image' ? 'Image' : 'Text'}
                                </span>
                              </div>
                              
                              <p className="text-gray-600 mb-4">{item.result}</p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <FaClock className="w-4 h-4 mr-1" />
                                    {formatDate(item.timestamp)}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <div className="w-4 h-4 mr-1">
                                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                      </svg>
                                    </div>
                                    {item.confidence}% confidence
                                  </div>
                                </div>
                                <button
                                  onClick={() => deleteHistoryItem(item.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalyzerPage; 