"use server";

import { after } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import {
  parseInquiryForm,
  validateInquiry,
  type InquiryFormState,
} from "@/lib/inquiry";
import { sendInquiryNotification } from "@/lib/notify";

export type SubmitState = InquiryFormState;

export async function submitInquiry(
  _prevState: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const values = parseInquiryForm(formData);

  const errorMessage = validateInquiry(values);
  if (errorMessage) {
    return { status: "error", message: errorMessage, values };
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

  // Send the email after responding so a slow or failed send never blocks
  // or fails the submission.
  after(() => sendInquiryNotification(values));

  return { status: "success" };
}
