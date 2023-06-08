import { NextResponse } from "next/server";

// export const runtime = "edge";

export default async function POST(req: Request) {
  const body = req.json();

  return NextResponse.json({ body });
}
