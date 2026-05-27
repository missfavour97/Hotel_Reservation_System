import hero1 from "../assets/hero/hero1.jpeg";
import hero2 from "../assets/hero/hero2.jpeg";
import hero3 from "../assets/hero/hero3.jpeg";

import standardMain from "../assets/rooms/standard/standard1.jpeg";
import standardBath from "../assets/rooms/standard/standard1_bath.jpeg";
import doubleMain from "../assets/rooms/doublebed/double_bed1.jpeg";
import doubleBath from "../assets/rooms/doublebed/double1_bath.jpeg";
import deluxeMain from "../assets/rooms/deluxe/deluxe2.jpg";
import deluxeBath from "../assets/rooms/deluxe/deluxe2_bath.jpeg";
import executiveMain from "../assets/rooms/executive/executive1.jpeg";
import executiveBath from "../assets/rooms/executive/executive1_bath.jpeg";
import presidentialMain from "../assets/rooms/presidential/presidential1.jpeg";
import presidentialBath from "../assets/rooms/presidential/presidential1_bath.jpeg";
import presidentialLiving from "../assets/rooms/presidential/presidential1_liv.jpeg";
import { API_ORIGIN } from "../services/apiClient";

export const heroImages = [hero1, hero2, hero3];

const roomVisuals = {
  "standard-room": {
    image: standardMain,
    images: [standardMain, standardBath],
  },
  "double-bed-room": {
    image: doubleMain,
    images: [doubleMain, doubleBath],
  },
  "deluxe-room": {
    image: deluxeMain,
    images: [deluxeMain, deluxeBath],
  },
  "executive-room": {
    image: executiveMain,
    images: [executiveMain, executiveBath],
  },
  "presidential-suite": {
    image: presidentialMain,
    images: [presidentialMain, presidentialBath, presidentialLiving],
  },
};

export function slugify(value = "") {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getRoomVisuals(room) {
  const uploadedImage = resolveUploadedImage(room?.imageUrl);

  if (uploadedImage) {
    return {
      image: uploadedImage,
      images: [uploadedImage],
    };
  }

  return roomVisuals[slugify(room?.title)] || roomVisuals["standard-room"];
}

function resolveUploadedImage(imageUrl = "") {
  if (!imageUrl || !imageUrl.trim()) {
    return "";
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return `${API_ORIGIN}${imageUrl}`;
  }

  return "";
}

export function parseAmenities(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
