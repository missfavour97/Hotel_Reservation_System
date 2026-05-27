import { apiRequest } from "./apiClient";

export function createBooking(booking) {
  return apiRequest("/bookings", {
    method: "POST",
    body: booking,
  });
}

export function getBookings() {
  return apiRequest("/bookings");
}

export function getUserBookings(userId) {
  return apiRequest(`/bookings/user/${userId}`);
}

export function updateBookingStatus(id, status) {
  return apiRequest(`/bookings/${id}/status`, {
    method: "PUT",
    body: { status },
  });
}

export function cancelBooking(id) {
  return apiRequest(`/bookings/${id}`, {
    method: "DELETE",
  });
}
