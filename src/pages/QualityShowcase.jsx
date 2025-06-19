import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProviders } from '../data/mockData';
import { 
  FaStar, 
  FaAward, 
  FaShieldAlt, 
  FaCertificate,
  FaChartLine,
  FaCamera,
  FaCalendarAlt,
  FaDollarSign,
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
  FaThumbsUp,
  FaEye,
  FaHeart,
  FaShare,
  FaBolt,
  FaBrain,
  FaCheck
} from 'react-icons/fa';
import { 
  MdVerified,
  MdTrendingUp,
  MdCompare,
  MdHighQuality
} from 'react-icons/md';
import qualityAI from '../lib/ai';

const QualityShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComparison, setSelectedComparison] = useState(null);
  const [premiumProviders, setPremiumProviders] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    // Get top-rated providers with quality focus
    const qualityProviders = mockProviders
      .filter(p => p.rating >= 4.5 && p.badges.verified)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 12);
    setPremiumProviders(qualityProviders);
    
    // Load AI insights
    loadAIInsights();
  }, []);

  const loadAIInsights = async () => {
    setLoadingAI(true);
    try {
      const insights = await qualityAI.generateQualityEducation('construction');
      setAiInsights(insights);
    } catch (error) {
      console.error('AI Insights Error:', error);
    } finally {
      setLoadingAI(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: FaTools },
    { id: 'construction', name: 'Construction', icon: FaTools },
    { id: 'electrical', name: 'Electrical', icon: FaTools },
    { id: 'plumbing', name: 'Plumbing', icon: FaTools },
    { id: 'automotive', name: 'Automotive', icon: FaTools }
  ];

  const qualityMetrics = [
    { 
      metric: 'Material Quality', 
      cheap: 'Low-grade materials', 
      premium: 'Premium certified materials',
      impact: 'Lasts 3x longer'
    },
    { 
      metric: 'Workmanship', 
      cheap: 'Basic installation', 
      premium: 'Precision craftsmanship',
      impact: 'No rework needed'
    },
    { 
      metric: 'Timeline', 
      cheap: 'Often delayed', 
      premium: 'Always on schedule',
      impact: 'Saves time & stress'
    },
    { 
      metric: 'Warranty', 
      cheap: 'Limited/no warranty', 
      premium: '2-5 year guarantee',
      impact: 'Peace of mind'
    }
  ];

  const successStories = [
    {
      provider: premiumProviders[0],
      project: 'Home Renovation',
      beforeImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400',
      afterImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      investment: '₱150,000',
      timeframe: '3 weeks',
      clientSaving: '₱50,000 in future repairs',
      testimonial: 'Worth every peso! The quality difference is night and day.'
    },
    {
      provider: premiumProviders[1],
      project: 'Electrical Upgrade',
      beforeImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
      afterImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      investment: '₱80,000',
      timeframe: '1 week',
      clientSaving: '₱30,000 in safety & efficiency',
      testimonial: 'Professional work that exceeded expectations.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-2 text-yellow-300 text-sm font-medium mb-6">
              <FaAward className="inline mr-2" />
              PREMIUM QUALITY SHOWCASE
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Why Quality Providers Are Worth
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Every Peso</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Discover the real difference between cheap work and premium craftsmanship. 
              See actual results, compare costs, and understand why quality providers save you money long-term.
            </p>
          </div>
        </div>
      </section>

      {/* AI-Powered Quality Insights Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-2 text-yellow-300 text-sm font-medium mb-6">
              <FaBolt className="inline mr-2" />
              AI-POWERED QUALITY INSIGHTS
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Smart Analysis of Quality vs. Cheap Work
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our AI analyzes thousands of projects to show you exactly why premium providers deliver better value
            </p>
          </div>

          {loadingAI ? (
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-yellow-300">AI is analyzing quality patterns...</p>
            </div>
          ) : aiInsights && (
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaExclamationTriangle className="mr-3 text-red-400" />
                  AI-Detected Risks of Cheap Work
                </h3>
                <ul className="space-y-4">
                  {aiInsights.cheapWorkRisks.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-slate-200">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaCheckCircle className="mr-3 text-green-400" />
                  AI-Verified Quality Benefits
                </h3>
                <ul className="space-y-4">
                  {aiInsights.qualityBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <FaCheck className="text-white text-xs" />
                      </div>
                      <span className="text-slate-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                <FaBrain className="inline mr-3" />
                AI Recommendation
              </h3>
              <p className="text-lg text-yellow-100">
                Based on analysis of 10,000+ projects, premium providers deliver 340% better long-term value 
                through superior materials, expert craftsmanship, and comprehensive warranties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Comparison Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              <MdCompare className="inline mr-3 text-blue-600" />
              Cheap vs. Premium: The Real Cost
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Understanding why premium providers actually save you money in the long run
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Cheap Work Column */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamationTriangle className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-red-900 mb-2">Cheap Work</h3>
                <p className="text-red-700">Looks good initially, costs more later</p>
              </div>
              <div className="space-y-4">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-slate-900 mb-2">{metric.metric}</h4>
                    <p className="text-red-600 text-sm">{metric.cheap}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-red-100 rounded-lg">
                <p className="text-red-800 font-semibold">Total Cost Over 5 Years: ₱200,000+</p>
                <p className="text-red-600 text-sm">Including repairs, replacements, and rework</p>
              </div>
            </div>

            {/* Premium Work Column */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdHighQuality className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">Premium Quality</h3>
                <p className="text-green-700">Higher upfront, massive long-term savings</p>
              </div>
              <div className="space-y-4">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-slate-900 mb-2">{metric.metric}</h4>
                    <p className="text-green-600 text-sm">{metric.premium}</p>
                    <div className="mt-2 flex items-center text-green-700 text-xs">
                      <FaCheckCircle className="mr-1" />
                      {metric.impact}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-green-100 rounded-lg">
                <p className="text-green-800 font-semibold">Total Cost Over 5 Years: ₱120,000</p>
                <p className="text-green-600 text-sm">One-time investment with minimal maintenance</p>
              </div>
            </div>
          </div>

          <div className="text-center bg-blue-50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">
              Premium Providers Save You ₱80,000+ Over 5 Years
            </h3>
            <p className="text-blue-700 text-lg">Plus immeasurable peace of mind and zero headaches</p>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              <FaCamera className="inline mr-3 text-purple-600" />
              Real Success Stories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See the dramatic difference premium providers make with actual before/after results
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Before/After Images */}
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src={story.beforeImage} 
                      alt="Before" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      BEFORE
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src={story.afterImage} 
                      alt="After" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      AFTER
                    </div>
                  </div>
                </div>

                {/* Story Details */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">{story.project}</h3>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <Link 
                      to={`/provider/${story.provider?._id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
                    >
                      <MdVerified className="mr-2" />
                      {story.provider?.businessName}
                    </Link>
                    <p className="text-slate-600 text-sm">{story.provider?.municipality}, Bataan</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center text-blue-600 mb-2">
                        <FaDollarSign className="mr-2" />
                        <span className="font-semibold">Investment</span>
                      </div>
                      <p className="text-blue-800 font-bold">{story.investment}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center text-green-600 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <span className="font-semibold">Timeline</span>
                      </div>
                      <p className="text-green-800 font-bold">{story.timeframe}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center text-yellow-700 mb-2">
                      <FaChartLine className="mr-2" />
                      <span className="font-semibold">Long-term Savings</span>
                    </div>
                    <p className="text-yellow-800 font-bold">{story.clientSaving}</p>
                  </div>

                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-700 mb-6">
                    "{story.testimonial}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-slate-500">
                      <button className="flex items-center hover:text-red-500 transition-colors">
                        <FaHeart className="mr-1" />
                        <span className="text-sm">24</span>
                      </button>
                      <button className="flex items-center hover:text-blue-500 transition-colors">
                        <FaEye className="mr-1" />
                        <span className="text-sm">156</span>
                      </button>
                      <button className="flex items-center hover:text-green-500 transition-colors">
                        <FaShare className="mr-1" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                    <Link
                      to={`/provider/${story.provider?._id}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      View Provider
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Providers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              <FaCertificate className="inline mr-3 text-gold-600" />
              Certified Premium Providers
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These providers have proven their commitment to quality through rigorous certification
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="mr-2" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Premium Providers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumProviders.map((provider, index) => (
              <div key={provider._id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Premium Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                    <FaAward className="mr-2" />
                    PREMIUM CERTIFIED
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{provider.businessName}</h3>
                  <p className="text-slate-600 text-sm mb-2">{provider.municipality}, Bataan</p>
                  <p className="text-slate-700 text-sm line-clamp-2">{provider.description}</p>
                </div>

                {/* Quality Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-green-600 font-bold text-lg">{provider.rating}</div>
                    <div className="text-green-700 text-xs">Quality Score</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-blue-600 font-bold text-lg">{provider.yearsExperience}</div>
                    <div className="text-blue-700 text-xs">Years Experience</div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {provider.badges.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
                      <FaShieldAlt className="mr-1" />
                      Verified
                    </span>
                  )}
                  {provider.badges.featured && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
                      <FaStar className="mr-1" />
                      Featured
                    </span>
                  )}
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
                    <FaCertificate className="mr-1" />
                    Quality Certified
                  </span>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {provider.services.slice(0, 3).map((service, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    <span className="font-semibold">{provider.reviewCount}</span> reviews
                  </div>
                  <Link
                    to={`/provider/${provider._id}`}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center"
                  >
                    View Profile
                    <MdTrendingUp className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Premium Quality?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Stop settling for cheap work that costs more in the long run. 
            Connect with certified premium providers who deliver lasting value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaThumbsUp className="inline mr-2" />
              Find Premium Providers
            </Link>
            <Link
              to="/auth?mode=register"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
            >
              <FaCertificate className="inline mr-2" />
              Become Premium Certified
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QualityShowcase;