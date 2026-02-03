import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { generateToken, comparePassword } from "@/utils/auth";

export async function POST(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 },
    );
  }

  const token = generateToken({ userId: user.id, username: user.username });

  return NextResponse.json({ token });
}
