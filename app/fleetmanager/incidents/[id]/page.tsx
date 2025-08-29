"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIncidentDetail } from "@/lib/queries/hooks";

export default function IncidentPage({ params }: { params: { id: string } }) {
  const incidentId = params.id;
  const { data: incident } = useIncidentDetail(incidentId);
  console.log(incident);
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Incident Details</h1>
        <p className="text-sm text-muted-foreground">
          #{incident?.id} – {incident?.title}
        </p>
      </div>

      {/* Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Description</h4>
              <p className="text-sm text-muted-foreground">
                {incident?.description}
              </p>
            </div>

            <div>
              <h4 className="font-medium">Status</h4>
              <p className="text-sm text-muted-foreground">
                {incident?.status}
              </p>
            </div>

            <div>
              <h4 className="font-medium">Severity</h4>
              <p className="text-sm text-muted-foreground">
                {incident?.severity}
              </p>
            </div>

            <div>
              <h4 className="font-medium">Type</h4>
              <p className="text-sm text-muted-foreground">{incident?.type}</p>
            </div>

            <div>
              <h4 className="font-medium">Resolved</h4>
              <p className="text-sm text-muted-foreground">
                {incident?.resolved ? "Yes" : "No"}
              </p>
            </div>

            <div>
              <h4 className="font-medium">Resolved At</h4>
              <p className="text-sm text-muted-foreground">
                {incident?.resolvedAt || "N/A"}
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-medium">Resolution Notes</h4>
              <p className="text-sm text-muted-foreground">
                {incident?.resolutionNotes || "N/A"}
              </p>
            </div>

            <Separator className="md:col-span-2" />

            <div>
              <h4 className="font-medium">Estimated Cost</h4>
              <p className="text-sm text-muted-foreground">
                {incident?.estimatedCost || "N/A"}
              </p>
            </div>

            <div>
              <h4 className="font-medium">Actual Cost</h4>
              <p className="text-sm text-muted-foreground">
                {incident?.actualCost || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* People Section */}
      <Card>
        <CardHeader>
          <CardTitle>People</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Reported By</h4>
            <p className="text-sm text-muted-foreground">
              {incident?.reportedBy.name}
            </p>
          </div>
          <div>
            <h4 className="font-medium">Assigned To</h4>
            <p className="text-sm text-muted-foreground">
              {incident?.assignedTo?.name}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Car Section */}
      <Card>
        <CardHeader>
          <CardTitle>Car</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h4 className="font-medium">Model</h4>
            <p className="text-sm text-muted-foreground">
              {incident?.car.model}
            </p>
          </div>
          <div>
            <h4 className="font-medium">Make</h4>
            <p className="text-sm text-muted-foreground">
              {incident?.car.make}
            </p>
          </div>
          <div>
            <h4 className="font-medium">License Plate</h4>
            <p className="text-sm text-muted-foreground">
              {incident?.car.licensePlate}
            </p>
          </div>
          <div>
            <h4 className="font-medium">Odometer</h4>
            <p className="text-sm text-muted-foreground">
              {incident?.carReading?.odometerReading}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
