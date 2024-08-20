import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const url = "https://api.geoapify.com/v1/geocode/autocomplete";
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const { text } = await req.json();

    const res = await fetch(`${url}?text=${text}&format=json&apiKey=${apiKey}`);
    const result = await res.json();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in POST /location:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
