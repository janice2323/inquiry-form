"use client";

import { useActionState } from "react";
import type { InquiryFormState, InquiryValues } from "@/lib/inquiry";
import { updateInquiry } from "../actions";

const initialState: InquiryFormState = { status: "idle" };

const inputClassName =
  "rounded-md border border-black/[.1] bg-white px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50";
const labelClassName = "text-sm font-medium text-black dark:text-zinc-50";

export function EditForm({
  id,
  initialValues,
}: {
  id: number;
  initialValues: InquiryValues;
}) {
  const [state, formAction, pending] = useActionState(
    updateInquiry.bind(null, id),
    initialState
  );
  // React resets the form after each action; refill it with what was
  // submitted on failure, or the saved values otherwise.
  const values = state.status === "error" ? state.values : initialValues;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={labelClassName}>
          이름
        </label>
        <input
          id="name"
          name="name"
          defaultValue={values.name}
          type="text"
          required
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className={labelClassName}>
          전화번호
        </label>
        <input
          id="phone"
          name="phone"
          defaultValue={values.phone}
          type="tel"
          required
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelClassName}>
          이메일
        </label>
        <input
          id="email"
          name="email"
          defaultValue={values.email}
          type="email"
          required
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={labelClassName}>
          문의 내용
        </label>
        <textarea
          id="message"
          name="message"
          defaultValue={values.message}
          rows={8}
          required
          className={`resize-y ${inputClassName}`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-11 rounded-full bg-foreground font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? "저장 중..." : "저장"}
      </button>

      {state.status === "success" && (
        <p
          role="status"
          className="rounded-md border border-black/[.1] p-4 text-sm text-zinc-700 dark:border-white/[.145] dark:text-zinc-300"
        >
          저장되었습니다.
        </p>
      )}
      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-md border border-red-500/40 p-4 text-sm text-red-600 dark:text-red-400"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
