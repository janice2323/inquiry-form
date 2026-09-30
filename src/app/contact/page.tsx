"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  function handleChange(field: keyof FormValues) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(values);
  }

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              type="text"
              required
              value={values.name}
              onChange={handleChange("name")}
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
              type="tel"
              required
              placeholder="010-1234-5678"
              value={values.phone}
              onChange={handleChange("phone")}
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
              type="email"
              required
              value={values.email}
              onChange={handleChange("email")}
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
              rows={5}
              required
              value={values.message}
              onChange={handleChange("message")}
              className="resize-none rounded-md border border-black/[.1] bg-white px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50"
            />
          </div>

          <button
            type="submit"
            className="mt-2 h-11 rounded-full bg-foreground font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            제출
          </button>
        </form>

        {submitted && (
          <section className="flex flex-col gap-2 rounded-md border border-black/[.1] p-4 dark:border-white/[.145]">
            <h2 className="text-base font-semibold text-black dark:text-zinc-50">
              입력하신 내용
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">이름:</span> {submitted.name}
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">전화번호:</span> {submitted.phone}
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">이메일:</span> {submitted.email}
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">문의 내용:</span>{" "}
              {submitted.message}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
