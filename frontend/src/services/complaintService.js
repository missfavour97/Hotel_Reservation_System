import { apiRequest } from "./apiClient";

export function createComplaintRequest(request) {
  return apiRequest("/complaintrequests", {
    method: "POST",
    body: request,
  });
}

export function getComplaintRequests() {
  return apiRequest("/complaintrequests");
}

export function getUserComplaintRequests(userId) {
  return apiRequest(`/complaintrequests/user/${userId}`);
}

export function updateComplaintStatus(id, status) {
  return apiRequest(`/complaintrequests/${id}/status`, {
    method: "PUT",
    body: { status },
  });
}
