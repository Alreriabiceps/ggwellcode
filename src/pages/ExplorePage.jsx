import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProviders } from '../data/mockData';
import LeafletMap from '../components/LeafletMap';
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaStar, 
  FaShieldAlt,
  FaAward,
  FaCertificate,
  FaChartLine,
  FaGem,
  FaThumbsUp,
  FaEye,
  FaSort,
  FaBolt,
  FaCheckCircle,
  FaRocket,
  FaBrain,
  FaMagic
} from 'react-icons/fa';
import { 
  MdVerified, 
  MdGrid3X3, 
  MdMap,
  MdHighQuality,
  MdTrendingUp,
  MdStar,
  MdDiamond
} from 'react-icons/md';
import qualityAI from '../lib/ai';
import aiSmartMatching from '../services/aiSmartMatching';

const ExplorePage = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [qualityFilter, setQualityFilter] = useState('all'); // New quality filter
  const [sortBy, setSortBy] = useState('quality'); // New sort option
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [showAIInsights, setShowAIInsights] = useState(false);
  
  // 🚀 AI SMART MATCHING STATE
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiMatches, setAiMatches] = useState([]);
  const [showAIResults, setShowAIResults] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // Quality tiers
  const qualityTiers = [
    { id: 'all', name: 'All Providers', icon: FaEye, minRating: 0 },
    { id: 'premium', name: 'Premium (4.5+)', icon: FaGem, minRating: 4.5, color: 'text-purple-600' },
    { id: 'certified', name: 'Quality Certified (4.0+)', icon: FaCertificate, minRating: 4.0, color: 'text-blue-600' },
    { id: 'verified', name: 'Verified (3.5+)', icon: FaShieldAlt, minRating: 3.5, color: 'text-green-600' }
  ];

  // Sort options focused on quality
  const sortOptions = [
    { id: 'quality', name: 'Quality Score', icon: MdStar },
    { id: 'experience', name: 'Experience', icon: FaAward },
    { id: 'reviews', name: 'Most Reviewed', icon: FaThumbsUp },
    { id: 'recent', name: 'Recently Active', icon: MdTrendingUp }
  ];

  const municipalities = [
    'All Municipalities', 'Balanga', 'Mariveles', 'Hermosa', 'Orani', 'Samal',
    'Abucay', 'Pilar', 'Orion', 'Limay', 'Bagac', 'Morong', 'Dinalupihan'
  ];

  const categories = [
    'All Categories', 'Construction', 'Electrical', 'Plumbing', 'Automotive', 
    'Landscaping', 'Catering', 'IT Services', 'Cleaning', 'Beauty & Wellness', 'Education'
  ];

  useEffect(() => {
    // Load providers with quality focus
    setTimeout(() => {
      setProviders(mockProviders);
      setFilteredProviders(mockProviders);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...providers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.services.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Municipality filter
    if (selectedMunicipality && selectedMunicipality !== 'All Municipalities') {
      filtered = filtered.filter(provider => 
        provider.municipality === selectedMunicipality
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(provider =>
        provider.category === selectedCategory
      );
    }

    // Quality filter
    if (qualityFilter !== 'all') {
      const tier = qualityTiers.find(t => t.id === qualityFilter);
      filtered = filtered.filter(provider => provider.rating >= tier.minRating);
      
      // Additional filters for premium tiers
      if (qualityFilter === 'premium') {
        filtered = filtered.filter(provider => 
          provider.badges.verified && provider.rating >= 4.5
        );
      } else if (qualityFilter === 'certified') {
        filtered = filtered.filter(provider => 
          provider.badges.verified && provider.rating >= 4.0
        );
      }
    }

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'quality':
          return b.rating - a.rating;
        case 'experience':
          return b.yearsExperience - a.yearsExperience;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'recent':
          return new Date(b.lastActive || 0) - new Date(a.lastActive || 0);
        default:
          return b.rating - a.rating;
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchTerm, selectedMunicipality, selectedCategory, qualityFilter, sortBy]);

  // AI-powered search enhancement
  const handleAISearch = async (searchQuery) => {
    if (searchQuery.length > 10) { // Only trigger for detailed queries
      try {
        const recommendations = await qualityAI.intelligentQualityMatch({
          query: searchQuery,
          budget: 'medium',
          timeline: 'flexible'
        });
        
        // Ensure the recommendations object has the expected structure
        const safeRecommendations = {
          qualityRecommendations: recommendations?.qualityRecommendations || [],
          budgetGuidance: recommendations?.budgetGuidance || 'Loading budget guidance...',
          recommendedProviders: recommendations?.recommendedProviders || []
        };
        
        setAiRecommendations(safeRecommendations);
        setShowAIInsights(true);
      } catch (error) {
        console.error('AI Search Error:', error);
        // Set fallback recommendations on error
        setAiRecommendations({
          qualityRecommendations: [
            'Prioritize providers with 4.5+ ratings',
            'Choose verified and certified businesses',
            'Look for comprehensive warranties',
            'Check portfolio of recent work'
          ],
          budgetGuidance: 'Quality providers typically cost 20-30% more upfront but save 40-60% over 5 years through durability and reliability.'
        });
        setShowAIInsights(true);
      }
    }
  };

  // Enhanced search with AI
  useEffect(() => {
    // 🚀 REVOLUTIONARY GEMINI AI SEARCH - NOW ACTIVE!
    if (searchTerm && searchTerm.length >= 10) {
      handleGeminiAISearch(searchTerm);
    } else {
      setShowAIResults(false);
      setAiAnalysis(null);
      setAiMatches([]);
    }
  }, [searchTerm]);

  // 🚀 AI SMART SEARCH HANDLER - Revolutionary Gemini-powered search
  const handleGeminiAISearch = async (query) => {
    if (query.length < 10) {
      setShowAIResults(false);
      return;
    }

    setAiLoading(true);
    try {
      console.log('🚀 Starting Gemini AI Smart Search:', query);
      
      const result = await aiSmartMatching.enhancedSearch(query, {
        municipality: selectedMunicipality !== 'All Municipalities' ? selectedMunicipality : null,
        category: selectedCategory !== 'All Categories' ? selectedCategory : null,
        budget: 'medium',
        timeline: 'flexible'
      });

      if (result.success) {
        setAiAnalysis(result.projectAnalysis);
        setAiMatches(result.matches || []);
        setShowAIResults(true);
        console.log('✅ Gemini AI Search Complete:', result);
      } else {
        console.warn('⚠️ AI Search failed, using fallback');
        setShowAIResults(false);
      }
    } catch (error) {
      console.error('❌ AI Search Error:', error);
      setShowAIResults(false);
    } finally {
      setAiLoading(false);
    }
  };

  const getQualityBadge = (provider) => {
    if (provider.rating >= 4.5 && provider.badges.verified) {
      return { label: 'PREMIUM', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: MdDiamond };
    } else if (provider.rating >= 4.0 && provider.badges.verified) {
      return { label: 'CERTIFIED', color: 'bg-gradient-to-r from-blue-500 to-blue-600', icon: FaCertificate };
    } else if (provider.badges.verified) {
      return { label: 'VERIFIED', color: 'bg-gradient-to-r from-green-500 to-green-600', icon: FaShieldAlt };
    }
    return null;
  };

  const calculateQualityScore = (provider) => {
    let score = provider.rating * 20; // Base score from rating
    if (provider.badges.verified) score += 10;
    if (provider.badges.featured) score += 5;
    if (provider.yearsExperience >= 10) score += 10;
    if (provider.reviewCount >= 50) score += 5;
    return Math.min(100, Math.round(score));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Finding premium providers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                <MdHighQuality className="inline mr-3 text-blue-600" />
                Premium Provider Discovery
              </h1>
              <p className="text-slate-600">Find quality providers worth paying premium for</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MdGrid3X3 className="mr-2" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'map'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MdMap className="mr-2" />
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Enhanced Search with AI */}
            <div className="lg:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="🚀 Describe your project for AI-powered matching... (e.g., 'Build a 2-story house in Balanga')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm.length > 10 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <FaBolt className="mr-1" />
                      AI
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quality Filter */}
            <div>
              <select
                value={qualityFilter}
                onChange={(e) => setQualityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {qualityTiers.map(tier => (
                  <option key={tier.id} value={tier.id}>{tier.name}</option>
                ))}
              </select>
            </div>

            {/* Municipality Filter */}
            <div>
              <select
                value={selectedMunicipality}
                onChange={(e) => setSelectedMunicipality(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {municipalities.map(municipality => (
                  <option key={municipality} value={municipality}>{municipality}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations - Temporarily Disabled */}
      {/* {showAIInsights && aiRecommendations && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                  <FaBolt className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">AI Quality Recommendations</h3>
                <div className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  Smart Analysis
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Quality Guidelines for Your Project</h4>
                  <ul className="space-y-2">
                    {(aiRecommendations?.qualityRecommendations || []).map((rec, index) => (
                      <li key={index} className="flex items-start text-slate-700">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Budget Guidance</h4>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-sm">{aiRecommendations?.budgetGuidance || 'Loading budget guidance...'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Results Count */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <p className="text-slate-600">
            <span className="font-semibold text-slate-900">{filteredProviders.length}</span> premium providers found
            {false && showAIInsights && (
              <span className="ml-2 text-blue-600 text-sm">
                <FaBolt className="inline mr-1" />
                Enhanced by AI
              </span>
            )}
          </p>
          <Link
            to="/quality-showcase"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
          >
            <FaChartLine className="mr-2" />
            Why Choose Premium?
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-8">
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProviders.map((provider) => {
              const qualityBadge = getQualityBadge(provider);
              const qualityScore = calculateQualityScore(provider);

              return (
                <div
                  key={provider._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border hover:border-blue-200 hover:-translate-y-2"
                >
                  {/* Quality Badge */}
                  {qualityBadge && (
                    <div className={`${qualityBadge.color} text-white px-4 py-2 text-center`}>
                      <div className="flex items-center justify-center text-sm font-bold">
                        <qualityBadge.icon className="mr-2" />
                        {qualityBadge.label} PROVIDER
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                          {provider.businessName}
                        </h3>
                        <p className="text-slate-600 flex items-center text-sm">
                          <FaMapMarkerAlt className="mr-1 text-slate-400" />
                          {provider.municipality}, Bataan
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-500 mb-1">
                          <FaStar className="mr-1" />
                          <span className="font-bold text-slate-900">{provider.rating}</span>
                        </div>
                        <p className="text-xs text-slate-500">{provider.reviewCount} reviews</p>
                      </div>
                    </div>

                    {/* Quality Score */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Quality Score</span>
                        <span className="text-sm font-bold text-blue-600">{qualityScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            qualityScore >= 90 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                            qualityScore >= 80 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                            qualityScore >= 70 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                            'bg-gradient-to-r from-yellow-500 to-orange-500'
                          }`}
                          style={{ width: `${qualityScore}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Experience & Verification */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-blue-600 font-bold text-lg">{provider.yearsExperience}</div>
                        <div className="text-blue-700 text-xs">Years Experience</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-green-600 font-bold text-lg">
                          {provider.badges.verified ? '✓' : '○'}
                        </div>
                        <div className="text-green-700 text-xs">Verified</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {provider.description}
                    </p>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(provider.services || []).slice(0, 3).map((service, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                        >
                          {service}
                        </span>
                      ))}
                      {(provider.services || []).length > 3 && (
                        <span className="text-xs text-slate-500 px-2 py-1">
                          +{(provider.services || []).length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    <Link
                      to={`/provider/${provider._id}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center block"
                    >
                      View Premium Profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <LeafletMap
              providers={filteredProviders}
              onProviderSelect={setSelectedProvider}
              selectedProvider={selectedProvider}
              height="600px"
            />
          </div>
        )}
      </div>

      {/* No Results */}
      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No premium providers found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedMunicipality('');
              setSelectedCategory('');
              setQualityFilter('all');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;