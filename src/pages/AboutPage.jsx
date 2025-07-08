import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureCard } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  FaUsers, 
  FaShieldAlt, 
  FaHandshake, 
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle 
} from 'react-icons/fa';

const AboutPage = () => {
  const values = [
    {
      icon: FaShieldAlt,
      title: 'Trust & Safety',
      description: 'Every service provider is verified and vetted for your peace of mind.',
      variant: 'success'
    },
    {
      icon: FaHandshake,
      title: 'Quality Service',
      description: 'We connect you with skilled professionals who deliver exceptional results.',
      variant: 'default'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Local Expertise',
      description: 'Supporting local businesses and communities across Bataan Province.',
      variant: 'purple'
    },
    {
      icon: FaUsers,
      title: 'Community First',
      description: 'Building stronger communities through meaningful connections.',
      variant: 'warning'
    }
  ];

  const milestones = [
    { year: '2024', title: 'Platform Launch', description: 'Rekomendito officially launched in Bataan Province' },
    { year: '2024', title: '1,000+ Providers', description: 'Reached our first milestone of verified service providers' },
    { year: '2024', title: 'AI Integration', description: 'Introduced AI-powered matching system' },
    { year: '2024', title: '5,000+ Connections', description: 'Facilitated thousands of successful client-provider matches' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="section-hero bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container-apple">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display font-bold mb-6 animate-fade-in">
              About Rekomendito
            </h1>
            <p className="text-subtitle text-blue-100 mb-8 animate-slide-up">
              We're revolutionizing how people find and connect with service providers 
              in Bataan Province through technology and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-white">
        <div className="container-apple">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="text-headline mb-6">Our Mission</h2>
              <p className="text-body text-gray-600 mb-6">
                To create a trusted marketplace that connects clients with skilled service 
                providers while supporting local businesses and communities in Bataan Province.
              </p>
              <p className="text-body text-gray-600 mb-8">
                We believe in the power of technology to bring people together, create 
                opportunities, and build stronger communities through meaningful connections.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-body">Verified and trusted providers</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-body">AI-powered matching system</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-body">Local community focus</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-apple-2xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Team collaboration" 
                className="w-full h-64 object-cover rounded-apple-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-gray-50">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-6">Our Values</h2>
            <p className="text-subtitle text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Rekomendito
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <FeatureCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                variant={value.variant}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="section bg-white">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-6">Our Journey</h2>
            <p className="text-subtitle text-gray-600 max-w-2xl mx-auto">
              Key milestones in our mission to connect communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-apple flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{milestone.year}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-title mb-2">{milestone.title}</h3>
                  <p className="text-body text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-apple">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-headline mb-6">Ready to Get Started?</h2>
            <p className="text-subtitle text-blue-100 mb-8">
              Join thousands of clients and providers who trust Rekomendito 
              for their service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-50"
                  rightIcon={<FaArrowRight />}
                >
                  Find Providers
                </Button>
              </Link>
              <Link to="/auth?mode=register&type=provider">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Become a Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 