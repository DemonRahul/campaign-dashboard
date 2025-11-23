export interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
}

export interface CampaignsResponse {
  campaigns: Campaign[];
  total: number;
}

export interface CampaignMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  pausedCampaigns: number;
  completedCampaigns: number;
  totalBudget: number;
  totalDailyBudget: number;
}

export interface PlatformData {
  name: string;
  campaigns: number;
  budget: number;
}