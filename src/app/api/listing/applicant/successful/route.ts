import IApplicant from "@/interfaces/ApplicantResponse";
import connectMongoDB from "@/lib/mongodb";
import Applicant from "@/models/applicant";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const url = new URL(req.url);
  const listingId = url.searchParams.get("listingId");
  const workerAddress = url.searchParams.get("address");
  let applicant: IApplicant | {} = {};
  let selected = false;

  if (!listingId || !workerAddress) {
    console.error("Forgot to set params");
    return NextResponse.json(
      { message: "Please set the required params" },
      { status: 405 }
    );
  }

  try {
    const applicantResponse = await Applicant.findOne({
      post: new mongoose.Types.ObjectId(listingId),
      applicantAddress: workerAddress,
    });

    if (applicantResponse) {
        applicant = applicantResponse;
    }

    if (applicantResponse.selected) {
      selected = true;
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching all applicants to db due to " + error },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: selected, applicantDetails: applicant }, { status: 200 });
}
