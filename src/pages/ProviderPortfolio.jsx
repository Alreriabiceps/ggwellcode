import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { 
  FaPlus, 
  FaTrash, 
  FaCamera, 
  FaArrowLeft,
  FaEdit
} from 'react-icons/fa';

const ProviderPortfolio = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    description: '',
    image: null,
    category: ''
  });

  useEffect(() => {
    // Simulate loading portfolio data
    setTimeout(() => {
      setPortfolio([
        {
          id: 1,
          title: "Modern Kitchen Design",
          description: "Complete kitchen renovation with premium appliances and contemporary design",
          image: "/api/placeholder/400/300",
          category: "Kitchen",
          completedDate: "Dec 2023",
          client: "Happy Client",
          budget: "₱150,000"
        },
        {
          id: 2,
          title: "Luxury Bathroom Renovation",
          description: "Full bathroom makeover with premium fixtures and modern styling",
          image: "/api/placeholder/400/300",
          category: "Bathroom",
          completedDate: "Nov 2023",
          client: "Satisfied Customer",
          budget: "₱95,000"
        },
        {
          id: 3,
          title: "Commercial Office Space",
          description: "Professional office renovation with modern amenities",
          image: "/api/placeholder/400/300",
          category: "Commercial",
          completedDate: "Oct 2023",
          client: "Business Owner",
          budget: "₱280,000"
        },
        {
          id: 4,
          title: "Living Room Makeover",
          description: "Contemporary living space design with smart storage solutions",
          image: "/api/placeholder/400/300",
          category: "Living Room",
          completedDate: "Sep 2023",
          client: "Modern Family",
          budget: "₱120,000"
        },
        {
          id: 5,
          title: "Master Bedroom Suite",
          description: "Elegant bedroom design with walk-in closet and private bathroom",
          image: "/api/placeholder/400/300",
          category: "Bedroom",
          completedDate: "Aug 2023",
          client: "Luxury Home",
          budget: "₱200,000"
        },
        {
          id: 6,
          title: "Restaurant Interior",
          description: "Full restaurant renovation with modern industrial design",
          image: "/api/placeholder/400/300",
          category: "Commercial",
          completedDate: "Jul 2023",
          client: "Restaurant Owner",
          budget: "₱450,000"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddPortfolio = () => {
    if (newPortfolioItem.title && newPortfolioItem.description) {
      const newItem = {
        id: Date.now(),
        ...newPortfolioItem,
        image: newPortfolioItem.image || "/api/placeholder/400/300",
        completedDate: "Recent",
        client: "New Client",
        budget: "₱0"
      };
      setPortfolio([newItem, ...portfolio]);
      setNewPortfolioItem({ title: '', description: '', image: null, category: '' });
      setShowAddPortfolio(false);
    }
  };

  const handleDeletePortfolio = (id) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      setPortfolio(portfolio.filter(item => item.id !== id));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewPortfolioItem({...newPortfolioItem, image: imageUrl});
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="mr-4 p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-blue-600"
              >
                <FaArrowLeft className="text-xl" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Portfolio</h1>
                <p className="text-gray-600 text-lg">Showcase your best work to attract clients</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddPortfolio(true)}
              className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaPlus className="mr-2" />
              Add Project
            </button>
          </div>
        </div>

        {/* Add Portfolio Form */}
        {showAddPortfolio && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Project</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                  <input
                    type="text"
                    value={newPortfolioItem.title}
                    onChange={(e) => setNewPortfolioItem({...newPortfolioItem, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter project title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newPortfolioItem.category}
                    onChange={(e) => setNewPortfolioItem({...newPortfolioItem, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newPortfolioItem.description}
                    onChange={(e) => setNewPortfolioItem({...newPortfolioItem, description: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the project details, challenges, and what made it special"
                  />
                </div>
              </div>
              
              {/* Image Upload */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    {newPortfolioItem.image ? (
                      <div className="relative">
                        <img
                          src={newPortfolioItem.image}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setNewPortfolioItem({...newPortfolioItem, image: null})}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <FaCamera className="mx-auto text-4xl text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">Upload a project image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          <FaCamera className="mr-2" />
                          Choose Image
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-8 pt-6 border-t">
              <button
                onClick={handleAddPortfolio}
                disabled={!newPortfolioItem.title || !newPortfolioItem.description}
                className="flex items-center bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPlus className="mr-2" />
                Add Project
              </button>
              <button
                onClick={() => {
                  setShowAddPortfolio(false);
                  setNewPortfolioItem({ title: '', description: '', image: null, category: '' });
                }}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Portfolio Grid */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {portfolio.length > 0 ? (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Your Projects ({portfolio.length})</h3>
                <p className="text-gray-600 mt-2">Showcase your best work to potential clients</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolio.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400';
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                          title="Edit Project"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDeletePortfolio(item.id)}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          title="Delete Project"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex justify-between">
                          <span>Completed:</span>
                          <span className="font-medium">{item.completedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Client:</span>
                          <span className="font-medium">{item.client}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Budget:</span>
                          <span className="font-medium text-green-600">{item.budget}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCamera className="text-4xl text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">No Portfolio Items Yet</h4>
              <p className="text-gray-600 mb-8">
                Add your best work to showcase your skills to potential clients
              </p>
              <button
                onClick={() => setShowAddPortfolio(true)}
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaPlus className="mr-2" />
                Add Your First Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderPortfolio; 