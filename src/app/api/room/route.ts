import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Room from "@/models/room";
import { IRoom } from "@/interfaces/RoomResponse";

export async function POST(req: NextRequest) {
  const { listingId, deployer, worker } = await req.json();
  await connectMongoDB();
  let room;
  try {
    room = await Room.findOne({ listingId, deployer, worker });

    if (room) {
      console.log("room already exists", room);
      return NextResponse.json(
        { message: `Room already registered: ${room}` },
        { status: 201 }
      );
    }

    room = await Room.create({
      listingId,
      deployer,
      worker,
      createdAt: new Date(),
    });

    console.log("ROOM", room);
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding wallet address to db" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: `Successfully created: ${room}` },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const url = new URL(req.url);
  const sender = url.searchParams.get("sender");

  try {
    const worker = await Room.find({ worker: sender });
    // .populate({
    //   path: "listingId",
    //   model: "Listing",
    //   select: "title",
    // })
    // .exec();

    console.log("worker", worker);

    const deployer = await Room.find({ deployer: sender });
    // .populate({
    //   path: "listingId",
    //   model: "Listing",
    //   select: "title",
    // })
    // .exec();

    // console.log("deployer", deployer);

    return NextResponse.json(
      { data: [...worker, ...deployer] },
      // { data: [...worker] },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error getting wallet address due to: ", error },
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
