import { CampaignMetrics } from '@/types/campaign';
import { TrendingUp, DollarSign, Activity, CheckCircle } from 'lucide-react';

interface CampaignMetricsCardsProps {
  metrics: CampaignMetrics;
}

export function CampaignMetricsCards({ metrics }: CampaignMetricsCardsProps) {
  const cards = [
    {
      title: 'Total Campaigns',
      value: metrics.totalCampaigns,
      icon: TrendingUp,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Active Campaigns',
      value: metrics.activeCampaigns,
      icon: Activity,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Budget',
      value: `$${metrics.totalBudget.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Daily Budget',
      value: `$${metrics.totalDailyBudget.toLocaleString()}`,
      icon: CheckCircle,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-3 ${card.bgColor} rounded-lg`}>
              <card.icon className={`h-6 w-6 ${card.textColor}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}