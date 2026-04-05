import { NextResponse } from "next/server";
import { HttpClientError, httpClient } from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";

interface GenerateFeesBody {
  month: string;
  year: number;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ batchId: string }> },
) {
  try {
    const p = await params;
    const body = (await request.json()) as GenerateFeesBody;
    const response = await httpClient.post<ApiResponse<unknown>>(
      `/teacher/batches/${p.batchId}/generate-fees`,
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
      { success: false, message: "Failed to generate fees", status: 500 },
      { status: 500 },
    );
  }
}
