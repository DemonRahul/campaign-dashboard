'use client';

import { useCampaigns } from '@/hooks/useCampaigns';
import { CampaignMetricsCards } from '@/components/CampaignMetricsCards';
import { CampaignTable } from '@/components/CampaignTable';
import { DynamicPlatformChart } from '@/components/DynamicPlatformChart';
import { DynamicStatusChart } from '@/components/DynamicStatusChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { FilterControls } from '@/components/FilterControls';

export default function Dashboard() {
  const {
    campaigns,
    metrics,
    platformData,
    loading,
    error,
    refetch,
    filteredCampaigns,
    filters,
    setFilters,
  } = useCampaigns();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Monitor and analyze your marketing campaign performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Cards */}
        {metrics && <CampaignMetricsCards metrics={metrics} />}

        {/* Filters */}
        <div className="mt-8 mb-6">
          <FilterControls
            filters={filters}
            onFiltersChange={setFilters}
            campaigns={campaigns}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h2>
            <DynamicPlatformChart data={platformData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign Status</h2>
            {metrics && <DynamicStatusChart metrics={metrics} />}
          </div>
        </div>

        {/* Campaign Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Campaigns ({filteredCampaigns.length})
            </h2>
          </div>
          <CampaignTable campaigns={filteredCampaigns} />
        </div>
      </main>
    </div>
  );
}
