import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaBrain, 
  FaChartLine, 
  FaUsers, 
  FaShieldAlt, 
  FaStar,
  FaArrowRight,
  FaHandshake,
  FaEye,
  FaCertificate,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { 
  MdBusinessCenter, 
  MdTrendingUp, 
  MdSecurity, 
  MdSpeed,
  MdVerified,
  MdLocationOn
} from 'react-icons/md';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';

import AnimatedCounter from '../../shared/components/AnimatedCounter';
import AnimatedSection from '../../shared/components/AnimatedSection';

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Maria Santos",
      role: "Homeowner",
      location: "Balanga City",
      text: "Rekomendito helped me find the perfect contractor for my house renovation. The AI matching was spot-on!",
      rating: 5,
      project: "Home Renovation"
    },
    {
      name: "Juan Dela Cruz",
      role: "Business Owner",
      location: "Mariveles",
      text: "As a contractor, this platform connects me with quality clients. The verification system builds trust.",
      rating: 5,
      project: "Commercial Building"
    },
    {
      name: "Ana Rodriguez",
      role: "Property Developer",
      location: "Orion",
      text: "The AI image analysis feature saved us time and money by identifying quality issues early.",
      rating: 5,
      project: "Residential Complex"
    }
  ];

  const features = [
    {
      icon: FaBrain,
      title: "AI-Powered Matching",
      description: "Smart algorithm matches your project needs with the most suitable providers in your area.",
      color: "blue"
    },
    {
      icon: FaShieldAlt,
      title: "Verified Providers",
      description: "All providers are thoroughly vetted and verified for quality, reliability, and credentials.",
      color: "green"
    },
    {
      icon: FaChartLine,
      title: "Quality Analytics",
      description: "Advanced image analysis and quality scoring to ensure project excellence.",
      color: "purple"
    },
    {
      icon: FaUsers,
      title: "Trusted Community",
      description: "Join thousands of satisfied clients and verified service providers across Bataan.",
      color: "orange"
    }
  ];

  const stats = [
    { number: 1200, label: "Verified Providers", suffix: "+" },
    { number: 8500, label: "Projects Completed", suffix: "+" },
    { number: 98, label: "Client Satisfaction", suffix: "%" },
    { number: 25, label: "Municipalities Covered", suffix: "" }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Describe Your Project",
      description: "Tell us about your construction or service needs, location, and timeline.",
      icon: MdBusinessCenter
    },
    {
      step: 2,
      title: "Get AI-Matched Providers",
      description: "Our AI analyzes your requirements and matches you with the best providers.",
      icon: FaBrain
    },
    {
      step: 3,
      title: "Compare & Choose",
      description: "Review provider profiles, ratings, and previous work to make your decision.",
      icon: MdTrendingUp
    },
    {
      step: 4,
      title: "Start Your Project",
      description: "Connect directly with your chosen provider and begin your project with confidence.",
      icon: FaHandshake
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <AnimatedSection animation="fade-in-up">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 animate-pulse">
              <HiSparkles className="mr-2" />
              Smart Provider Discovery Platform
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} animation="fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Premium
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">
                Service Providers
              </span>
              in Bataan
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={400} animation="fade-in-up">
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect with verified contractors, skilled workers, and service providers using our AI-powered matching system. 
              Quality, reliability, and excellence guaranteed.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={600} animation="fade-in-up">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/explore"
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-700 hover:scale-110 transform hover:shadow-2xl flex items-center"
              >
                <FaSearch className="mr-3 group-hover:animate-bounce" />
                Find Providers Now
                <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              <Link
                to="/ai-analyzer"
                className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-700 hover:scale-110 flex items-center"
              >
                <FaBrain className="mr-3 group-hover:animate-pulse" />
                Try AI Analyzer
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={800} animation="fade-in-up">
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <AnimatedCounter 
                      target={stat.number} 
                      suffix={stat.suffix}
                      className="text-yellow-400"
                    />
                  </div>
                  <div className="text-blue-200 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Rekomendito?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of service provider discovery with our cutting-edge features designed for excellence.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100} animation="fade-in-up">
                <div className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-${feature.color}-500`}>
                  <div className={`w-16 h-16 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className={`text-3xl text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get connected with the right providers in just four simple steps.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <AnimatedSection key={index} delay={index * 150} animation="fade-in-up">
                <div className="text-center relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full">
                      <FaArrowRight className="text-gray-300 text-2xl absolute left-4 top-0" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What Our Users Say
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Join thousands of satisfied users who found their perfect service providers through Rekomendito.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-2xl mx-1" />
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl md:text-3xl font-light italic mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <FaUsers className="text-2xl" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xl">{testimonials[currentTestimonial].name}</div>
                      <div className="text-blue-200">{testimonials[currentTestimonial].role}</div>
                      <div className="text-blue-300 text-sm flex items-center">
                        <MdLocationOn className="mr-1" />
                        {testimonials[currentTestimonial].location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Find Your Perfect Provider?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Join Rekomendito today and experience the smartest way to connect with verified service providers in Bataan Province.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/explore"
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-500 hover:scale-110 transform hover:shadow-2xl flex items-center"
                >
                  <FaSearch className="mr-3 group-hover:animate-bounce" />
                  Start Exploring
                </Link>
                
                <Link
                  to="/auth"
                  className="group bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-500 hover:scale-110 flex items-center"
                >
                  <FaUsers className="mr-3 group-hover:animate-pulse" />
                  Join as Provider
                </Link>
              </div>

              <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <FaPhoneAlt className="text-blue-400 text-xl" />
                  <span className="text-gray-300">+63 915 123 4567</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <FaEnvelope className="text-blue-400 text-xl" />
                  <span className="text-gray-300">support@rekomendito.ph</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <FaMapMarkerAlt className="text-blue-400 text-xl" />
                  <span className="text-gray-300">Bataan Province</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 