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
