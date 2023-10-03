import { ILocation } from "@/interfaces/LocationResponse";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let officialNames: string[] = [];
  try {
    const data = await axios.get("https://restcountries.com/v3.1/all");
    const countries = data.data as ILocation[];

    officialNames = countries.map(country => country.name.common).sort();
    officialNames.push("Remote");
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get all countries" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: officialNames }, { status: 200 });
}
