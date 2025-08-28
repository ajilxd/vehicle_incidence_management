"use client";
import { IncidentFilters } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchIncidentDetail, fetchIncidents } from "../queries/incident";
import { queryKeys } from "./query-keys";
import { fetchUsers } from "./user";
import { fetchCars } from "./car";

export const useIncidents = (filters: IncidentFilters = {}) => {
  return useQuery({
    queryKey: queryKeys.incidents.list(filters),
    queryFn: () => fetchIncidents(filters),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};

export const useIncidentDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.incidents.detail(id),
    queryFn: () => fetchIncidentDetail(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: () => fetchUsers(),
    staleTime: 2 * 60 * 1000,
  });
};

export const useCars = () => {
  return useQuery({
    queryKey: queryKeys.cars.list(),
    queryFn: () => fetchCars(),
    staleTime: 2 * 60 * 1000,
  });
};
