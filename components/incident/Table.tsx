"use client";

import { useState } from "react";
import { Incident } from "@/schemas/response/incident";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Pencil, X } from "lucide-react";
import { useUpdateIncident } from "@/lib/queries/mutations/incident";
import { useUsers } from "@/lib/queries/hooks";
import { IncidentStatus } from "@prisma/client";
import Link from "next/link";
import { disableStatusItem } from "@/lib/statusFLow";

export default function IncidentsTable({
  incidents,
  page,
}: {
  incidents: Incident[] | undefined;
  page: number;
}) {
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [editingAssignedId, setEditingAssignedId] = useState<number | null>(
    null
  );

  const updateIncident = useUpdateIncident();
  const { data: users } = useUsers();

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
              id,
              title,
              severity,
              status,
              occurredAt,
              car,
              carReading,
              reportedBy,
              assignedTo,
              type,
              description,
            } = incident;

            return (
              <div
                key={id}
                className="bg-white border rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition flex flex-col md:flex-row md:justify-between md:items-start gap-3"
              >
                {/* Left Column: Main Info */}
                <div className="flex-1">
                  <div className="font-semibold text-lg flex items-center justify-between md:justify-start gap-2">
                    <span>
                      #{(page - 1) * 10 + index + 1} {title}
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
                  <div className="flex justify-end">
                    <Link
                      href={`incidents/${id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                  <div>
                    <span className="font-semibold">Reported By:</span>{" "}
                    {reportedBy?.name ?? "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Occurred At:</span>{" "}
                    {new Date(occurredAt).toDateString()}
                  </div>

                  {/* Assigned To - inline edit */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Assigned To:</span>
                    {editingAssignedId === id ? (
                      <>
                        <Select
                          onValueChange={(val) => {
                            updateIncident.mutateAsync({
                              id: "" + id,
                              data: {
                                assignedToId: Number(val),
                                userId: 4,
                              },
                            });
                            setEditingAssignedId(null);
                          }}
                          defaultValue={assignedTo?.id?.toString()}
                        >
                          <SelectTrigger className="w-[150px] h-8">
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            {users?.map((user) => (
                              <SelectItem
                                key={user.id}
                                value={user.id.toString()}
                              >
                                {user.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <X
                          size={14}
                          className="cursor-pointer text-gray-400 hover:text-gray-600"
                          onClick={() => setEditingAssignedId(null)}
                        />
                      </>
                    ) : (
                      <>
                        {assignedTo?.name ?? "N/A"}
                        <Pencil
                          size={14}
                          className="cursor-pointer text-gray-400 hover:text-gray-600"
                          onClick={() => setEditingAssignedId(id)}
                        />
                      </>
                    )}
                  </div>

                  {/* Status - inline edit */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Status:</span>
                    {editingStatusId === id ? (
                      <>
                        <Select
                          onValueChange={(val) => {
                            updateIncident.mutate({
                              id: "" + id,
                              data: { status: val, userId: 4 },
                            });
                            setEditingStatusId(null);
                          }}
                          defaultValue={status}
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"all"}>All</SelectItem>
                            <SelectItem
                              value={IncidentStatus.PENDING}
                              disabled={disableStatusItem(
                                status,
                                IncidentStatus.PENDING
                              )}
                            >
                              Pending
                            </SelectItem>
                            <SelectItem
                              value={IncidentStatus.RESOLVED}
                              disabled={disableStatusItem(
                                status,
                                IncidentStatus.RESOLVED
                              )}
                            >
                              Resolved
                            </SelectItem>
                            <SelectItem
                              value={IncidentStatus.CLOSED}
                              disabled={disableStatusItem(
                                status,
                                IncidentStatus.CLOSED
                              )}
                            >
                              Closed
                            </SelectItem>
                            <SelectItem
                              value={IncidentStatus.CANCELLED}
                              disabled={disableStatusItem(
                                status,
                                IncidentStatus.CANCELLED
                              )}
                            >
                              Cancelled
                            </SelectItem>
                            <SelectItem
                              value={IncidentStatus.IN_PROGRESS}
                              disabled={disableStatusItem(
                                status,
                                IncidentStatus.IN_PROGRESS
                              )}
                            >
                              In Progress
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <X
                          size={14}
                          className="cursor-pointer text-gray-400"
                          onClick={() => setEditingStatusId(null)}
                        />
                      </>
                    ) : (
                      <>
                        {renderBadge(status, "status")}
                        <Pencil
                          size={14}
                          className="cursor-pointer text-gray-400 hover:text-gray-600"
                          onClick={() => setEditingStatusId(id)}
                        />
                      </>
                    )}
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
