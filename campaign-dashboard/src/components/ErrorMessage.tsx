import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Error Loading Data</h2>
      </div>
      <p className="text-gray-600 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </button>
    </div>
  );
}