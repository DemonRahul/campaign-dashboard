'use client';

import dynamic from 'next/dynamic';
import { CampaignMetrics } from '@/types/campaign';

const StatusChart = dynamic(() => import('./StatusChart').then(mod => ({ default: mod.StatusChart })), {
  ssr: false,
  loading: () => <div className="h-80 flex items-center justify-center">Loading chart...</div>
});

interface DynamicStatusChartProps {
  metrics: CampaignMetrics;
}

export function DynamicStatusChart({ metrics }: DynamicStatusChartProps) {
  return <StatusChart metrics={metrics} />;
}