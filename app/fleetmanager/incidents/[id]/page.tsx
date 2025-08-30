"use client";

import GoBackButton from "@/components/goback-button";
import { CommentBox } from "@/components/incident/CommentBox";
import { StatusTimeline } from "@/components/incident/StatusTimeline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIncidentDetail } from "@/lib/queries/hooks";
import { useAddIncidentComment } from "@/lib/queries/mutations/incident";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function IncidentPage() {
  const params = useParams();
  const incidentId = params.id as string;
  const incidentComment = useAddIncidentComment();
  const { data: incident } = useIncidentDetail(incidentId);
  const incidentUpdates = incident?.updates || [];
  const statusUpdates = incidentUpdates
    .filter((update) => update.updateType === "STATUS_CHANGE")
    .map((i) => {
      return {
        status: i.updatedStatus,
        date: i.createdAt,
      };
    });

  async function handleComment(comment: string) {
    if (!comment.trim()) return;
    await toast.promise(
      incidentComment.mutateAsync({ id: incidentId, comment, userId: 1 }),
      {
        loading: "Adding comment...",
        success: "Comment added successfully",
        error: "Failed to add comment",
      }
    );
  }
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Title */}
      <GoBackButton />

      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold">
          #{incident?.id} – {incident?.title}
        </h1>
        <p className="text-sm text-muted-foreground">Incident Details</p>
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
                {incident?.resolvedAt ? "Yes" : "No"}
              </p>
            </div>

            <div>
              <h4 className="font-medium">Resolved At</h4>
              <p className="text-sm text-muted-foreground">
                {"" + incident?.resolvedAt || "N/A"}
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

      <Card>
        <CardHeader>
          <CardTitle>Incident Images</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {incident?.images && incident.images.length > 0 ? (
            incident?.images.map((url, idx) => (
              <div
                key={idx}
                className="relative w-full h-48 rounded overflow-hidden border border-gray-200"
              >
                <Image
                  src={url}
                  fill
                  className="object-cover"
                  alt={"Incident Image"}
                />
              </div>
            ))
          ) : (
            <p className="text-muted-foreground col-span-full text-center">
              No images
            </p>
          )}
        </CardContent>
      </Card>
      {/* status timeline */}
      <StatusTimeline data={statusUpdates} />
      <Card>
        <CardHeader>
          <CardTitle>Incident Logs</CardTitle>
          <CardDescription>
            Recent updates and actions for this incident
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {incident?.updates && incident?.updates?.length > 0 ? (
            incident.updates.map((log) => (
              <div
                key={log.id}
                className="border border-gray-200 rounded p-3 hover:bg-gray-50 transition"
              >
                <p className="text-sm font-medium text-gray-700">
                  {log.message}
                </p>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{log.updateType}</span>
                  <span>
                    {log.user.name} — {new Date(log.createdAt).toDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center">
              No logs available
            </p>
          )}
        </CardContent>
      </Card>
      <CommentBox onAddComment={handleComment} />
    </div>
  );
}
