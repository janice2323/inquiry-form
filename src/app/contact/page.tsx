"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitInquiry, type SubmitState } from "./actions";

const initialState: SubmitState = { status: "idle" };

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initialState
  );
  // React resets the form after each action; refill it when saving failed.
  const values = state.status === "error" ? state.values : undefined;

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            문의 폼
          </h1>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-400"
          >
            홈으로
          </Link>
        </header>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              이름
            </label>
            <input
              id="name"
              name="name"
              defaultValue={values?.name}
              type="text"
              required
              className="rounded-md border border-black/[.1] bg-white px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              전화번호
            </label>
            <input
              id="phone"
              name="phone"
              defaultValue={values?.phone}
              type="tel"
              required
              placeholder="010-1234-5678"
              className="rounded-md border border-black/[.1] bg-white px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              defaultValue={values?.email}
              type="email"
              required
              className="rounded-md border border-black/[.1] bg-white px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              문의 내용
            </label>
            <textarea
              id="message"
              name="message"
              defaultValue={values?.message}
              rows={5}
              required
              className="resize-none rounded-md border border-black/[.1] bg-white px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 h-11 rounded-full bg-foreground font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
          >
            {pending ? "제출 중..." : "제출"}
          </button>
        </form>

        {state.status === "success" && (
          <p
            role="status"
            className="rounded-md border border-black/[.1] p-4 text-sm text-zinc-700 dark:border-white/[.145] dark:text-zinc-300"
          >
            문의가 접수되었습니다. 감사합니다.
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
      </main>
    </div>
  );
}
