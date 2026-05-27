import { apiRequest } from "./apiClient";

export async function getRooms() {
  return apiRequest("/rooms");
}

export async function getRoom(id) {
  return apiRequest(`/rooms/${id}`);
}

export async function createRoom(room) {
  return apiRequest("/rooms", {
    method: "POST",
    body: room,
  });
}

export async function updateRoom(id, room) {
  return apiRequest(`/rooms/${id}`, {
    method: "PUT",
    body: room,
  });
}

export async function deleteRoom(id) {
  return apiRequest(`/rooms/${id}`, {
    method: "DELETE",
  });
}

export async function uploadRoomImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  return apiRequest("/rooms/upload", {
    method: "POST",
    body: formData,
  });
}
