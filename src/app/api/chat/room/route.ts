import connectMongoDB from "@/lib/mongodb";
import Room from "@/models/room";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { deployer, worker, listingId } = await req.json();
  await connectMongoDB();
  let roomId = "";

  try {
    const roomDoc = await Room.findOneAndUpdate(
      {
        deployer,
        worker,
        listingId: new mongoose.Types.ObjectId(listingId),
      },
      {
        deployer,
        worker,
        listingId: new mongoose.Types.ObjectId(listingId),
      },
      {
        upsert: true,
        new: true,
      }
    );
    console.log(roomDoc);
    roomId = roomDoc._id;
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating new room" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: roomId }, { status: 201 });
}
