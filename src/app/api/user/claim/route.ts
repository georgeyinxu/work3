import connectMongoDB from "@/lib/mongodb";
import Applicant from "@/models/applicant";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await connectMongoDB();
  const { applicantId, listingId } = await req.json();

  try {
    await Applicant.findOneAndUpdate(
      {
        applicantId,
        post: new mongoose.Types.ObjectId(listingId),
      },
      { claimed: true }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating applicant claim due to" + error },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "Successfully claimed from reward",
    },
    {
      status: 200,
    }
  );
}

export async function GET(req: NextRequest) {
  await connectMongoDB();
  let claimed = false;

  const url = new URL(req.url);
  const id = url.searchParams.get("applicantId");
  
  try {
    const applicant = await Applicant.findOne({
      applicantId: id,
      claimed: true,
    })

    if (applicant) {
      claimed = true;
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error checking if wallet has claimed" + error },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { data: claimed },
    { status: 200 }
  );
}
