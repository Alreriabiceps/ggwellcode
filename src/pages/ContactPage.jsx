import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane
} from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: 'Balanga City, Bataan Province, Philippines',
      color: 'text-blue-500'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      details: '+63 947 123 4567',
      color: 'text-green-500'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: 'hello@rekomendito.com',
      color: 'text-purple-500'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: 'Monday - Friday: 8:00 AM - 6:00 PM',
      color: 'text-orange-500'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook', color: 'text-blue-600' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'text-blue-400' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'text-pink-500' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'text-blue-700' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="section-hero bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container-apple">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display font-bold mb-6 animate-fade-in">
              Get in Touch
            </h1>
            <p className="text-subtitle text-blue-100 mb-8 animate-slide-up">
              Have questions? We'd love to hear from you. Send us a message 
              and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container-apple">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-headline mb-6">Send us a Message</h2>
              
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-apple-lg mb-6 animate-slide-down">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Thank you! Your message has been sent successfully.
                  </div>
                </div>
              )}

              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      type="text"
                      label="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      fullWidth
                    />
                    <Input
                      name="email"
                      type="email"
                      label="Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      fullWidth
                    />
                  </div>
                  
                  <Input
                    name="subject"
                    type="text"
                    label="Subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    fullWidth
                  />
                  
                  <Textarea
                    name="message"
                    label="Message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    fullWidth
                  />
                  
                  <Button 
                    type="submit"
                    size="lg"
                    loading={loading}
                    rightIcon={<FaPaperPlane />}
                    fullWidth
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-headline mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6 hover:shadow-apple-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-apple flex items-center justify-center bg-gray-100`}>
                        <info.icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <div>
                        <h3 className="text-title mb-2">{info.title}</h3>
                        <p className="text-body text-gray-600">{info.details}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-title mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 bg-gray-100 rounded-apple flex items-center justify-center hover:bg-gray-200 transition-colors ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-6">Frequently Asked Questions</h2>
            <p className="text-subtitle text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about Rekomendito
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-title mb-3">How do I find service providers?</h3>
              <p className="text-body text-gray-600">
                Simply use our search feature or browse by category. Our AI-powered 
                system will recommend the best providers based on your needs.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-title mb-3">Are all providers verified?</h3>
              <p className="text-body text-gray-600">
                Yes, all service providers go through our thorough verification 
                process to ensure quality and reliability.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-title mb-3">How much does it cost to use?</h3>
              <p className="text-body text-gray-600">
                Rekomendito is free for clients. Service providers pay a small 
                commission only when they successfully complete a project.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-title mb-3">Can I become a service provider?</h3>
              <p className="text-body text-gray-600">
                Absolutely! Click "Become a Provider" to start your registration 
                and join our network of professionals.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 