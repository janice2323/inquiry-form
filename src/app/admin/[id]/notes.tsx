import type { inquiryNotes } from "@/db/schema";
import { formatDate } from "../format";
import { NoteDeleteButton } from "./note-delete-button";
import { NoteForm } from "./note-form";

type Note = typeof inquiryNotes.$inferSelect;

export function Notes({
  inquiryId,
  notes,
}: {
  inquiryId: number;
  notes: Note[];
}) {
  return (
    <section className="flex flex-col gap-4 border-t border-black/[.1] pt-6 dark:border-white/[.145]">
      <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
        메모 <span className="text-zinc-500">{notes.length}</span>
      </h2>

      {notes.length === 0 ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          아직 메모가 없습니다.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex flex-col gap-2 rounded-md border border-black/[.1] bg-white p-3 dark:border-white/[.145] dark:bg-black"
            >
              <p className="whitespace-pre-wrap break-words text-sm text-black dark:text-zinc-50">
                {note.body}
              </p>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs text-zinc-500">
                  {formatDate(note.createdAt)}
                </span>
                <NoteDeleteButton inquiryId={inquiryId} noteId={note.id} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <NoteForm inquiryId={inquiryId} />
    </section>
  );
}
