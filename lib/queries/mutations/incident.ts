import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
export const useCreateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) =>
      apiClient.post("/incidents", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.incidents.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.incidents.stats() });
    },
    onError: (error) => {
      console.error("Error creating incident:", error);
    },
  });
};
