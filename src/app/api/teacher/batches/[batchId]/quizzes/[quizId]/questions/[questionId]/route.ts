import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ batchId: string; quizId: string; questionId: string }> }
) {
  try {
    const { batchId, quizId, questionId } = await params;
    const { quizService } = await import("@/service/quiz.service");
    
    const response = await quizService.deleteQuizQuestion(batchId, quizId, questionId);
    return NextResponse.json(response);
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete question";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ batchId: string; quizId: string; questionId: string }> }
) {
  try {
    const { batchId, quizId, questionId } = await params;
    const body = await req.json();
    const { quizService } = await import("@/service/quiz.service");
    
    const response = await quizService.updateQuizQuestion(batchId, quizId, questionId, body);
    return NextResponse.json(response);
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : "Failed to update question";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
