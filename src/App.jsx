import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProviderProfile from './pages/ProviderProfile';
import AuthPage from './pages/AuthPage';
import QualityShowcase from './pages/QualityShowcase';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './modules/admin/AdminDashboard';
import AIAnalyzerPage from './pages/AIAnalyzerPage';

// Context
import { AuthProvider } from './lib/auth.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/ai-analyzer" element={<AIAnalyzerPage />} />
              <Route path="/provider/:id" element={<ProviderProfile />} />
              <Route path="/quality-showcase" element={<QualityShowcase />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<ProviderDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
