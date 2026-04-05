import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ batchId: string; quizId: string }> }
) {
  try {
    const { batchId, quizId } = await params;
    const body = await req.json();
    const isPublished = body?.quiz?.isPublished;

    const { quizService } = await import("@/service/quiz.service");
    
    if (typeof isPublished !== "boolean") {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    const response = await quizService.togglePublish(batchId, quizId, isPublished);
    return NextResponse.json(response);
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle publish status";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
