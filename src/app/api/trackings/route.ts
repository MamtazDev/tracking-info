import Tracking from "@/models/tracking.model";

interface Params {
  params: {
    [key: string]: string | string[] | undefined;
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await Tracking.create(body);

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error,
    });
  }
}

export async function GET(req: Request, { params }: Params) {
  try {
    const result = await Tracking.find({}, "", {
      sort: "-_id",
    });

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error,
    });
  }
}
