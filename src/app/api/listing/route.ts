import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/lib/mongodb";
import Listing from "@/models/listing";
import JobStatus from "@/enums/JobStatus";

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
  let listingId;

  // 1. Upload the listing to MongoDB with its details
  try {
    const createdListing = await Listing.create({
      from,
      to,
      title,
      description,
      reward,
      date,
      category: new mongoose.Types.ObjectId(categoryId),
      transactionHash,
      jobId,
      jobStatus: JobStatus.ACTIVE
    });

    listingId = createdListing._id;
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding listing to db due to " + error },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Successfully created listing", data: listingId },
    { status: 201 },
  );

  // TODO: Finish up the next 2 steps after getting the S3 Details from Fajri
  // 2. Do the file uploading to AWS S3
  // 3. Add the files uploaded to S3 with its file name and file path to MongoDB
}

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  let listings = [];

  try {
    if (id) {
      listings = await Listing.findById(id);
    } else {
      listings = await Listing.find();
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching listings from db due to " + error },
      { status: 400 },
    );
  }

  return NextResponse.json({ listings }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  await connectMongoDB();

  const { title, description, reward, date, categoryId, listingId } =
    await req.json();

  try {
    await Listing.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(listingId),
      },
      {
        title,
        description,
        reward,
        date,
        category: new mongoose.Types.ObjectId(categoryId),
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating listing in db due to " + error },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Successfully updated listing" },
    { status: 200 },
  );
}
