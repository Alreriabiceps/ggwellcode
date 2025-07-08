import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../lib/auth';
import { FaUserCircle, FaSignOutAlt, FaCog, FaBell } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3); // Mock notification count
  
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
    };

    if (isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Different navigation items based on user role
  const getNavigationItems = () => {
    if (!user) {
      // Guest/Home navigation
      return [
        { label: 'Home', path: '/' },
        { label: 'Explore', path: '/explore' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' }
      ];
    } else if (user.role === 'client') {
      // Client navigation
      return [
        { label: 'Home', path: '/' },
        { label: 'Find Providers', path: '/explore' },
        { label: 'AI Analyzer', path: '/ai-analyzer' },
        { label: 'My Dashboard', path: '/dashboard' },
        { label: 'My Requests', path: '/my-requests' }
      ];
    } else if (user.role === 'provider') {
      // Provider navigation
      return [
        { label: 'Home', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Applications', path: '/applications' },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Profile', path: '/profile' }
      ];
    } else if (user.role === 'admin') {
      // Admin navigation
      return [
        { label: 'Home', path: '/' },
        { label: 'Admin Panel', path: '/admin' },
        { label: 'Providers', path: '/explore' },
        { label: 'Reports', path: '/admin/reports' }
      ];
    }
    return [];
  };

  const navigationItems = getNavigationItems();

  const userNavigationItems = user ? [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/profile' },
    ...(user.role === 'provider' ? [
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Applications', path: '/applications' }
    ] : []),
    ...(user.role === 'client' ? [
      { label: 'My Requests', path: '/my-requests' },
      { label: 'Favorites', path: '/favorites' }
    ] : [])
  ] : [];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-apple shadow-apple border-b border-gray-200' 
          : 'bg-white/80 backdrop-blur-apple-md border-b border-gray-200/50'
      )}
    >
      <nav className="container-apple">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-apple flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Rekomendito
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-4 py-2 rounded-apple text-base font-medium transition-all duration-200',
                  isActive(item.path)
                    ? 'text-blue-500 bg-blue-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search Bar - Show for guests and clients only */}
          {(!user || user.role === 'client') && (
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={user ? "Find service providers..." : "Search providers..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-apple text-sm placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            
            {/* Notifications (for logged-in users) */}
            {user && (
              <button
                type="button"
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-apple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                title={`Notifications for ${user.role}`}
              >
                <FaBell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                )}
              </button>
            )}

            {user ? (
              /* User Menu */
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex items-center gap-2 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-apple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FaUserCircle className="w-6 h-6" />
                  <div className="hidden sm:block">
                    <span className="text-sm font-medium">
                      {user.name || 'User'}
                    </span>
                    <span className={cn(
                      'ml-2 px-2 py-0.5 rounded-apple text-xs font-medium',
                      user.role === 'provider' ? 'bg-blue-100 text-blue-700' :
                      user.role === 'client' ? 'bg-green-100 text-green-700' :
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    )}>
                      {user.role === 'provider' ? 'Provider' :
                       user.role === 'client' ? 'Client' :
                       user.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </div>
                  <svg 
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isUserMenuOpen && 'rotate-180'
                    )} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-apple-lg shadow-apple-lg border border-gray-200 py-2 animate-scale-in">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <span className={cn(
                          'px-2 py-0.5 rounded-apple text-xs font-medium',
                          user.role === 'provider' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'client' ? 'bg-green-100 text-green-700' :
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        )}>
                          {user.role === 'provider' ? 'Provider' :
                           user.role === 'client' ? 'Client' :
                           user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="py-2">
                      {userNavigationItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={cn(
                            'flex items-center px-4 py-2 text-sm transition-colors duration-200',
                            isActive(item.path)
                              ? 'text-blue-500 bg-blue-50'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="border-t border-gray-200 py-2">
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FaCog className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons */
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/auth?mode=login"
                  className="btn btn-ghost btn-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="btn btn-primary btn-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-apple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={cn('w-6 h-6 transition-transform duration-200', isMobileMenuOpen && 'rotate-90')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-apple animate-slide-down">
            <div className="px-4 py-4 space-y-3">
              
              {/* Mobile Search - Show for guests and clients only */}
              {(!user || user.role === 'client') && (
                <form onSubmit={handleSearch} className="lg:hidden">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={user ? "Find service providers..." : "Search providers..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-apple text-sm placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-200"
                    />
                    <button
                      type="submit"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
              )}

              {/* Mobile Navigation */}
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'block px-3 py-2 rounded-apple text-base font-medium transition-all duration-200',
                      isActive(item.path)
                        ? 'text-blue-500 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile User Navigation */}
              {user && userNavigationItems.length > 0 && (
                <div className="border-t border-gray-200 pt-3 space-y-1">
                  {userNavigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'block px-3 py-2 rounded-apple text-base font-medium transition-all duration-200',
                        isActive(item.path)
                          ? 'text-blue-500 bg-blue-50'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <Link
                    to="/auth?mode=login"
                    className="btn btn-ghost w-full"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?mode=register"
                    className="btn btn-primary w-full"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Logout */}
              {user && (
                <div className="border-t border-gray-200 pt-3">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-apple transition-colors duration-200 w-full text-left"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 