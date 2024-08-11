// import Tracking from "@/models/tracking.model";

// interface Params {
//   params: {
//     [key: string]: string | string[] | undefined;
//   };
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const result = await Tracking.create(body);

//     return Response.json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     return Response.json({
//       success: false,
//       error,
//     });
//   }
// }

// export async function GET(req: Request, { params }: Params) {
//   try {
//     const result = await Tracking.find({}, "", {
//       sort: "-_id",
//     });

//     return Response.json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     return Response.json({
//       success: false,
//       error,
//     });
//   }
// }

import { connectToMongoDB } from "@/lib/db";
import Tracking from "@/models/tracking.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Ensure DB connection
    await connectToMongoDB();

    // Parse the request body
    const body = await req.json();

    // Create a new tracking record
    const result = await Tracking.create(body);

    // Return success response
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in POST /tracking:", error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Ensure DB connection
    await connectToMongoDB();

    // Fetch tracking records, sorted by _id in descending order
    const result = await Tracking.find({}, "", {
      sort: "-_id",
    });

    // Return success response
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in GET /tracking:", error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
