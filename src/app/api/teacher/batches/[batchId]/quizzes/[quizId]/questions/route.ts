import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ batchId: string; quizId: string }> }
) {
  try {
    const { batchId, quizId } = await params;
    const body = await req.json();
    const { quizService } = await import("@/service/quiz.service");
    
    const response = await quizService.addQuizQuestion(batchId, quizId, body);
    return NextResponse.json(response);
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : "Failed to add question";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
