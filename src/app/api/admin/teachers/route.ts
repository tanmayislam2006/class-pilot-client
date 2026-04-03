import { NextResponse } from "next/server";

import { HttpClientError } from "@/lib/httpClient";
import { adminService } from "@/service/admin.service";

export async function GET() {
  try {
    const response = await adminService.getAllTeachers();
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
        message: "Failed to load teachers",
        status: 500,
      },
      { status: 500 },
    );
  }
}
