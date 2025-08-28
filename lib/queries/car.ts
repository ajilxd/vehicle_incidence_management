import { CarResponse } from "@/schemas/response/car";
import { apiClient } from "../api-client";

export const fetchCars: () => Promise<CarResponse> = async () => {
  return apiClient.get("/cars");
};
