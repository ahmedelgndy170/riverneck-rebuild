"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle } from "lucide-react";
import { useNotify } from "@/context/NotificationContext";
import { RequiredMark } from "@/components/RequiredLabel";

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FieldKey = keyof ContactFields;
type FieldErrors = Partial<Record<FieldKey, string>>;

const emptyFields: ContactFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function validateContactForm(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Your name is required.";
  }

  if (!fields.email.trim()) {
    errors.email = "Your email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (fields.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a valid phone number.";
  }

  return errors;
}

const inputBase =
  "w-full rounded-[10px] border bg-black/35 px-4 text-white outline-none transition placeholder:text-white/35 hover:border-white/20 focus:bg-black/50 focus:ring-2";

function fieldClass(hasError: boolean) {
  return `${inputBase} ${
    hasError
      ? "border-red-500/70 focus:ring-red-500/40"
      : "border-white/10 focus:ring-[#25b99a]/60"
  }`;
}

type ContactFormProps = {
  variant?: "gold" | "amber";
  className?: string;
};

export default function ContactForm({
  variant = "gold",
  className = "",
}: ContactFormProps) {
  const { toast } = useNotify();
  const [fields, setFields] = useState<ContactFields>(emptyFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const buttonClass =
    variant === "amber"
      ? "bg-[#d5965c] hover:bg-[#f2b35f] active:bg-[#f2b35f]"
      : "bg-[#f2b35f] hover:bg-[#ffbd70] active:bg-[#25b99a] active:text-white";

  function updateField(key: FieldKey, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key] || formError) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setFormError(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateContactForm(fields);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setFormError("Please fix the highlighted fields before sending.");
      return;
    }

    setFormError(null);
    setSubmitting(true);

    await new Promise((resolve) => window.setTimeout(resolve, 400));

    setSubmitting(false);
    setFields(emptyFields);
    setErrors({});
    toast(
      "Thanks for reaching out! We'll get back to you soon.",
      "success"
    );
  }

  return (
    <form
      className={`space-y-5 ${className}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {formError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-[12px] border border-red-500/40 bg-red-500/10 px-4 py-3"
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0 text-red-400"
            aria-hidden
          />
          <p className="text-[14px] font-semibold leading-snug text-red-200">
            {formError}
          </p>
        </div>
      )}

      <FormField
        id="contact-name"
        label="Your Name"
        required
        error={errors.name}
      >
        <input
          id="contact-name"
          name="name"
          type="text"
          value={fields.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="John Doe"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={`${fieldClass(Boolean(errors.name))} h-[50px] text-[14px] md:h-[52px] md:text-[15px]`}
        />
      </FormField>

      <FormField
        id="contact-email"
        label="Your Email"
        required
        error={errors.email}
      >
        <input
          id="contact-email"
          name="email"
          type="email"
          value={fields.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="john@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={`${fieldClass(Boolean(errors.email))} h-[50px] text-[14px] md:h-[52px] md:text-[15px]`}
        />
      </FormField>

      <FormField
        id="contact-phone"
        label="Phone Number"
        required
        error={errors.phone}
      >
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={fields.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="(555) 123-4567"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          className={`${fieldClass(Boolean(errors.phone))} h-[50px] text-[14px] md:h-[52px] md:text-[15px]`}
        />
      </FormField>

      <FormField
        id="contact-message"
        label="Your Message"
      >
        <textarea
          id="contact-message"
          name="message"
          value={fields.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="Tell us about your visit plans..."
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className={`${fieldClass(Boolean(errors.message))} min-h-[120px] resize-none p-4 text-[14px] md:min-h-[130px] md:text-[15px]`}
        />
      </FormField>

      <button
        type="submit"
        disabled={submitting}
        className={`h-[54px] w-full touch-manipulation rounded-[12px] text-[15px] font-black text-black transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:h-[58px] md:text-[16px] ${buttonClass}`}
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function FormField({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[14px] font-black md:text-[15px] md:mb-3 md:text-[16px]"
      >
        {label}
        {required && <RequiredMark />}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
