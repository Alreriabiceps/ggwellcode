// AI Smart Matching Service for Bataan Connect
// Powered by Gemini AI

const API_BASE_URL = 'http://localhost:5000/api';

class AISmartMatchingService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/ai-smart-matching`;
  }

  // Analyze project requirements using AI
  async analyzeProject(projectDescription, budget = null, timeline = null) {
    try {
      const response = await fetch(`${this.baseURL}/analyze-project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: projectDescription,
          budget,
          timeline
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Project analysis error:', error);
      return this.getFallbackAnalysis(projectDescription);
    }
  }

  // Find matching providers using AI
  async findMatches(projectDescription, preferences = {}) {
    try {
      const response = await fetch(`${this.baseURL}/find-matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: projectDescription,
          preferences
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI matching error:', error);
      return this.getFallbackMatches();
    }
  }

  // Complete AI analysis with recommendations
  async completeAnalysis(projectDescription, budget = null) {
    try {
      const response = await fetch(`${this.baseURL}/complete-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: projectDescription,
          budget
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Complete analysis error:', error);
      return this.getFallbackCompleteAnalysis(projectDescription);
    }
  }

  // Enhanced search with AI insights
  async enhancedSearch(query, filters = {}) {
    try {
      const analysisPromise = this.analyzeProject(query);
      const matchesPromise = this.findMatches(query, filters);
      
      const [analysis, matches] = await Promise.all([analysisPromise, matchesPromise]);
      
      return {
        analysis,
        matches,
        enhanced: true
      };
    } catch (error) {
      console.error('Enhanced search error:', error);
      return this.getFallbackEnhancedSearch(query);
    }
  }

  // Get smart recommendations
  async getSmartRecommendations(projectType, budget, timeline) {
    try {
      const response = await fetch(`${this.baseURL}/insights`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const insights = await response.json();
      return this.processRecommendations(insights, projectType, budget, timeline);
    } catch (error) {
      console.error('Smart recommendations error:', error);
      return this.getFallbackRecommendations(projectType);
    }
  }

  // Fallback methods for when AI service is unavailable
  getFallbackAnalysis(description) {
    return {
      detectedServices: ['General Construction', 'Project Management'],
      complexity: 5,
      estimatedCost: { min: 50000, max: 150000 },
      timeline: '2-4 months',
      riskFactors: ['Weather dependency', 'Material availability'],
      recommendations: [
        'Hire experienced contractors',
        'Plan for weather delays',
        'Get multiple quotes'
      ]
    };
  }

  getFallbackMatches() {
    return {
      matches: [
        {
          providerId: 1,
          compatibilityScore: 85,
          reasons: ['High rating', 'Relevant experience', 'Local presence']
        },
        {
          providerId: 2,
          compatibilityScore: 78,
          reasons: ['Competitive pricing', 'Good reviews', 'Available timeline']
        }
      ],
      totalFound: 2
    };
  }

  getFallbackCompleteAnalysis(description) {
    return {
      analysis: this.getFallbackAnalysis(description),
      matches: this.getFallbackMatches(),
      insights: {
        marketTrends: 'Construction demand is high in Bataan',
        pricingGuidance: 'Expect 10-15% price variation across providers',
        qualityIndicators: ['Licensing', 'Insurance', 'Portfolio', 'References']
      }
    };
  }

  getFallbackEnhancedSearch(query) {
    return {
      analysis: this.getFallbackAnalysis(query),
      matches: this.getFallbackMatches(),
      enhanced: false,
      fallback: true
    };
  }

  getFallbackRecommendations(projectType) {
    return {
      recommendations: [
        'Choose providers with 4.5+ ratings',
        'Verify licenses and insurance',
        'Request detailed quotes',
        'Check recent project portfolios'
      ],
      tips: [
        'Quality providers save money long-term',
        'Get at least 3 quotes for comparison',
        'Check references from recent clients'
      ]
    };
  }

  processRecommendations(insights, projectType, budget, timeline) {
    return {
      recommendations: [
        `For ${projectType} projects, prioritize experience over lowest price`,
        `With your ${budget} budget, expect quality work from verified providers`,
        `Given ${timeline} timeline, book providers 2-3 weeks in advance`
      ],
      insights: insights,
      customized: true
    };
  }
}

// Create and export a singleton instance
const aiSmartMatching = new AISmartMatchingService();

export default aiSmartMatching; 