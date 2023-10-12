import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Message from "@/models/message";
import { IRoom } from "@/interfaces/RoomResponse";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const { roomId, message, sender, timestamp } = await req.json();
  await connectMongoDB();
  let _message;
  try {
    _message = await Message.findOne({ roomId, message, sender, timestamp });

    if (_message) {
      console.log("message already saved", _message);
      return NextResponse.json(
        { message: `Room already registered: ${_message}` },
        { status: 201 }
      );
    }

    _message = await Message.create({
      roomId,
      message,
      sender,
      timestamp,
    });

    console.log("ROOM", _message);
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving message to db" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: `Successfully created: ${_message}` },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const url = new URL(req.url);
  const roomId = url.searchParams.get("roomId");

  try {
    const messages = await Message.find({
      roomId,
    });
    console.log("messages", messages);

    return NextResponse.json({ data: messages }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error getting messages due to: ", error },
      { status: 400 }
    );
  }
}

// export async function PUT(req: NextRequest) {
//   const { address, telegram } = await req.json();
//   await connectMongoDB();

//   try {
//     await Wallet.findOneAndUpdate(
//       { address },
//       {
//         telegram,
//       },
//       {
//         upsert: true,
//       }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Error adding telegram handle to current account due to: ",
//         error,
//       },
//       { status: 400 }
//     );
//   }

//   return NextResponse.json(
//     { message: `Successfully added wallet address: ${address} to the DB` },
//     { status: 200 }
//   );
// }
