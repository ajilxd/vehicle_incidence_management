import { CarResponse } from "@/schemas/response/car";
import { apiClient } from "../api-client";
import { CarFilters } from "@/types";

export const fetchCars: (filter: CarFilters) => Promise<CarResponse> = async (
  filters = {}
) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const endpoint = params.toString() ? `/cars?${params}` : "/cars";
  return apiClient.get(endpoint);
};
