import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-6 px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Inquiry Form 프로젝트
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          안녕하세요! 이 사이트는 문의 폼 데모 프로젝트입니다.
        </p>
        <Link
          href="/contact"
          className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          문의 폼으로 이동
        </Link>
      </main>
    </div>
  );
}
