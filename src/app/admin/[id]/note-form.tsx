"use client";

import { useActionState } from "react";
import { addNote, type NoteFormState } from "../actions";

const initialState: NoteFormState = { status: "idle" };

export function NoteForm({ inquiryId }: { inquiryId: number }) {
  const [state, formAction, pending] = useActionState(
    addNote.bind(null, inquiryId),
    initialState
  );
  // React resets the form after each action; keep the draft on failure.
  const body = state.status === "error" ? state.body : "";

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <label htmlFor="note-body" className="sr-only">
        새 메모
      </label>
      <textarea
        id="note-body"
        name="body"
        defaultValue={body}
        rows={3}
        required
        placeholder="메모를 입력하세요"
        className="resize-y rounded-md border border-black/[.1] bg-white px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50"
      />
      <button
        type="submit"
        disabled={pending}
        className="h-10 self-end rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? "추가 중..." : "메모 추가"}
      </button>
      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}
    </form>
  );
}
