import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { apiClient } from "@/lib/api-client";
export const useCreateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) =>
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

export const useUpdateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: object }) => {
      return apiClient.patch(`/incidents/${id}`, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.incidents.lists() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.incidents.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.incidents.stats() });
    },
  });
};
export const useAddIncidentComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      comment,
      userId,
    }: {
      id: string;
      comment: string;
      userId: number;
    }) =>
      apiClient.post(`/incidents/${id}/updates`, {
        comment,
        updateType: "COMMENT",
        userId,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.incidents.detail(variables.id),
      });
    },
  });
};
