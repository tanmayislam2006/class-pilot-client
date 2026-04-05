import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ batchId: string; quizId: string }> }
) {
  try {
    const { batchId, quizId } = await params;
    const { quizService } = await import("@/service/quiz.service");
    
    const response = await quizService.deleteQuiz(batchId, quizId);
    return NextResponse.json(response);
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete quiz";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
