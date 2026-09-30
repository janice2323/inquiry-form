"use client";

import { useState, useTransition } from "react";
import { deleteInquiry } from "../actions";

export function DeleteButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (!confirm("이 문의를 삭제하시겠습니까? 되돌릴 수 없습니다.")) {
      return;
    }
    setError(null);
    startTransition(async () => {
      // Redirects to the list on success, so only a failure returns here.
      const result = await deleteInquiry(id);
      setError(result.error);
    });
  }

  return (
    <div className="flex flex-col gap-2 border-t border-black/[.1] pt-6 dark:border-white/[.145]">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="h-11 rounded-full border border-red-500/60 font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-950"
      >
        {pending ? "삭제 중..." : "삭제"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
