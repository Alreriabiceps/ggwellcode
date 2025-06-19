// AI Service for Quality Provider Platform
const AI_API_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:5000/api/ai';

class QualityAI {
  
  // Generate compelling value proposition for providers
  async generateValueProposition(provider) {
    try {
      const response = await fetch(`${AI_API_URL}/value-proposition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: provider.businessName,
          services: provider.services,
          experience: provider.yearsExperience,
          rating: provider.rating,
          specialties: provider.specialties,
          location: provider.municipality
        })
      });
      
      const data = await response.json();
      return data.valueProposition;
    } catch (error) {
      console.error('AI Value Proposition Error:', error);
      return this.fallbackValueProposition(provider);
    }
  }

  // Analyze why a provider is worth premium pricing
  async analyzeQualityFactors(provider) {
    try {
      const response = await fetch(`${AI_API_URL}/quality-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: provider,
          reviews: provider.reviews || [],
          portfolio: provider.portfolio || []
        })
      });
      
      const data = await response.json();
      return {
        qualityScore: data.qualityScore,
        strengths: data.strengths,
        valueJustification: data.valueJustification,
        competitiveAdvantages: data.competitiveAdvantages
      };
    } catch (error) {
      console.error('AI Quality Analysis Error:', error);
      return this.fallbackQualityAnalysis(provider);
    }
  }

  // Generate educational content about quality vs cheap work
  async generateQualityEducation(serviceType) {
    try {
      const response = await fetch(`${AI_API_URL}/quality-education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceType: serviceType
        })
      });
      
      const data = await response.json();
      return {
        cheapWorkRisks: data.cheapWorkRisks,
        qualityBenefits: data.qualityBenefits,
        costComparison: data.costComparison,
        redFlags: data.redFlags
      };
    } catch (error) {
      console.error('AI Education Error:', error);
      return this.fallbackEducationContent(serviceType);
    }
  }

  // Smart matching based on quality requirements
  async intelligentQualityMatch(clientRequirements) {
    try {
      const response = await fetch(`${AI_API_URL}/quality-match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requirements: clientRequirements,
          prioritizeQuality: true,
          budget: clientRequirements.budget,
          timeline: clientRequirements.timeline
        })
      });
      
      const data = await response.json();
      return {
        recommendedProviders: data.providers,
        qualityRecommendations: data.recommendations,
        budgetGuidance: data.budgetGuidance
      };
    } catch (error) {
      console.error('AI Matching Error:', error);
      return this.fallbackMatching(clientRequirements);
    }
  }

  // Generate personalized quality tips for clients
  async generateQualityTips(projectType, budget) {
    try {
      const response = await fetch(`${AI_API_URL}/quality-tips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectType: projectType,
          budget: budget
        })
      });
      
      const data = await response.json();
      return data.tips;
    } catch (error) {
      console.error('AI Tips Error:', error);
      return this.fallbackQualityTips(projectType);
    }
  }

  // Fallback methods for when AI is unavailable
  fallbackValueProposition(provider) {
    return `${provider.businessName} brings ${provider.yearsExperience} years of proven expertise in ${provider.services.join(', ')}. With a ${provider.rating}-star rating and verified quality certification, we deliver lasting results that save you money long-term.`;
  }

  fallbackQualityAnalysis(provider) {
    return {
      qualityScore: Math.min(100, provider.rating * 20 + (provider.yearsExperience >= 10 ? 10 : 0)),
      strengths: ['Experienced team', 'Quality materials', 'Proven track record'],
      valueJustification: 'Premium providers use superior materials and proven techniques that last 3x longer than cheap alternatives.',
      competitiveAdvantages: ['Guaranteed workmanship', 'Premium materials included', 'No hidden costs']
    };
  }

  fallbackEducationContent(serviceType) {
    return {
      cheapWorkRisks: [
        'Poor quality materials that fail quickly',
        'Inexperienced workers causing damage',
        'No warranty or guarantee coverage',
        'Hidden costs and unexpected repairs'
      ],
      qualityBenefits: [
        'Premium materials lasting 3x longer',
        'Expert craftsmanship with guarantees',
        'Comprehensive warranties included',
        'Transparent pricing with no surprises'
      ],
      costComparison: {
        cheap5Year: 200000,
        premium5Year: 120000,
        savings: 80000
      },
      redFlags: [
        'Significantly below market pricing',
        'No proper licensing or insurance',
        'Pressure for immediate decision',
        'Cash-only payment requirements'
      ]
    };
  }

  fallbackMatching(requirements) {
    return {
      recommendedProviders: [],
      qualityRecommendations: [
        'Prioritize providers with 4.5+ ratings',
        'Choose verified and certified businesses',
        'Look for comprehensive warranties',
        'Check portfolio of recent work'
      ],
      budgetGuidance: 'Quality providers typically cost 20-30% more upfront but save 40-60% over 5 years through durability and reliability.'
    };
  }

  fallbackQualityTips(projectType) {
    return [
      'Always verify provider credentials and insurance',
      'Request detailed quotes with material specifications',
      'Check recent portfolio work and client references',
      'Understand warranty terms and coverage',
      'Compare total cost of ownership, not just upfront price'
    ];
  }
}

export const qualityAI = new QualityAI();
export default qualityAI; 