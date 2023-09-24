import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { finCode: string } }
) {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        finCode: params.finCode,
      },
      include: {
        credits: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
