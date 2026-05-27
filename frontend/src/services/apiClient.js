export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5230/api";

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export async function apiRequest(path, options = {}) {
  const hasBody = options.body !== undefined && options.body !== null;
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(hasBody && !isFormData ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      body:
        hasBody && !isFormData && typeof options.body !== "string"
          ? JSON.stringify(options.body)
          : options.body,
    });
  } catch {
    throw new Error(
      `Cannot reach the backend API at ${API_BASE_URL}. Start the backend with: cd backend && dotnet run`
    );
  }

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    throw new Error(
      typeof data === "string" ? data : data?.message || "Request failed"
    );
  }

  return data;
}
