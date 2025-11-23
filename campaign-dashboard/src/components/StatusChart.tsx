'use client';

import { CampaignMetrics } from '@/types/campaign';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatusChartProps {
  metrics: CampaignMetrics;
}

const STATUS_COLORS = {
  'Active': '#10B981',
  'Paused': '#F59E0B',
  'Completed': '#6B7280',
};

export function StatusChart({ metrics }: StatusChartProps) {
  const data = [
    {
      status: 'Active',
      count: metrics.activeCampaigns,
    },
    {
      status: 'Paused',
      count: metrics.pausedCampaigns,
    },
    {
      status: 'Completed',
      count: metrics.completedCampaigns,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].payload.status}</p>
          <p className="text-sm text-gray-600">
            Campaigns: {payload[0].value}
          </p>
          <p className="text-sm text-gray-600">
            Percentage: {((payload[0].value / metrics.totalCampaigns) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        {data.map((item) => (
          <div key={item.status} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: STATUS_COLORS[item.status as keyof typeof STATUS_COLORS] }}
            />
            <span className="text-sm text-gray-600">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}