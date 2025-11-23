'use client';

import dynamic from 'next/dynamic';
import { PlatformData } from '@/types/campaign';

const PlatformChart = dynamic(() => import('./PlatformChart').then(mod => ({ default: mod.PlatformChart })), {
  ssr: false,
  loading: () => <div className="h-80 flex items-center justify-center">Loading chart...</div>
});

interface DynamicPlatformChartProps {
  data: PlatformData[];
}

export function DynamicPlatformChart({ data }: DynamicPlatformChartProps) {
  return <PlatformChart data={data} />;
}