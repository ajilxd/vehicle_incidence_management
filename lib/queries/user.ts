import { UserResponse } from "@/schemas/response/user";
import { apiClient } from "../api-client";

export const fetchUsers: () => Promise<UserResponse> = async () => {
  return apiClient.get("/users");
};
