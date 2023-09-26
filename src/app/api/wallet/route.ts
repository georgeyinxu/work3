import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Wallet from "@/models/wallet";
import { IWallet } from "@/interfaces/WalletResponse";

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
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding wallet address to db" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: `Successfully added wallet address: ${address} to the DB` },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const url = new URL(req.url);
  const address = url.searchParams.get("address");
  let wallet: IWallet | null = null;

  try {
    wallet = await Wallet.findOne({
      address,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Error getting wallet address due to: ", error },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: wallet }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { address, telegram } = await req.json();
  await connectMongoDB();

  try {
    await Wallet.findOneAndUpdate(
      { address },
      {
        telegram,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error adding telegram handle to current account due to: ",
        error,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: `Successfully added wallet address: ${address} to the DB` },
    { status: 200 }
  );
}
