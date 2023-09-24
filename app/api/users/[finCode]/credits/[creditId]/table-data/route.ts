import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const tableData = await prismadb.creditCalculator.create({
      data: body,
      include: {
        credit: {
          select: {
            tableData: true,
          },
        },
      },
    });

    return NextResponse.json(tableData);
  } catch (error) {
    console.log("[TABLEDATA_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
