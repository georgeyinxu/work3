import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/lib/mongodb";
import Listing from "@/models/listing";
import File from "@/models/listing";

export async function POST(req: NextRequest) {
  await connectMongoDB();
  const {
    from,
    to,
    title,
    description,
    reward,
    transactionHash,
    jobId,
    date,
    categoryId,
  } = await req.json();

  // 1. Upload the listing to MongoDB with its details
  try {
    await Listing.create({
      from,
      to,
      title,
      description,
      reward,
      date,
      category: new mongoose.Types.ObjectId(categoryId),
      transactionHash,
      jobId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding listing to db due to " + error },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Successfully created listing" },
    { status: 201 },
  );

  // TODO: Finish up the next 2 steps after getting the S3 Details from Fajri
  // 2. Do the file uploading to AWS S3
  // 3. Add the files uploaded to S3 with its file name and file path to MongoDB
}

export async function GET(req: NextRequest) {
  await connectMongoDB();
}
