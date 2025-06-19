import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { mockHighlights, mockProviders } from '../data/mockData';
import { 
  FaSearch, 
  FaBuilding, 
  FaCheckCircle, 
  FaBullseye, 
  FaMapMarkerAlt,
  FaChartLine,
  FaBolt,
  FaShieldAlt,
  FaStar,
  FaTrophy,
  FaUsers,
  FaHandshake,
  FaRocket,
  FaAward,
  FaGem,
  FaBrain
} from 'react-icons/fa';
import { 
  HiSparkles,
  HiLightningBolt,
  HiChartBar,
  HiGlobe
} from 'react-icons/hi';
import { 
  MdVerified,
  MdTrendingUp,
  MdBusinessCenter,
  MdLocationOn
} from 'react-icons/md';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';
import AIShowcase from '../components/AIShowcase';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isIntersecting];
};

// Custom hook for scroll position
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Using imported AnimatedSection and AnimatedCounter components

const HomePage = () => {
  const [highlights, setHighlights] = useState([]);
  const [featuredProviders, setFeaturedProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const scrollY = useScrollPosition();

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setHighlights(mockHighlights);
      setFeaturedProviders(mockProviders.filter(p => p.badges.featured).slice(0, 6));
      setLoading(false);
      setIsVisible(true);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading Bataan Connect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div 
          className="absolute inset-0" 
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)`
          }}
        ></div>
        
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-float"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-6 h-6 bg-purple-400/30 rounded-full animate-float-delayed"
            style={{ transform: `translateY(${scrollY * -0.4}px)` }}
          ></div>
          <div 
            className="absolute bottom-40 left-1/4 w-3 h-3 bg-white/20 rounded-full animate-float-slow"
            style={{ transform: `translateY(${scrollY * -0.6}px)` }}
          ></div>
          <div 
            className="absolute top-1/2 right-1/3 w-8 h-8 bg-yellow-400/20 rounded-full animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.3}px)` }}
          ></div>
        </div>
        
        <div className={`relative container mx-auto px-4 py-20 lg:py-32 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-6xl mx-auto">
            {/* Recognition Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/20 transition-all duration-500 animate-bounce-in hover:scale-110 transform">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                RECOGNIZED AS THE BEST SERVICE DISCOVERY PLATFORM IN BATAAN
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-slide-up-stagger">
                <span className="inline-block animate-slide-up-delay-100">Find</span>{' '}
                <span className="inline-block animate-slide-up-delay-200">Quality</span>{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift inline-block animate-slide-up-delay-300">
                  Premium Providers
                </span>
                <span className="inline-block animate-slide-up-delay-400">, Not</span>{' '}
                <span className="inline-block animate-slide-up-delay-500">Cheap</span>{' '}
                <span className="inline-block animate-slide-up-delay-600">Alternatives</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-slow delay-700">
                Stop settling for low-cost, low-quality work. Connect with verified premium contractors and MSMEs 
                in Bataan who deliver lasting value and save you money long-term.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-slow delay-1000">
                <Link
                  to="/explore"
                  className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 animate-button-bounce"
                >
                  <FaSearch className="inline mr-2 group-hover:animate-spin transition-transform duration-500" />
                  Find Premium Providers
                  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                </Link>
                <Link
                  to="/ai-analyzer"
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 animate-button-bounce delay-100"
                >
                  <FaBrain className="inline mr-2 group-hover:animate-pulse transition-transform duration-500" />
                  AI Image Analyzer
                  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                </Link>
                <Link
                  to="/quality-showcase"
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-500 hover:scale-110 animate-button-bounce delay-200"
                >
                  <FaChartLine className="inline mr-2 group-hover:animate-bounce transition-transform duration-500" />
                  Why Choose Quality?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section with Scroll Animation */}
      <AnimatedSection className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <AnimatedSection delay={200}>
              <p className="text-slate-600 font-medium mb-8">TRUSTED BY 100+ OF THE LARGEST COMPANIES IN BATAAN</p>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              {mockProviders.slice(0, 12).map((provider, index) => (
                <AnimatedSection 
                  key={index}
                  delay={index * 100}
                  animation="scale-in"
                  className="text-center hover:scale-110 transition-all duration-500"
                >
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-xl transition-all duration-500 border hover:border-blue-200 transform hover:-translate-y-2">
                    <h3 className="font-semibold text-slate-700 text-sm">{provider.businessName}</h3>
                    <p className="text-xs text-slate-500 flex items-center justify-center mt-1">
                      <MdLocationOn className="mr-1 animate-pulse" />
                      {provider.municipality}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section with Heavy Animations */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedSection animation="scale-in" delay={100}>
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-110 transition-all duration-500 animate-pulse-slow">
                <HiSparkles className="inline mr-2 animate-spin-slow" />
                Premium Quality Over Low-Cost Alternatives
              </div>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Why Premium Providers Save You Money
              </h2>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedSection delay={100} animation="slide-in-left" className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-700 group-hover:shadow-2xl group-hover:rotate-6 transform">
                <FaBuilding className="text-3xl text-blue-600 group-hover:animate-bounce" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                <AnimatedCounter target={mockProviders.filter(p => p.rating >= 4.5).length} />+
              </div>
              <div className="text-slate-600 font-medium">Premium Providers</div>
              <div className="text-sm text-slate-500 mt-1">Quality-certified businesses</div>
            </AnimatedSection>

            <AnimatedSection delay={200} animation="slide-in-left" className="text-center group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-700 group-hover:shadow-2xl group-hover:rotate-6 transform">
                <MdVerified className="text-3xl text-green-600 group-hover:animate-pulse" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                ₱<AnimatedCounter target={80000} />+
              </div>
              <div className="text-slate-600 font-medium">Average Savings</div>
              <div className="text-sm text-slate-500 mt-1">Vs. cheap alternatives over 5 years</div>
            </AnimatedSection>

            <AnimatedSection delay={300} animation="slide-in-right" className="text-center group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-700 group-hover:shadow-2xl group-hover:rotate-6 transform">
                <FaBullseye className="text-3xl text-purple-600 group-hover:animate-spin" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                <AnimatedCounter target={95} />%
              </div>
              <div className="text-slate-600 font-medium">Client Satisfaction</div>
              <div className="text-sm text-slate-500 mt-1">Premium provider rating</div>
            </AnimatedSection>

            <AnimatedSection delay={400} animation="slide-in-right" className="text-center group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-700 group-hover:shadow-2xl group-hover:rotate-6 transform">
                <FaMapMarkerAlt className="text-3xl text-orange-600 group-hover:animate-bounce" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                <AnimatedCounter target={12} />+
              </div>
              <div className="text-slate-600 font-medium">Municipalities</div>
              <div className="text-sm text-slate-500 mt-1">Province-wide premium coverage</div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* 🚀 AI SMART MATCHING SHOWCASE - Revolutionary Gemini AI */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="container mx-auto px-4">
          <AIShowcase />
        </div>
      </AnimatedSection>

      {/* Features Section with Advanced Animations */}
      <AnimatedSection className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedSection animation="scale-in" delay={100}>
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-110 transition-all duration-500">
                <FaUsers className="inline mr-2 animate-pulse" />
                Empower Your Business And Your Customers
              </div>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Premium Quality Features That Save Money
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={500}>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Bataan Connect's premium providers use superior materials, proven techniques, 
                and guaranteed workmanship that eliminates costly repairs and replacements.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <AnimatedSection delay={100} animation="slide-in-left" className="flex items-start space-x-4 group">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-all duration-700 group-hover:bg-blue-200 group-hover:rotate-12 transform group-hover:shadow-lg">
                  <FaSearch className="text-blue-600 text-xl group-hover:animate-spin" />
                </div>
                <div className="transform group-hover:translate-x-2 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-500">
                    Quality-First Matching
                  </h3>
                  <p className="text-slate-600">Advanced algorithms prioritize proven quality over lowest price.</p>
                  <div className="text-sm text-blue-600 font-medium mt-1 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">01</div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200} animation="slide-in-left" className="flex items-start space-x-4 group">
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-all duration-700 group-hover:bg-green-200 group-hover:rotate-12 transform group-hover:shadow-lg">
                  <HiChartBar className="text-green-600 text-xl group-hover:animate-pulse" />
                </div>
                <div className="transform group-hover:translate-x-2 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors duration-500">
                    Long-Term Value Tracking
                  </h3>
                  <p className="text-slate-600">See actual cost savings and ROI from choosing premium providers.</p>
                  <div className="text-sm text-green-600 font-medium mt-1 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">02</div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300} animation="slide-in-left" className="flex items-start space-x-4 group">
                <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-all duration-700 group-hover:bg-purple-200 group-hover:rotate-12 transform group-hover:shadow-lg">
                  <HiLightningBolt className="text-purple-600 text-xl group-hover:animate-bounce" />
                </div>
                <div className="transform group-hover:translate-x-2 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-500">
                    Quality Guarantee System
                  </h3>
                  <p className="text-slate-600">Platform-backed warranties and satisfaction guarantees.</p>
                  <div className="text-sm text-purple-600 font-medium mt-1 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">03</div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400} animation="slide-in-left" className="flex items-start space-x-4 group">
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-all duration-700 group-hover:bg-orange-200 group-hover:rotate-12 transform group-hover:shadow-lg">
                  <FaShieldAlt className="text-orange-600 text-xl group-hover:animate-pulse" />
                </div>
                <div className="transform group-hover:translate-x-2 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors duration-500">
                    Premium Certification
                  </h3>
                  <p className="text-slate-600">Rigorous vetting ensures only quality providers get certified.</p>
                  <div className="text-sm text-orange-600 font-medium mt-1 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">04</div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={200} animation="slide-in-right" className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-700 hover:scale-105 transform hover:rotate-1 group">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <HiGlobe className="mr-2 group-hover:animate-spin" />
                  Premium Quality Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center group-hover:translate-x-2 transition-transform duration-500 delay-100">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 group-hover:animate-ping"></div>
                    <span>3x longer lasting results</span>
                  </li>
                  <li className="flex items-center group-hover:translate-x-2 transition-transform duration-500 delay-200">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 group-hover:animate-ping"></div>
                    <span>No costly repairs or rework</span>
                  </li>
                  <li className="flex items-center group-hover:translate-x-2 transition-transform duration-500 delay-300">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 group-hover:animate-ping"></div>
                    <span>Premium materials included</span>
                  </li>
                  <li className="flex items-center group-hover:translate-x-2 transition-transform duration-500 delay-400">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 group-hover:animate-ping"></div>
                    <span>Guaranteed satisfaction</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Providers with Staggered Animations */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedSection animation="scale-in" delay={100}>
              <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-110 transition-all duration-500">
                <FaTrophy className="inline mr-2 animate-bounce" />
                Top Performers This Month
              </div>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Premium Providers Who Deliver Value
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={500}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                These certified premium providers consistently deliver superior results that save clients money long-term.
              </p>
            </AnimatedSection>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider, index) => (
              <AnimatedSection 
                key={provider._id}
                delay={index * 150}
                animation="scale-in"
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:border-blue-300 transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-500">
                      {provider.businessName}
                    </h3>
                    <p className="text-slate-600 flex items-center">
                      <FaMapMarkerAlt className="w-4 h-4 mr-1 text-slate-400 group-hover:animate-bounce" />
                      {provider.municipality}, Bataan
                    </p>
                  </div>
                  {provider.badges.verified && (
                    <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium flex items-center hover:bg-green-200 transition-all duration-500 group-hover:scale-110 transform">
                      <FaCheckCircle className="mr-1 group-hover:animate-spin" />
                      Verified
                    </div>
                  )}
                </div>
                
                <p className="text-slate-600 text-sm mb-4 line-clamp-2 group-hover:text-slate-700 transition-colors duration-300">
                  {provider.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.services.slice(0, 2).map((service, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-all duration-500 group-hover:scale-105 transform">
                      {service}
                    </span>
                  ))}
                  {provider.services.length > 2 && (
                    <span className="text-xs text-slate-500 px-2 py-1">+{provider.services.length - 2} more</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'} hover:scale-125 transition-all duration-300 group-hover:animate-pulse`}
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">
                      {provider.rating} ({provider.reviewCount})
                    </span>
                  </div>
                  <Link
                    to={`/provider/${provider._id}`}
                    className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-500 transform hover:scale-110 flex items-center hover:shadow-lg"
                  >
                    View Profile
                    <MdTrendingUp className="ml-1 group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection delay={800} className="text-center mt-12">
            <Link
              to="/explore"
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 inline-flex items-center justify-center hover:scale-110"
            >
              <FaRocket className="mr-2 group-hover:animate-bounce" />
              Find Premium Providers
              <FaBolt className="ml-2 group-hover:animate-pulse" />
            </Link>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Awards Section with 3D Effects */}
      <AnimatedSection className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedSection animation="scale-in" delay={100}>
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-110 transition-all duration-500">
                <FaAward className="inline mr-2 animate-spin-slow" />
                Platform Recognition and Trust
              </div>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Recognized for Excellence in Service Discovery
              </h2>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection delay={100} animation="scale-in" className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-2 group">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-700 group-hover:rotate-12 transform group-hover:shadow-xl">
                <FaTrophy className="text-white text-2xl group-hover:animate-bounce" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors duration-500">2024</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Best Local Platform</h3>
              <p className="text-slate-600 text-sm mb-4">
                Awarded for the best service discovery platform in Bataan Province
              </p>
              <div className="text-xs text-slate-500">Bataan Business Excellence Awards</div>
            </AnimatedSection>

            <AnimatedSection delay={200} animation="scale-in" className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-2 group">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-700 group-hover:rotate-12 transform group-hover:shadow-xl">
                <FaGem className="text-white text-2xl group-hover:animate-pulse" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-500">2024</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Top Digital Solution</h3>
              <p className="text-slate-600 text-sm mb-4">
                Recognizing innovation in digital business solutions
              </p>
              <div className="text-xs text-slate-500">Philippine Digital Awards</div>
            </AnimatedSection>

            <AnimatedSection delay={300} animation="scale-in" className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-2 group">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-700 group-hover:rotate-12 transform group-hover:shadow-xl">
                <FaHandshake className="text-white text-2xl group-hover:animate-bounce" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors duration-500">2024</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Community Impact</h3>
              <p className="text-slate-600 text-sm mb-4">
                Honoring platforms that strengthen local communities
              </p>
              <div className="text-xs text-slate-500">MSME Development Council</div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section with Parallax */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-float"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400/10 rounded-full animate-float-delayed"
            style={{ transform: `translateY(${scrollY * -0.3}px)` }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          ></div>
        </div>
        
        <AnimatedSection className="relative container mx-auto px-4 text-center">
          <AnimatedSection delay={100}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Service Discovery?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Schedule a demo today and witness the transformative power of Bataan Connect. 
              Your journey to service excellence starts here.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={500} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 inline-flex items-center justify-center hover:scale-110"
            >
              <FaRocket className="mr-2 group-hover:animate-bounce" />
              Find Premium Providers
              <FaBolt className="ml-2 group-hover:animate-pulse" />
            </Link>
            <Link
              to="/quality-showcase"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-700 hover:scale-110 inline-flex items-center justify-center"
            >
              <MdBusinessCenter className="mr-2 group-hover:animate-pulse" />
              See Quality Difference
            </Link>
          </AnimatedSection>
        </AnimatedSection>
      </section>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) translateY(-50px); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up-stagger {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes button-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 1s ease-out; }
        .animate-slide-up-stagger { animation: slide-up-stagger 0.8s ease-out; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite; 
        }
        .animate-button-bounce { animation: button-bounce 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        
        .animate-slide-up-delay-100 { animation: slide-up-stagger 0.8s ease-out 0.1s both; }
        .animate-slide-up-delay-200 { animation: slide-up-stagger 0.8s ease-out 0.2s both; }
        .animate-slide-up-delay-300 { animation: slide-up-stagger 0.8s ease-out 0.3s both; }
        .animate-slide-up-delay-400 { animation: slide-up-stagger 0.8s ease-out 0.4s both; }
        .animate-slide-up-delay-500 { animation: slide-up-stagger 0.8s ease-out 0.5s both; }
        .animate-slide-up-delay-600 { animation: slide-up-stagger 0.8s ease-out 0.6s both; }
        
        .animate-fade-in-up-slow { 
          animation: slide-up-stagger 1.2s ease-out both; 
        }
        
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
};

export default HomePage; 