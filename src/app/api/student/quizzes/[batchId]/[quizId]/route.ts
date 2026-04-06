import { NextResponse } from "next/server";
import { HttpClientError } from "@/lib/httpClient";
import { studentService } from "@/service/student.service";

export async function GET(
  request: Request,
  { params }: { params: { batchId: string; quizId: string } }
) {
  try {
    const { batchId, quizId } = await params;
    const response = await studentService.getQuizDetails(batchId, quizId);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HttpClientError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          status: error.status,
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load quiz details",
        status: 500,
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { batchId: string; quizId: string } }
) {
  try {
    const { batchId, quizId } = await params;
    const body = await request.json();
    const response = await studentService.submitQuiz(batchId, quizId, body);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HttpClientError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          status: error.status,
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit quiz",
        status: 500,
      },
      { status: 500 }
    );
  }
}
