import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const auth = request.headers.get("Authorization");

  if (!auth || auth.startsWith("Bearer ") === false) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const authPayload = verifyToken(auth.split(" ")[1]);

  if (!authPayload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message:
      "Hi there! You are authenticated. Your username is " +
      authPayload.username,
  });
}
