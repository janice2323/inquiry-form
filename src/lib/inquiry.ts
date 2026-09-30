export type InquiryValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export type InquiryFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; values: InquiryValues };

export function parseInquiryForm(formData: FormData): InquiryValues {
  return {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,32}$/;
const MESSAGE_MAX_LENGTH = 5000;

// Server-side checks mirror the column limits in src/db/schema.ts.
export function validateInquiry(values: InquiryValues): string | null {
  if (Object.values(values).some((v) => v === "")) {
    return "모든 항목을 입력해 주세요.";
  }
  if (values.name.length > 100) {
    return "이름은 100자 이하로 입력해 주세요.";
  }
  if (!PHONE_PATTERN.test(values.phone)) {
    return "전화번호 형식이 올바르지 않습니다.";
  }
  if (values.email.length > 256 || !EMAIL_PATTERN.test(values.email)) {
    return "이메일 형식이 올바르지 않습니다.";
  }
  if (values.message.length > MESSAGE_MAX_LENGTH) {
    return `문의 내용은 ${MESSAGE_MAX_LENGTH}자 이하로 입력해 주세요.`;
  }
  return null;
}
