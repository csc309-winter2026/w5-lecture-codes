import { prisma } from "@/prisma/db";
import { hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, name, email, password } = await request.json();

  // Do validations

  const user = await prisma.user.create({
    data: {
      username,
      name,
      email,
      password: await hashPassword(password),
    },
    select: {
      username: true,
      name: true,
      email: true,
    },
  });

  return NextResponse.json(user);
}
