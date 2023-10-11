import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/category";

export async function POST(req: NextRequest) {
  const { title, value, icon } = await req.json();
  await connectMongoDB();

  try {
    await Category.create({ title, value, icon });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating a category" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Successfully created a category" },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  await connectMongoDB();
  let data = [];

  try {
    data = await Category.find();
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all categories" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  await connectMongoDB();

  try {
    await Category.deleteMany();
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete all categories" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Successfully deleted all categories" },
    { status: 204 }
  );
}
