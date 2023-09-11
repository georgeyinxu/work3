import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/lib/mongodb";
import Applicant from "@/models/applicant";

export async function POST(req: NextRequest) {
  await connectMongoDB();
  const { jobId, applicantAddress, transactionHash, fee, applicantId } =
    await req.json();

  try {
    await Applicant.create({
      post: new mongoose.Types.ObjectId(jobId),
      applicantAddress,
      transactionHash,
      fee,
      applicantId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding applicant to db due to " + error },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: "Successfully saved applicant information",
    },
    {
      status: 201,
    },
  );
}
