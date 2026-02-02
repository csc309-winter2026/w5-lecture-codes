import { NextResponse } from "next/server";
import { hashPassword } from "@/utils/auth";
import { prisma } from "@/prisma/db";

export async function POST(request) {
  const { username, email, name, password } = await request.json();

  // Validation

  const user = await prisma.user.create({
    data: { username, email, name, password: await hashPassword(password) },
    select: { username: true, email: true, name: true },
  });

  return NextResponse.json({ user });
}
