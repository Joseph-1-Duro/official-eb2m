"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { contactFormSchema, type ContactFormData } from "@/schemas/contact.schema";

const CONTACT_EMAIL = "info@ekoboys2men.com";

type ContactField = {
  key: keyof ContactFormData;
  label: string;
  type: "text" | "email" | "tel";
  placeholder: string;
};

const FIELDS: ContactField[] = [
  { key: "firstName", label: "First name", type: "text", placeholder: "First name" },
  { key: "lastName", label: "Last name", type: "text", placeholder: "Last name" },
  { key: "email", label: "Email", type: "email", placeholder: "Email" },
  { key: "phone", label: "Phone number", type: "tel", placeholder: "Phone number" },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    const subject = `Website contact from ${data.firstName} ${data.lastName}`;
    const body = [
      `First name: ${data.firstName}`,
      `Last name: ${data.lastName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      "",
      "Message:",
      data.message,
    ].join("\n");

    // Opens mailto in a new tab so the user stays on the page
    window.open(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank",
    );

    setSubmitted(true);
    reset();
  };

  return (
    <section className="contact-form">
      <div className="contact-form__inner">
        <form className="contact-form__form" onSubmit={handleSubmit(onSubmit)}>
          {FIELDS.map((field) => (
            <div key={field.key} className="contact-form__field contact-form__field--half">
              <label className="contact-form__label" htmlFor={field.key}>
                {field.label}
              </label>
              <input
                id={field.key}
                className="contact-form__input"
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.key)}
              />
              {errors[field.key]?.message && (
                <p className="contact-form__error">{errors[field.key]?.message}</p>
              )}
            </div>
          ))}

          <div className="contact-form__field contact-form__field--full">
            <label className="contact-form__label" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="contact-form__textarea"
              rows={17}
              placeholder="Tell us how we can help…"
              {...register("message")}
            />
            {errors.message?.message && (
              <p className="contact-form__error">{errors.message?.message}</p>
            )}
          </div>

          <button type="submit" className="button button--primary contact-form__submit">
            {submitted ? "Sent" : "Send Message"}
            <Send size={20} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}