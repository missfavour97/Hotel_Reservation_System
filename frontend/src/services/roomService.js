const API_URL = "http://localhost:5230/api/rooms";

export async function getRooms() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }

  return response.json();
}