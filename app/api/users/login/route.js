import { comparePassword, generateToken } from "@/utils/auth";

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function POST(request) {
  const { username, password } = await request.json();

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
