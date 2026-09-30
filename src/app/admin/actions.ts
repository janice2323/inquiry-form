"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import {
  parseInquiryForm,
  validateInquiry,
  type InquiryFormState,
} from "@/lib/inquiry";

export async function updateInquiry(
  id: number,
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const values = parseInquiryForm(formData);

  const errorMessage = validateInquiry(values);
  if (errorMessage) {
    return { status: "error", message: errorMessage, values };
  }

  try {
    await db.update(inquiries).set(values).where(eq(inquiries.id, id));
  } catch (err) {
    console.error("Failed to update inquiry", err);
    return {
      status: "error",
      message: "저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      values,
    };
  }

  revalidatePath("/admin", "layout");
  return { status: "success" };
}

export async function deleteInquiry(id: number): Promise<{ error: string }> {
  try {
    await db.delete(inquiries).where(eq(inquiries.id, id));
  } catch (err) {
    console.error("Failed to delete inquiry", err);
    return { error: "삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }

  revalidatePath("/admin", "layout");
  redirect("/admin");
}
