import React from 'react';
import AIImageAnalyzer from '../modules/ai/components/AIImageAnalyzer';

const AIAnalyzerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            AI Project Analyzer
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Upload photos or describe your project to get instant AI-powered analysis 
            and connect with the perfect service providers in Bataan
          </p>
        </div>

        {/* AI Image Analyzer Component */}
        <AIImageAnalyzer />

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              📸
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Upload Photos</h3>
            <p className="text-slate-600 text-sm">
              Take photos of broken faucets, damaged walls, electrical issues, or any repair needs
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🧠
            </div>
            <h3 className="font-bold text-slate-900 mb-2">AI Analysis</h3>
            <p className="text-slate-600 text-sm">
              Our AI identifies problems, estimates costs, and determines urgency levels automatically
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🎯
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Perfect Matches</h3>
            <p className="text-slate-600 text-sm">
              Get matched with verified providers who specialize in your specific problem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyzerPage; 