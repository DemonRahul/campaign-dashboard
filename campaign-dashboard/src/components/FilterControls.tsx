import { Campaign } from '@/types/campaign';
import { Search, Filter } from 'lucide-react';

interface FilterControlsProps {
  filters: {
    status: string;
    platform: string;
    search: string;
  };
  onFiltersChange: (filters: Partial<{ status: string; platform: string; search: string }>) => void;
  campaigns: Campaign[];
}

export function FilterControls({ filters, onFiltersChange, campaigns }: FilterControlsProps) {
  // Extract unique platforms from campaigns
  const platforms = Array.from(
    new Set(campaigns.flatMap(campaign => campaign.platforms))
  ).sort();

  const statusOptions = ['active', 'paused', 'completed'];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="lg:w-48">
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Filter */}
        <div className="lg:w-48">
          <select
            value={filters.platform}
            onChange={(e) => onFiltersChange({ platform: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => onFiltersChange({ status: '', platform: '', search: '' })}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Clear Filters
        </button>
      </div>
    </div>
  );
}