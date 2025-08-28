"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchIncidents = async () => {
  const { data } = await axios.get("/api/incidents");
  return data;
};

export default function IncidentList() {
  const { data, isLoading, error } = useQuery(["incidents"], fetchIncidents);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching incidents</div>;

  return (
    <ul>
      {data.map((incident: any) => (
        <li key={incident.id}>{incident.title}</li>
      ))}
    </ul>
  );
}
