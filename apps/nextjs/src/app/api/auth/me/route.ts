import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "~/utils/server";

// export const runtime = "edge";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
const setCorsHeaders = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
};

export const OPTIONS = () => {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
};

const handler = async () => {
  try {
    const user = await getAuthenticatedUser();
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch {
    return new NextResponse(null, {
      status: 500,
    });
  }
};

export { handler as GET };
