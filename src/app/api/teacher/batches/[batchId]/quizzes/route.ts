import { NextRequest, NextResponse } from "next/server";
import { teacherService } from "@/service/teacher.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ batchId: string }> }
) {
  try {
    const { batchId } = await params;
    
    const response = await teacherService.getBatchQuizzes(batchId);

    return NextResponse.json(response);
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch batch quizzes";
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
