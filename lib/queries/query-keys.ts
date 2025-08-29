import { IncidentFilters, CarFilters } from "@/types";

export const queryKeys = {
  incidents: {
    lists: () => ["incidents"],
    list: (filters: IncidentFilters) => [
      "incidents",
      "list",
      JSON.stringify(filters),
    ],
    detail: (id: string) => ["incidents", id],
    stats: () => ["incidents", "stats"],
  },
  users: {
    list: () => ["users"],
  },
  cars: {
    list: (filters: CarFilters) => ["cars", "list", JSON.stringify(filters)],
  },
};
