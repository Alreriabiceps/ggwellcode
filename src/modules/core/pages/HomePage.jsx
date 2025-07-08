import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { FeatureCard, StatsCard } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { 
  FaSearch, 
  FaRobot, 
  FaMapMarkerAlt, 
  FaShieldAlt,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteLeft 
} from 'react-icons/fa';

const HomePage = () => {
  const features = [
    {
      icon: FaSearch,
      title: 'Smart Discovery',
      description: 'Find the perfect service providers using our intelligent matching system.',
      variant: 'default'
    },
    {
      icon: FaRobot,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms analyze your needs and recommend the best providers.',
      variant: 'success'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location-Based',
      description: 'Discover trusted providers in Bataan Province with local expertise.',
      variant: 'purple'
    },
    {
      icon: FaShieldAlt,
      title: 'Verified Providers',
      description: 'All service providers are thoroughly vetted and verified for quality.',
      variant: 'warning'
    }
  ];

  const stats = [
    {
      title: 'Active Providers',
      value: '1,200+',
      description: 'Verified professionals'
    },
    {
      title: 'Happy Clients',
      value: '5,000+',
      description: 'Successful connections'
    },
    {
      title: 'Services',
      value: '50+',
      description: 'Different categories'
    },
    {
      title: 'Success Rate',
      value: '98%',
      description: 'Client satisfaction'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Describe Your Needs',
      description: 'Tell us what service you need and your specific requirements.'
    },
    {
      number: '02',
      title: 'Get AI Recommendations',
      description: 'Our smart system finds and ranks the best matching providers.'
    },
    {
      number: '03',
      title: 'Connect & Hire',
      description: 'Review profiles, compare options, and hire with confidence.'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Small Business Owner',
      content: 'Rekomendito helped me find the perfect web developer for my business. The AI matching was incredibly accurate!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Juan Dela Cruz',
      role: 'Homeowner',
      content: 'Finding a reliable contractor was so easy. The verification process gives me peace of mind.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Ana Reyes',
      role: 'Event Planner',
      content: 'The location-based matching feature is fantastic. I found amazing local vendors for my events.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="section-hero bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container-apple relative">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-apple rounded-apple-lg border border-white/20 mb-6 animate-fade-in">
              <FaStar className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Trusted by 5,000+ clients in Bataan</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-display font-bold mb-4 animate-slide-up">
              Discover Premium
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                Service Providers
              </span>
            </h1>

            {/* Hero Description */}
            <p className="text-subtitle text-blue-100 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Connect with verified professionals in Bataan Province using our AI-powered matching system. 
              Find the perfect provider for your needs with confidence and ease.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/explore">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-50 shadow-apple-lg hover:shadow-apple-xl"
                  rightIcon={<FaArrowRight />}
                >
                  Find Providers
                </Button>
              </Link>
              <Link to="/auth?mode=register&type=provider">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-apple"
                >
                  Become a Provider
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-200">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-4 animate-fade-in">
              Why Choose Rekomendito?
            </h2>
            <p className="text-subtitle text-gray-600 max-w-2xl mx-auto animate-fade-in">
              Our platform combines cutting-edge technology with local expertise to deliver 
              the best service provider matching experience.
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
                interactive
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-gray-50">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-4 animate-fade-in">
              How It Works
            </h2>
            <p className="text-subtitle text-gray-600 max-w-2xl mx-auto animate-fade-in">
              Getting started is simple. Follow these three steps to find your perfect service provider.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-blue-500 text-white rounded-apple-2xl flex items-center justify-center text-2xl font-bold shadow-apple group-hover:shadow-apple-lg transition-shadow duration-300">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-1/2"></div>
                  )}
                </div>

                {/* Step Content */}
                <h3 className="text-title mb-3 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-body text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/explore">
              <Button 
                size="lg" 
                rightIcon={<FaArrowRight />}
                className="animate-fade-in"
              >
                Start Your Search
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-4 animate-fade-in">
              What Our Users Say
            </h2>
            <p className="text-subtitle text-gray-600 max-w-2xl mx-auto animate-fade-in">
              Don't just take our word for it. Here's what real users have to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-apple-xl p-8 hover:shadow-apple-lg transition-shadow duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="w-8 h-8 text-blue-500 mb-6" />

                {/* Testimonial Content */}
                <p className="text-body text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container-apple">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-headline mb-6 animate-fade-in">
              Ready to Find Your Perfect Provider?
            </h2>
            <p className="text-subtitle text-blue-100 mb-10 animate-fade-in">
              Join thousands of satisfied clients who have found their ideal service providers 
              through our AI-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/explore">
                <Button 
                  size="xl" 
                  className="bg-white text-blue-600 hover:bg-gray-50 shadow-apple-lg"
                  rightIcon={<FaArrowRight />}
                >
                  Get Started Today
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-apple"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 text-blue-200 animate-fade-in">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5" />
                <span className="text-sm">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="w-5 h-5" />
                <span className="text-sm">Verified Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="w-5 h-5" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 