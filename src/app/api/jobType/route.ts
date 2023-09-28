import JobType from "@/models/jobTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let jobTypes = [];
    try {
        jobTypes = await JobType.find();
    } catch (error) {
        return NextResponse.json({
            message: "Failed to get job types"
        }, {status: 400})
    }

    return NextResponse.json(
        { data: jobTypes },
        { status: 200 }
      );
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  let typeId = "";

  try {
    typeId = await JobType.create({ title });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create a new job type" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: typeId }, { status: 201 });
}
