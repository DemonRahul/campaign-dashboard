'use client';

import { PlatformData } from '@/types/campaign';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PlatformChartProps {
  data: PlatformData[];
}

const COLORS = {
  'Meta': '#1877F2',
  'Google': '#4285F4',
  'LinkedIn': '#0077B5',
  'Other': '#6B7280',
};

const DEFAULT_COLOR = '#9CA3AF';

export function PlatformChart({ data }: PlatformChartProps) {
  const chartData = data.map(item => ({
    name: item.name,
    value: item.budget,
    campaigns: item.campaigns,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            Budget: ${data.value.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Campaigns: {data.campaigns}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No platform data available</p>
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || DEFAULT_COLOR} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry: any) => (
              <span className="text-sm">
                {value} (${entry.payload.value.toLocaleString()})
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}