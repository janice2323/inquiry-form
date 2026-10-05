"use client";

import { useState, useTransition } from "react";
import { deleteNote } from "../actions";

export function NoteDeleteButton({
  inquiryId,
  noteId,
}: {
  inquiryId: number;
  noteId: number;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (!confirm("이 메모를 삭제하시겠습니까?")) {
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await deleteNote(inquiryId, noteId);
      setError(result.error);
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="text-xs font-medium text-red-600 hover:underline disabled:opacity-60 dark:text-red-400"
      >
        {pending ? "삭제 중..." : "삭제"}
      </button>
      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
