"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { inquiries, inquiryNotes } from "@/db/schema";
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

const NOTE_MAX_LENGTH = 2000;

export type NoteFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; body: string };

export async function addNote(
  inquiryId: number,
  _prevState: NoteFormState,
  formData: FormData
): Promise<NoteFormState> {
  const body = String(formData.get("body") ?? "").trim();

  if (body === "") {
    return { status: "error", message: "메모 내용을 입력해 주세요.", body };
  }
  if (body.length > NOTE_MAX_LENGTH) {
    return {
      status: "error",
      message: `메모는 ${NOTE_MAX_LENGTH}자 이하로 입력해 주세요.`,
      body,
    };
  }

  try {
    await db.insert(inquiryNotes).values({ inquiryId, body });
  } catch (err) {
    console.error("Failed to add note", err);
    return {
      status: "error",
      message: "메모 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      body,
    };
  }

  revalidatePath(`/admin/${inquiryId}`);
  return { status: "success" };
}

export async function deleteNote(
  inquiryId: number,
  noteId: number
): Promise<{ error: string | null }> {
  try {
    await db
      .delete(inquiryNotes)
      .where(
        and(eq(inquiryNotes.id, noteId), eq(inquiryNotes.inquiryId, inquiryId))
      );
  } catch (err) {
    console.error("Failed to delete note", err);
    return { error: "메모 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }

  revalidatePath(`/admin/${inquiryId}`);
  return { error: null };
}
