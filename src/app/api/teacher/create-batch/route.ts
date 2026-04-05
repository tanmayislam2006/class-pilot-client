import { NextResponse } from "next/server";
import { HttpClientError, httpClient } from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";
import { TeacherAssignedBatch } from "@/types/teacher.types";

interface CreateBatchBody {
  batch: {
    teacherId: string;
    name: string;
    monthlyFee: number;
    description: string;
    schedule: string;
    startDate: string;
    endDate: string;
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateBatchBody;
    const response = await httpClient.post<ApiResponse<TeacherAssignedBatch>>(
      "/teacher/create-batch",
      body,
    );
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HttpClientError) {
      return NextResponse.json(
        { success: false, message: error.message, status: error.status },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create batch", status: 500 },
      { status: 500 },
    );
  }
}
