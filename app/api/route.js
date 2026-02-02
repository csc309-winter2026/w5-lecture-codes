import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function GET(request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const authPayload = verifyToken(authHeader.split(" ")[1]);

  if (!authPayload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message: `Hello, ${authPayload.username}! You are authenticated.`,
  });
}
