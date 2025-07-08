import React from 'react';
import { Card, FeatureCard } from '../components/ui/Card';
import AIImageAnalyzer from '../modules/ai/components/AIImageAnalyzer';
import { FaBrain, FaRocket, FaUsers, FaShieldAlt } from 'react-icons/fa';

const AIAnalyzerPage = () => {
  const features = [
    {
      icon: FaBrain,
      title: 'Smart Analysis',
      description: 'AI analyzes your images to identify construction issues and quality concerns with precision',
      variant: 'blue'
    },
    {
      icon: FaRocket,
      title: 'Instant Reports',
      description: 'Get detailed reports with recommendations and priority levels in seconds',
      variant: 'purple'
    },
    {
      icon: FaUsers,
      title: 'Perfect Matches',
      description: 'Get matched with verified providers who specialize in your specific problem',
      variant: 'green'
    },
    {
      icon: FaShieldAlt,
      title: 'Trusted Results',
      description: 'All recommendations are from verified professionals with proven track records',
      variant: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(255_255_255_/_10%)_1px,_transparent_0)] [background-size:24px_24px] opacity-40"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 container-apple py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-apple-2xl mb-6 backdrop-blur-apple animate-fade-in">
              <FaBrain className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-display font-bold mb-4 animate-fade-in">
              AI-Powered
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                Project Analysis
              </span>
            </h1>
            
            <p className="text-subtitle text-blue-100 mb-8 leading-relaxed animate-fade-in">
              Upload project images and let our advanced AI analyze them to identify potential issues, 
              quality concerns, and recommend the perfect service providers for your needs.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-blue-200 animate-slide-up">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>99% Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Expert Recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-apple">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-headline font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-subtitle text-gray-600">
              Our AI technology combines computer vision with expert knowledge to provide accurate analysis and recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                variant={feature.variant}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main AI Analyzer Section */}
      <section className="section">
        <div className="container-apple">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-headline font-bold text-gray-900 mb-4">
              Try It Now
            </h2>
            <p className="text-subtitle text-gray-600">
              Upload your project images and discover what our AI can reveal about your construction needs.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <AIImageAnalyzer />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="container-apple">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Content */}
            <div>
              <h2 className="text-headline font-bold text-gray-900 mb-6">
                Why Choose AI Analysis?
              </h2>
              <p className="text-subtitle text-gray-600 mb-8">
                Traditional project evaluation can take days or weeks. Our AI provides instant, accurate analysis 
                that helps you make informed decisions faster.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-apple flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-title font-semibold text-gray-900 mb-1">
                      Save Time & Money
                    </h3>
                    <p className="text-body text-gray-600">
                      Identify issues before they become costly problems
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-apple flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-title font-semibold text-gray-900 mb-1">
                      Expert Accuracy
                    </h3>
                    <p className="text-body text-gray-600">
                      AI trained on thousands of construction projects
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-apple flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-title font-semibold text-gray-900 mb-1">
                      Instant Results
                    </h3>
                    <p className="text-body text-gray-600">
                      Get comprehensive analysis in seconds, not days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual */}
            <div className="relative">
              <Card variant="elevated" className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-apple-2xl mx-auto mb-6 flex items-center justify-center">
                  <FaBrain className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-title font-semibold text-gray-900 mb-2">
                  Advanced AI Technology
                </h3>
                <p className="text-body text-gray-600 mb-6">
                  Powered by cutting-edge computer vision and machine learning algorithms
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-2xl text-blue-600 mb-1">99%</div>
                    <div className="text-gray-500">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-purple-600 mb-1">&lt;10s</div>
                    <div className="text-gray-500">Analysis Time</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIAnalyzerPage; 