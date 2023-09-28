import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/lib/mongodb";
import Listing from "@/models/listing";
import JobStatus from "@/enums/JobStatus";
import { handleUpload } from "@/utils/S3";

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
      { status: 400 }
    );
  }

  return NextResponse.json({ listings }, { status: 200 });
}

export async function POST(req: NextRequest) {
  await connectMongoDB();
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  const from: string | null = data.get("from") as unknown as string;
  const to: string | null = data.get("to") as unknown as string;
  const title: string | null = data.get("title") as unknown as string;
  const description: string | null = data.get(
    "description"
  ) as unknown as string;
  const reward: string | null = data.get("reward") as unknown as string;
  const transactionHash: string | null = data.get(
    "transactionHash"
  ) as unknown as string;
  const jobId: string | null = data.get("jobId") as unknown as string;
  const jobType: string | null = data.get("jobType") as unknown as string;
  const date: string | null = data.get("date") as unknown as string;
  const categoryId: string | null = data.get("categoryId") as unknown as string;
  const location: string | null = data.get("location") as unknown as string;

  let listingId;

  // 1. Upload the listing to MongoDB with its details
  try {
    const createdListing = await Listing.create({
      from,
      to,
      title,
      description,
      reward: parseFloat(reward),
      date: new Date(date),
      category: new mongoose.Types.ObjectId(categoryId),
      transactionHash,
      jobId,
      jobType,
      location,
      jobStatus: JobStatus.ACTIVE,
      file: "",
    });

    listingId = createdListing._id;

    // Format the file
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to S3
      const fileLocation = await handleUpload(buffer, file.name, listingId);

      await Listing.findByIdAndUpdate(listingId, { file: fileLocation });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding listing to db due to " + error },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Successfully created listing", data: listingId },
    { status: 201 }
  );

  // TODO: Finish up the next 2 steps after getting the S3 Details from Fajri
  // 2. Do the file uploading to AWS S3
  // 3. Add the files uploaded to S3 with its file name and file path to MongoDB
}

export async function PUT(req: NextRequest) {
  await connectMongoDB();

  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  const title: string | null = data.get("title") as unknown as string;
  const description: string | null = data.get(
    "description"
  ) as unknown as string;
  const reward: string | null = data.get("reward") as unknown as string;
  const jobType: string | null = data.get("jobType") as unknown as string;
  const date: string | null = data.get("date") as unknown as string;
  const categoryId: string | null = data.get("categoryId") as unknown as string;
  const location: string | null = data.get("location") as unknown as string;
  const listingId: string | null = data.get("listingId") as unknown as string;

  try {
    await Listing.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(listingId),
      },
      {
        title,
        description,
        reward: parseFloat(reward),
        date: new Date(date),
        location,
        jobType,
        category: new mongoose.Types.ObjectId(categoryId),
      }
    );

    // Format the file
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to S3
      const fileLocation = await handleUpload(buffer, file.name, listingId);

      await Listing.findByIdAndUpdate(listingId, { file: fileLocation });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating listing in db due to " + error },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Successfully updated listing" },
    { status: 200 }
  );
}
