import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await prismadb.user.create({
      data: body,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
