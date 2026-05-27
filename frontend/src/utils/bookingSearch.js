const BOOKING_QUERY_KEYS = ["checkInDate", "checkOutDate", "guests"];

export function buildBookingSearch(values = {}) {
  const params = new URLSearchParams();

  BOOKING_QUERY_KEYS.forEach((key) => {
    const value = values[key];

    if (value !== undefined && value !== null && `${value}`.trim() !== "") {
      params.set(key, value);
    }
  });

  const search = params.toString();
  return search ? `?${search}` : "";
}

export function getBookingDefaults(searchParams) {
  const guests = Number(searchParams.get("guests"));

  return {
    checkInDate: searchParams.get("checkInDate") || "",
    checkOutDate: searchParams.get("checkOutDate") || "",
    guests: Number.isFinite(guests) && guests > 0 ? guests : 1,
  };
}

export function buildBookingSearchFromParams(searchParams) {
  return buildBookingSearch({
    checkInDate: searchParams.get("checkInDate") || "",
    checkOutDate: searchParams.get("checkOutDate") || "",
    guests: searchParams.get("guests") || "",
  });
}
