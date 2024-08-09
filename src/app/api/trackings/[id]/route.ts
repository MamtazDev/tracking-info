import Tracking from "@/models/tracking.model";

interface Params {
  params: {
    [key: string]: string | string[] | undefined;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = params;
    const result = await Tracking.findById(id);

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

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = params;
    const body = await req.json();
    const result = await Tracking.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
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

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = params;
    const result = await Tracking.findByIdAndDelete(id);

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
