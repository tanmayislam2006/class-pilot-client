import { NextResponse } from "next/server";
import { HttpClientError } from "@/lib/httpClient";
import { teacherService } from "@/service/teacher.service";
import { CreateStudentPayload } from "@/types/teacher.types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateStudentPayload;
    const response = await teacherService.createStudent(body);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HttpClientError) {
      return NextResponse.json(
        { 
          success: false, 
          message: error.message || "Failed to create student", 
          status: error.status || 400 
        },
        { status: error.status || 400 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error", status: 500 },
      { status: 500 },
    );
  }
}
