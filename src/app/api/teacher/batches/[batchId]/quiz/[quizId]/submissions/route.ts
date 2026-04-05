import { NextRequest, NextResponse } from "next/server";
import { teacherService } from "@/service/teacher.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ batchId: string; quizId: string }> }
) {
  try {
    const { batchId, quizId } = await params;
    
    const response = await teacherService.getQuizSubmissions(batchId, quizId);

    return NextResponse.json(response);
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch quiz submissions";
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
// Force Turbopack reload
