"use client";

import { Incident } from "@/schemas/response/incident";

export default function IncidentsTable({
  incidents,
}: {
  incidents: Incident[] | undefined;
}) {
  const renderBadge = (value: string, type: "severity" | "status") => {
    const styles: Record<string, string> = {
      severity:
        value === "HIGH"
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800",
      status:
        value === "PENDING"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-green-100 text-green-800",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs ${styles[type]}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-4">Incidents</h2>

      {incidents?.length ? (
        <div className="flex flex-col gap-4">
          {incidents.map((incident, index) => {
            const {
              title,
              severity,
              status,
              occurredAt,
              car,
              carReading,
              reportedBy,
              assignedTo,
              type,
              location,
              description,
            } = incident;

            return (
              <div
                key={incident.id}
                className="bg-white border rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition flex flex-col md:flex-row md:justify-between md:items-start gap-3"
              >
                {/* Left Column: Main Info */}
                <div className="flex-1">
                  <div className="font-semibold text-lg flex items-center justify-between md:justify-start gap-2">
                    <span>
                      #{index + 1} {title}
                    </span>
                    <div className="flex gap-2 md:hidden">
                      {renderBadge(status, "status")}
                      {renderBadge(severity, "severity")}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {description}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 md:mt-2 hidden md:block">
                    {type}
                  </div>
                </div>

                {/* Middle Column: Badges + Car Info */}
                <div className="flex-1 flex flex-col gap-2 md:gap-3">
                  <div className="hidden md:flex gap-2">
                    {renderBadge(status, "status")}
                    {renderBadge(severity, "severity")}
                  </div>
                  <div className="text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">Car:</span> {car?.make}{" "}
                      {car?.model} ({car?.licensePlate})
                    </div>
                    <div>
                      <span className="font-semibold">Odometer:</span>{" "}
                      {carReading?.odometerReading ?? "N/A"}
                    </div>
                  </div>
                </div>

                {/* Right Column: People + Dates */}
                <div className="flex-1 flex flex-col gap-2 md:gap-3 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Reported By:</span>{" "}
                    {reportedBy?.name ?? "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Assigned To:</span>{" "}
                    {assignedTo?.name ?? "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Occurred At:</span>{" "}
                    {new Date(occurredAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-semibold">Reported At:</span>{" "}
                    {carReading?.reportedAt
                      ? new Date(carReading.reportedAt).toLocaleString()
                      : "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Location:</span>{" "}
                    {location ?? "N/A"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">No incidents found</div>
      )}
    </div>
  );
}
