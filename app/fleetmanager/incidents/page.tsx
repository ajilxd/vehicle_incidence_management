"use client";

import { useState, useCallback, useMemo } from "react";
import IncidentsTable from "@/components/incident/Table";
import Pagination from "@/components/pagination";
import { useIncidents, useUsers } from "@/lib/queries/hooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { IncidentSeverity, IncidentStatus, IncidentType } from "@prisma/client";
import { debounce } from "@/lib/debounce";

export default function Page() {
  // filters
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<IncidentStatus | string>("");
  const [severity, setSeverity] = useState<IncidentSeverity | string>("");
  const [type, setType] = useState<IncidentType | string>("");
  const [assigned, setAssigned] = useState("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  // pagination
  const handlePageChange = useCallback((p: number) => setPage(p), []);

  // debounced search
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 1000),
    []
  );

  const { data: response } = useIncidents({
    page: page,
    limit: 10,
    query: search === "all" ? "" : search,
    status: status === "all" ? "" : status,
    severity: severity === "all" ? "" : severity,
    assignedToId: assigned === "all" ? "" : assigned,
    startDate: dateFrom,
    endDate: dateTo,
  });

  const { data: users } = useUsers();

  const incidents = response?.data ?? [];
  const meta = response?.meta;
  const assignees = users ?? [];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Status */}
        <div className="flex flex-col">
          <Label className="mb-1">Status</Label>
          <Select onValueChange={(val) => setStatus(val || "")}>
            <SelectTrigger className="w-11/12 md:w-min ">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"all"}>All</SelectItem>
              <SelectItem value={IncidentStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={IncidentStatus.RESOLVED}>Resolved</SelectItem>
              <SelectItem value={IncidentStatus.CLOSED}>Closed</SelectItem>
              <SelectItem value={IncidentStatus.CANCELLED}>
                Cancelled
              </SelectItem>
              <SelectItem value={IncidentStatus.IN_PROGRESS}>
                In Progress
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Severity */}
        <div className="flex flex-col">
          <Label className="mb-1">Severity</Label>
          <Select onValueChange={(val) => setSeverity(val || "")}>
            <SelectTrigger className="w-11/12 md:w-min ">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"all"}>All</SelectItem>
              <SelectItem value={IncidentSeverity.LOW}>Low</SelectItem>
              <SelectItem value={IncidentSeverity.MEDIUM}>Medium</SelectItem>
              <SelectItem value={IncidentSeverity.HIGH}>High</SelectItem>
              <SelectItem value={IncidentSeverity.CRITICAL}>
                Critical
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <Label className="mb-1">Type</Label>
          <Select onValueChange={(val) => setType(val || "")}>
            <SelectTrigger className="w-11/12 md:w-min">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"all"}>All</SelectItem>
              <SelectItem value={IncidentType.VANDALISM}>Vandalism</SelectItem>
              <SelectItem value={IncidentType.ACCIDENT}>Accident</SelectItem>
              <SelectItem value={IncidentType.THEFT}>Theft</SelectItem>
              <SelectItem value={IncidentType.OTHER}>Other</SelectItem>
              <SelectItem value={IncidentType.FUEL_ISSUE}>
                Fuel Issue
              </SelectItem>
              <SelectItem value={IncidentType.TRAFFIC_VIOLATION}>
                Traffic Violation
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Assigned To */}
        <div className="flex flex-col">
          <Label className="mb-1">Assigned To</Label>
          <Select onValueChange={(val) => setAssigned(val || "")}>
            <SelectTrigger className="w-11/12 md:w-min ">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {assignees.map((i) => (
                <SelectItem key={i.id} value={i.id}>
                  {i.name}
                </SelectItem>
              ))}
              <SelectItem value={"all"}>All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date From */}
        <div className="flex flex-col ">
          <Label className="mb-1">Date From</Label>
          <Input
            type="date"
            className="w-11/12 md:w-min "
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        {/* Date To */}
        <div className="flex flex-col ">
          <Label className="mb-1">Date To</Label>
          <Input
            type="date"
            className="w-11/12 md:w-min "
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        {/* Search (full width row) */}
        <div className="flex flex-col sm:col-span-2 md:col-span-3 lg:col-span-6">
          <Label className="mb-1">Search</Label>
          <Input
            placeholder="Search by title..."
            className="w-11/12 md:w-full "
            value={search}
            onChange={(e) => debouncedSetSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Incidents Table */}
      <IncidentsTable incidents={incidents} page={page} />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={meta?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
