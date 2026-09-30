import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { formatDate } from "../format";
import { DeleteButton } from "./delete-button";
import { EditForm } from "./edit-form";

export default async function InquiryDetailPage({
  params,
}: PageProps<"/admin/[id]">) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  const [inquiry] = await db
    .select()
    .from(inquiries)
    .where(eq(inquiries.id, id))
    .limit(1);
  if (!inquiry) {
    notFound();
  }

  return (
    <main className="flex w-full max-w-md flex-col gap-6">
      <Link
        href="/admin"
        className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-400"
      >
        ← 목록으로
      </Link>

      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
          문의 #{inquiry.id}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          접수일시 {formatDate(inquiry.createdAt)}
        </p>
      </div>

      <EditForm
        id={inquiry.id}
        initialValues={{
          name: inquiry.name,
          phone: inquiry.phone,
          email: inquiry.email,
          message: inquiry.message,
        }}
      />

      <DeleteButton id={inquiry.id} />
    </main>
  );
}
