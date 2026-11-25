"use client";

import { useActionState } from "react";
import { type ContactState, submitContact } from "./actions";

const inputClass =
  "mt-2 w-full border-b-2 border-ink/70 bg-transparent py-2 text-lg focus:border-plum focus:outline-none aria-[invalid=true]:border-plum";
const labelClass = "text-teal text-sm tracking-[0.25em] uppercase";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-plum">
      {errors.join(" ")}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, {
    status: "idle",
  } as ContactState);

  if (state.status === "success") {
    // The focused submit button disappears with the form, so focus moves here.
    // That keeps keyboard users in place and makes screen readers read the message.
    return (
      <p
        role="status"
        tabIndex={-1}
        ref={(message) => message?.focus()}
        className="text-xl"
      >
        Thank you! Your message is on its way, and I’ll get back to you soon.
      </p>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="max-w-xl space-y-8">
      {state.message && (
        <p role="alert" className="font-semibold text-plum">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
        <FieldError id="name-error" errors={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
        <FieldError id="email-error" errors={errors.email} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass}
        />
        <FieldError id="message-error" errors={errors.message} />
      </div>

      {/* Honeypot for bots: hidden from people and assistive technology. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-plum px-8 py-3 font-extrabold tracking-[0.12em] text-cream uppercase font-stretch-expanded transition-colors hover:bg-ink disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
