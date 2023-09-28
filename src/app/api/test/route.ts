import { handleUpload } from "@/utils/S3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const title: string | null = data.get("title") as unknown as string;
  const reward: string | null = data.get("reward") as unknown as string;
  const category: string | null = data.get("category") as unknown as string;
  const location: string | null = data.get("location") as unknown as string;
  const type: string | null = data.get("type") as unknown as string;
  const description: string | null = data.get("description") as unknown as string;
  const date: string | null = data.get("date") as unknown as string;

  console.log(title, reward, category, location, type, description, date);

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  handleUpload(buffer, file.name, "6513a03bb5ee36e981b84b87");

  return NextResponse.json({ success: true });
}
