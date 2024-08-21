import { connectToMongoDB } from "@/lib/db";
import Tracking from "@/models/tracking.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    console.log(body);

    const result = await Tracking.create(body);
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in POST /tracking:", error);
    return NextResponse.json(
      {
        success: false,
        // error: "An unexpected error occurred",
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToMongoDB();
    const result = await Tracking.find({}, "", {
      sort: "-_id",
    });
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in GET /tracking:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
