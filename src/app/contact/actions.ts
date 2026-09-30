"use server";

import { db } from "@/db";
import { inquiries } from "@/db/schema";

export type SubmitState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; values: InquiryValues };

type InquiryValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export async function submitInquiry(
  _prevState: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const values: InquiryValues = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (Object.values(values).some((v) => v === "")) {
    return { status: "error", message: "모든 항목을 입력해 주세요.", values };
  }

  try {
    await db.insert(inquiries).values(values);
  } catch (err) {
    console.error("Failed to save inquiry", err);
    return {
      status: "error",
      message: "저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      values,
    };
  }

  return { status: "success" };
}
