import "server-only";

import { Resend } from "resend";

type Inquiry = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

// Resend's shared sender only delivers to the Resend account owner; set
// INQUIRY_NOTIFY_FROM to an address on a verified domain for other recipients.
const DEFAULT_FROM = "문의 알림 <onboarding@resend.dev>";

// Never throws: the inquiry is already saved, so a failed notification is
// only logged.
export async function sendInquiryNotification(inquiry: Inquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.INQUIRY_NOTIFY_TO ?? "")
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);

  if (!apiKey || to.length === 0) {
    console.warn(
      "Skipping inquiry email: RESEND_API_KEY or INQUIRY_NOTIFY_TO is not set"
    );
    return;
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.INQUIRY_NOTIFY_FROM || DEFAULT_FROM,
      to,
      replyTo: inquiry.email,
      subject: `[문의] ${inquiry.name}님의 새 문의`,
      text: [
        `이름: ${inquiry.name}`,
        `전화번호: ${inquiry.phone}`,
        `이메일: ${inquiry.email}`,
        "",
        "문의 내용:",
        inquiry.message,
      ].join("\n"),
      html: renderHtml(inquiry),
    });
    if (error) {
      console.error("Failed to send inquiry email", error);
    }
  } catch (err) {
    console.error("Failed to send inquiry email", err);
  }
}

function renderHtml(inquiry: Inquiry): string {
  const row = (label: string, value: string) =>
    `<tr><th align="left" style="padding:4px 12px 4px 0;color:#555">${label}</th><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`;

  return `<div style="font-family:sans-serif;font-size:14px;line-height:1.6">
<h2 style="margin:0 0 12px">새 문의가 접수되었습니다</h2>
<table style="border-collapse:collapse">
${row("이름", inquiry.name)}
${row("전화번호", inquiry.phone)}
${row("이메일", inquiry.email)}
</table>
<h3 style="margin:16px 0 8px">문의 내용</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(inquiry.message)}</p>
</div>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
