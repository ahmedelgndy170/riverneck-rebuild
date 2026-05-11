import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const waiver = await prisma.waiver.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        date: body.date,
        license: body.license,
        vehicle: body.vehicle,
        minors: body.minors,
        signature: body.signature,
      },
    });

    return NextResponse.json(waiver);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}