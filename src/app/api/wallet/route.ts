import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Wallet from "@/models/wallet";

export async function POST(req: NextRequest) {
  const { address } = await req.json();
  await connectMongoDB();

  try {
    await Wallet.findOneAndUpdate(
      {
        address,
      },
      { address, createdAt: new Date() },
      {
        upsert: true,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding wallet address to db" },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: `Successfully added wallet address: ${address} to the DB` },
    { status: 201 },
  );
}
