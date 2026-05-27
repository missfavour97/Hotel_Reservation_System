import { apiRequest } from "./apiClient";

export function loginUser(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: credentials,
  });
}

export function signupUser(userData) {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: userData,
  });
}

export function getUsers() {
  return apiRequest("/users");
}
