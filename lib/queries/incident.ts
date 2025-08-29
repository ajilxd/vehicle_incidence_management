import { IncidentFilters } from "@/types";
import { apiClient } from "../api-client";
import {
  IncidentsResponse,
  IncidentDetailsResponse,
  IncidentStatsResponse,
} from "@/schemas/response/incident";

export const fetchIncidents: (
  filters: IncidentFilters
) => Promise<IncidentsResponse> = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const endpoint = params.toString() ? `/incidents?${params}` : "/incidents";
  return apiClient.get(endpoint);
};

export const fetchIncidentDetail: (
  id: string
) => Promise<IncidentDetailsResponse> = async (id: string) => {
  return apiClient.get(`/incidents/${id}`);
};

export const fetchIncidentStats: () => Promise<IncidentStatsResponse> =
  async () => {
    return apiClient.get(`/incidents/stats`);
  };
