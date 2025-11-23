import { Campaign, CampaignsResponse, CampaignMetrics, PlatformData } from '@/types/campaign';

const API_BASE_URL = 'https://mixo-fe-backend-task.vercel.app';

export class CampaignService {
  private static async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw new Error('Failed to fetch campaign data. Please try again later.');
    }
  }

  static async getCampaigns(): Promise<CampaignsResponse> {
    return this.fetchWithErrorHandling<CampaignsResponse>(`${API_BASE_URL}/campaigns`);
  }

  static async getCampaignById(id: string): Promise<Campaign> {
    const campaigns = await this.getCampaigns();
    const campaign = campaigns.campaigns.find(c => c.id === id);
    
    if (!campaign) {
      throw new Error(`Campaign with id ${id} not found`);
    }
    
    return campaign;
  }

  static calculateCampaignMetrics(campaigns: Campaign[]): CampaignMetrics {
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const pausedCampaigns = campaigns.filter(c => c.status === 'paused').length;
    const completedCampaigns = campaigns.filter(c => c.status === 'completed').length;
    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
    const totalDailyBudget = campaigns.reduce((sum, c) => sum + c.daily_budget, 0);

    return {
      totalCampaigns,
      activeCampaigns,
      pausedCampaigns,
      completedCampaigns,
      totalBudget,
      totalDailyBudget,
    };
  }

  static getPlatformData(campaigns: Campaign[]): PlatformData[] {
    const platformMap = new Map<string, { campaigns: number; budget: number }>();

    campaigns.forEach(campaign => {
      campaign.platforms.forEach(platform => {
        const existing = platformMap.get(platform) || { campaigns: 0, budget: 0 };
        platformMap.set(platform, {
          campaigns: existing.campaigns + 1,
          budget: existing.budget + campaign.budget,
        });
      });
    });

    return Array.from(platformMap.entries()).map(([name, data]) => ({
      name: this.formatPlatformName(name),
      ...data,
    }));
  }

  private static formatPlatformName(platform: string): string {
    const platformNames: Record<string, string> = {
      'meta': 'Meta',
      'google': 'Google',
      'linkedin': 'LinkedIn',
      'other': 'Other',
    };
    return platformNames[platform] || platform;
  }

  static filterCampaigns(
    campaigns: Campaign[], 
    filters: {
      status?: string;
      platform?: string;
      search?: string;
    }
  ): Campaign[] {
    return campaigns.filter(campaign => {
      if (filters.status && campaign.status !== filters.status) {
        return false;
      }
      
      if (filters.platform && !campaign.platforms.includes(filters.platform)) {
        return false;
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          campaign.name.toLowerCase().includes(searchLower) ||
          campaign.id.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }
}