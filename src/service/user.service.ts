"use server";

import { httpClient, HttpClientError } from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";
import { CreateStudentFormData, CreateTeacherFormData } from "@/zod/admin.validation";

export const createTeacherAction = async (formData: CreateTeacherFormData): Promise<ApiResponse<null>> => {
  try {
    const { password, ...teacher } = formData;
    const payload = {
      password,
      teacher
    };

    const response = await httpClient.post<ApiResponse<null>, typeof payload>(
      "/user/create-teacher",
      payload
    );
    return response;
  } catch (error) {
    if (error instanceof HttpClientError) {
      return {
        status: error.status,
        success: false,
        message: error.message,
      };
    }
    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred while creating the teacher account.",
    };
  }
};

export const createStudentAction = async (formData: CreateStudentFormData): Promise<ApiResponse<null>> => {
  try {
    const { password, ...student } = formData;
    const payload = {
      password,
      student
    };

    const response = await httpClient.post<ApiResponse<null>, typeof payload>(
      "/user/create-student",
      payload
    );
    return response;
  } catch (error) {
    if (error instanceof HttpClientError) {
      return {
        status: error.status,
        success: false,
        message: error.message,
      };
    }
    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred while creating the student account.",
    };
  }
};
