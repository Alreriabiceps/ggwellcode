import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { adminAPI } from '../lib/api';
import { useAuth } from '../lib/auth.jsx';

const HomePage = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    loadHighlights();
  }, []);

  const loadHighlights = async () => {
    try {
      const response = await adminAPI.getHighlights();
      setHighlights(response.data.data.highlights);
    } catch (error) {
      console.error('Error loading highlights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🏗️ Bataan Connect
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Smart Contractor & MSME Discovery Platform for Bataan. 
            Connect with trusted, verified service providers in your area.
          </p>
          <div className="flex gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link to="/explore">
                  <Button size="lg" variant="secondary">
                    Explore Providers
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/explore">
                  <Button size="lg" variant="secondary">
                    Find Services
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button size="lg" variant="outline">
                    Post a Job
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <CardTitle>Smart Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Find verified contractors and service providers using our AI-powered matching system.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <CardTitle>Location-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Discover providers near you with our integrated map system and location filters.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🎖️</div>
                <CardTitle>Verified Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Work with badge-verified providers who have proven their quality and reliability.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weekly Highlights */}
      {highlights.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Providers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight) => (
                <Card key={highlight._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {highlight.provider?.businessName?.charAt(0) || 'P'}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {highlight.provider?.businessName || 'Featured Provider'}
                        </CardTitle>
                        <CardDescription>
                          {highlight.provider?.location?.barangay}, {highlight.provider?.location?.municipality}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {highlight.description || highlight.provider?.businessDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {highlight.provider?.services?.slice(0, 3).map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {service.name || service.category}
                        </span>
                      ))}
                    </div>
                    <Link to={`/providers/${highlight.provider?._id}`}>
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Bataan Connect today and discover quality service providers in your area.
          </p>
          {!isAuthenticated ? (
            <Link to="/auth">
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
            </Link>
          ) : user?.role !== 'provider' ? (
            <Link to="/auth?mode=provider">
              <Button size="lg" variant="secondary">
                Become a Provider
              </Button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <Button size="lg" variant="secondary">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage; 