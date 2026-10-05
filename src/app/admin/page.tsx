import { desc } from "drizzle-orm";
import Link from "next/link";
import { connection } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { formatDate } from "./format";

export default async function AdminPage() {
  // The DB query isn't a fetch, so opt into request-time rendering explicitly.
  await connection();

  const rows = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt));

  return (
    <main className="flex flex-col gap-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        총 {rows.length}건
      </p>

      {rows.length === 0 ? (
        <p className="rounded-md border border-black/[.1] p-8 text-center text-sm text-zinc-600 dark:border-white/[.145] dark:text-zinc-400">
          접수된 문의가 없습니다.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-black/[.1] bg-white dark:border-white/[.145] dark:bg-black">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-black/[.1] text-zinc-600 dark:border-white/[.145] dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">접수일시</th>
                <th className="px-4 py-3 font-medium">이름</th>
                <th className="px-4 py-3 font-medium">전화번호</th>
                <th className="px-4 py-3 font-medium">이메일</th>
                <th className="px-4 py-3 font-medium">문의 내용</th>
              </tr>
            </thead>
            <tbody className="text-black dark:text-zinc-50">
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-black/[.05] last:border-0 hover:bg-zinc-50 dark:border-white/[.08] dark:hover:bg-zinc-900"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {formatDate(row.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Link
                      href={`/admin/${row.id}`}
                      className="font-medium hover:underline"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{row.phone}</td>
                  <td className="whitespace-nowrap px-4 py-3">{row.email}</td>
                  <td className="max-w-xs truncate px-4 py-3">
                    <Link href={`/admin/${row.id}`} className="hover:underline">
                      {row.message}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
