import { NextResponse } from "next/server";

import { HttpClientError } from "@/lib/httpClient";
import { adminService } from "@/service/admin.service";
import { UpdateAdminUserStatusPayload } from "@/types/admin.types";

export async function PATCH(
  request: Request,
  props: { params: Promise<{ userId: string }> }
) {
  try {
    const params = await props.params;
    const body = (await request.json()) as UpdateAdminUserStatusPayload;
    
    const response = await adminService.updateStatus(params.userId, body);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HttpClientError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          status: error.status,
        },
        { status: error.status },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user status",
        status: 500,
      },
      { status: 500 },
    );
  }
}
