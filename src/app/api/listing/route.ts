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
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  let category = url.searchParams.get("category");
  let listings = [];
  let pageNum = 0;
  let limitNum = 0;
  let totalPages = 0;
  let filterOptions: any = {};
  if (page) {
    pageNum = parseInt(page, 10);
  } else {
    pageNum = 1;
  }

  if (limit) {
    limitNum = parseInt(limit, 10);
  } else {
    limitNum = 5;
  }

  if (category && category !== process.env.VIEW_ALL_ID) {
    filterOptions.category = new mongoose.Types.ObjectId(category);
  }

  const skip = (pageNum - 1) * limitNum;

  try {
    if (id) {
      listings = await Listing.findById(id);
    } else {
      listings = await Listing.find(filterOptions).skip(skip).limit(limitNum).exec();

      const totalCount = await Listing.countDocuments(filterOptions);
      totalPages = Math.ceil(totalCount / limitNum);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching listings from db due to " + error },
      { status: 400 }
    );
  }

  return NextResponse.json({ listings, totalPages }, { status: 200 });
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
  const date: string | null = data.get("date") as unknown as string;
  const categoryId: string | null = data.get("categoryId") as unknown as string;

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
  const date: string | null = data.get("date") as unknown as string;
  const categoryId: string | null = data.get("categoryId") as unknown as string;
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

export async function DELETE(req: NextRequest) {
  await connectMongoDB();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    if (id) {
      await Listing.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    } else {
      return NextResponse.json(
        { message: "Please pass in the correct params" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting listing due to " + error },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Successfully deleted listing" },
    { status: 200 }
  );
}
