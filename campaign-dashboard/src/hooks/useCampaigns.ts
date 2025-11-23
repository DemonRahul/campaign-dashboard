'use client';

import { useState, useEffect } from 'react';
import { Campaign, CampaignsResponse, CampaignMetrics, PlatformData } from '@/types/campaign';
import { CampaignService } from '@/services/api';

interface UseCampaignsReturn {
  campaigns: Campaign[];
  metrics: CampaignMetrics | null;
  platformData: PlatformData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  filteredCampaigns: Campaign[];
  filters: {
    status: string;
    platform: string;
    search: string;
  };
  setFilters: (filters: Partial<{ status: string; platform: string; search: string }>) => void;
}

export function useCampaigns(): UseCampaignsReturn {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);
  const [platformData, setPlatformData] = useState<PlatformData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState({
    status: '',
    platform: '',
    search: '',
  });

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: CampaignsResponse = await CampaignService.getCampaigns();
      setCampaigns(response.campaigns);
      
      const calculatedMetrics = CampaignService.calculateCampaignMetrics(response.campaigns);
      setMetrics(calculatedMetrics);
      
      const calculatedPlatformData = CampaignService.getPlatformData(response.campaigns);
      setPlatformData(calculatedPlatformData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const setFilters = (newFilters: Partial<{ status: string; platform: string; search: string }>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const filteredCampaigns = CampaignService.filterCampaigns(campaigns, filters);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    metrics,
    platformData,
    loading,
    error,
    refetch: fetchCampaigns,
    filteredCampaigns,
    filters,
    setFilters,
  };
}