import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/lib/mongodb";
import Applicant from "@/models/applicant";
import IApplicant from "@/interfaces/ApplicantResponse";

// Check if user has applied to listing
export async function GET(req: NextRequest) {
  await connectMongoDB();
  const url = new URL(req.url);
  const postId = url.searchParams.get("postId");
  const address = url.searchParams.get("address");
  let data: IApplicant | null = null;
  let responseBody = { data: false };

  try {
    data = await Applicant.findOne({
      applicantAddress: address,
      post: new mongoose.Types.ObjectId(postId as string),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Error trying to find if user has applied for listing from db due to " +
          error,
      },
      { status: 400 },
    );
  }

  if (data) {
    responseBody = { data: true };
  }

  return NextResponse.json(responseBody, { status: 200 });
}
