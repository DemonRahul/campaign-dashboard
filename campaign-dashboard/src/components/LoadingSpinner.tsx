export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 border-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="mt-4 text-gray-600">Loading campaign data...</p>
    </div>
  );
}