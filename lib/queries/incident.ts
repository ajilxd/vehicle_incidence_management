export const fetchIncidents = async (filters: IncidentFilters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  
  const endpoint = params.toString() ? `/incidents?${params}` : '/incidents';
  return apiClient.get(endpoint);
};