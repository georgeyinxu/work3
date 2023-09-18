import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/lib/mongodb";
import Applicant from "@/models/applicant";
import IApplicant from "@/interfaces/ApplicantResponse";

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
      selected: false,
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

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const url = new URL(req.url);
  const listingId = url.searchParams.get("listingId");
  let applicants: IApplicant[] = [];

  if (!listingId) {
    return NextResponse.json(
      { message: "Please add query param listingId" },
      { status: 404 },
    );
  }

  try {
    applicants = await Applicant.find({
      post: new mongoose.Types.ObjectId(listingId as string),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching all applicants to db due to " + error },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      data: applicants,
    },
    {
      status: 200,
    },
  );
}
