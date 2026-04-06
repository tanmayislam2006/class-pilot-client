import { NextRequest, NextResponse } from "next/server";
import { studentService } from "@/service/student.service";

/**
 * GET /api/student/quizzes/submissions/[submissionId]
 * Proxy request to backend to fetch specific submission details.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  try {
    const { submissionId } = await params;
    const response = await studentService.getSubmissionDetails(submissionId);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Submission details fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch submission details",
      },
      { status: error.statusCode || 500 }
    );
  }
}
