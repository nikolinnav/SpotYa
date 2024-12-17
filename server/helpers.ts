import { Coordinates } from "./types/shared.ts";

export function sendRes(status: number, data: object): Response {
  let statusText: string;
  switch (status) {
    case 200:
      statusText = "OK";
      break;
    case 400:
      statusText = "Bad Request";
      break;
    case 401:
      statusText = "Unauthorized";
      break;
    case 404:
      statusText = "Not Found";
      break;
    case 409:
      statusText = "Conflict";
      break;
    case 500:
      statusText = "Internal Server Error";
      break;
    default:
      statusText = "Unknown";
  }
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const opt = { status, statusText, headers };
  try {
    return new Response(JSON.stringify(data), opt);
  } catch (e) {
    console.error(`${e}\n${String(data)}`);
    return new Response(
      JSON.stringify({
        error: "Internal server error, please try again later",
      }),
      { status: 500, statusText: "Internal Server Error,", headers }
    );
  }
}

export async function readJSONFile(path: string): Promise<any> {
  try {
    const _json = await Deno.readTextFile(path);
    return JSON.parse(_json);
  } catch (e) {
    console.error(`Error reading or parsing file ${path}:`, e);
    return null;
  }
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function haversine(hider: Coordinates, guesser: Coordinates): number {
  const { latitude: lat1, longitude: lon1 } = hider;
  const { latitude: lat2, longitude: lon2 } = guesser;
  const radius = 6371000; // Earth's radius in meters

  const latitude1 = toRadians(lat1!);
  const latitude2 = toRadians(lat2!);
  const deltaLatitude = toRadians(lat2! - lat1!);
  const deltaLongitude = toRadians(lon2! - lon1!);

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radius * c; // Distance in meters
}
