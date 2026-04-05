import { NextResponse } from "next/server";
import { HttpClientError, httpClient } from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";
import { BatchAttendanceResponse, SubmitAttendancePayload } from "@/types/teacher.types";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ batchId: string }> },
) {
  try {
    const p = await params;
    const body = (await request.json()) as SubmitAttendancePayload;
    const response = await httpClient.post<ApiResponse<unknown>>(
      `/teacher/batches/${p.batchId}/attendance`,
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
      { success: false, message: "Failed to submit attendance", status: 500 },
      { status: 500 },
    );
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ batchId: string }> },
) {
  try {
    const p = await params;
    const response = await httpClient.get<ApiResponse<BatchAttendanceResponse>>(
      `/teacher/batches/${p.batchId}/attendance`,
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
      { success: false, message: "Failed to fetch attendance", status: 500 },
      { status: 500 },
    );
  }
}
