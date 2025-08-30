import { IncidentStatus } from "@prisma/client";

export function disableStatusItem(
  currentStatus: IncidentStatus,
  newStatus: IncidentStatus
) {
    console.log(currentStatus, newStatus);
    console.log(Object.values(IncidentStatus));
  const currentStatusId = Object.values(IncidentStatus).indexOf(currentStatus);
  const newStatusId = Object.values(IncidentStatus).indexOf(newStatus);
  console.log(currentStatusId, newStatusId);
  if (newStatusId == currentStatusId + 1) {
    return false;
  }

  return true;
}
