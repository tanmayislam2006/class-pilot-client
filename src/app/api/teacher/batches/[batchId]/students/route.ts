import { NextResponse } from "next/server";

import { HttpClientError } from "@/lib/httpClient";
import { teacherService } from "@/service/teacher.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ batchId: string }> }
) {
  try {
    const p = await params;
    const response = await teacherService.getBatchStudents(p.batchId);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HttpClientError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          status: error.status,
        },
        { status: error.status },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load batch students",
        status: 500,
      },
      { status: 500 },
    );
  }
}
