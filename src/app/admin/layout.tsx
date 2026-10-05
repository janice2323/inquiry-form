import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의 관리",
  // No authentication yet, so at least keep the admin pages out of search.
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="flex items-center justify-between">
          <Link
            href="/admin"
            className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50"
          >
            문의 관리
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-400"
          >
            홈으로
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}
