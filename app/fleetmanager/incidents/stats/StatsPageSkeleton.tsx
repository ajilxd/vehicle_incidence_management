"use client";

export default function StatsPageSkeleton() {
  // Number of chart cards
  const chartCards = 4;

  return (
    <div className="container mx-auto p-4 space-y-6 animate-pulse">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow-sm p-4 h-24 flex flex-col justify-center"
          >
            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: chartCards }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow-sm p-4 flex flex-col"
          >
            {/* Header */}
            <div className="space-y-2 mb-4">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-3 w-48 bg-gray-200 rounded"></div>
            </div>

            {/* Chart placeholder */}
            <div className="h-[400px] w-full bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
