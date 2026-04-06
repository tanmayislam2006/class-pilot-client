import { NextResponse } from "next/server";
import { HttpClientError } from "@/lib/httpClient";
import { studentService } from "@/service/student.service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ feeId: string }> }
) {
  const { feeId } =await params;

  try {
    const response = await studentService.payFee(feeId);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HttpClientError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          status: error.status,
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create payment session",
        status: 500,
      },
      { status: 500 }
    );
  }
}
