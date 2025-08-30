"use client";

export default function IncidentsTableSkeleton({
  count = 5,
}: {
  count?: number;
}) {
  return (
    <div className="p-4 sm:p-6 space-y-4 animate-pulse">
      <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>{" "}
      {/* Table heading */}
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white border rounded-lg shadow-sm p-4 sm:p-6 flex flex-col md:flex-row md:justify-between md:items-start gap-3"
        >
          {/* Left Column: Main Info */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-3 w-full bg-gray-200 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-200 rounded hidden md:block"></div>
          </div>

          {/* Middle Column: Badges + Car Info */}
          <div className="flex-1 flex flex-col gap-2 md:gap-3">
            <div className="hidden md:flex gap-2">
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Right Column: People + Dates */}
          <div className="flex-1 flex flex-col gap-2 md:gap-3">
            <div className="h-3 w-16 bg-gray-300 rounded self-end"></div>{" "}
            <div className="h-3 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-32 bg-gray-200 rounded"></div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-6 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-3 w-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
