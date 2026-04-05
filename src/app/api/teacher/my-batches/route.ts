import { NextResponse } from "next/server";

import { HttpClientError } from "@/lib/httpClient";
import { teacherService } from "@/service/teacher.service";

export async function GET() {
  try {
    const response = await teacherService.getMyBatches();
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
        message: "Failed to load your batches",
        status: 500,
      },
      { status: 500 },
    );
  }
}
