import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ThumbGrab" },
      {
        name: "description",
        content:
          "Get in touch with the ThumbGrab team. Feedback, bug reports, and partnership inquiries welcome.",
      },
      { property: "og:title", content: "Contact ThumbGrab" },
      { property: "og:description", content: "Get in touch with the ThumbGrab team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setStatus("error");
      return;
    }
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <SiteLayout>
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-3xl grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <h1 className="text-4xl font-extrabold mb-3">Contact us</h1>
            <p className="text-muted-foreground mb-6">
              Have feedback, a bug report, or a partnership idea? We'd love to hear from you.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue" />
                <a href="mailto:hello@thumbgrab.app" className="hover:underline">
                  hello@thumbgrab.app
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-red" />
                <span>We reply within 1–2 business days.</span>
              </div>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="bg-card border border-border rounded-xl p-6 shadow-card space-y-4"
          >
            <div>
              <label htmlFor="name" className="text-sm font-medium block mb-1.5">
                Name
              </label>
              <Input id="name" name="name" required maxLength={100} />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-1.5">
                Email
              </label>
              <Input id="email" name="email" type="email" required maxLength={255} />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium block mb-1.5">
                Message
              </label>
              <Textarea id="message" name="message" required rows={5} maxLength={2000} />
            </div>
            {status === "error" && error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            {status === "sent" && (
              <p className="text-sm text-brand-blue">Thanks! We received your message.</p>
            )}
            <Button
              type="submit"
              className="w-full bg-brand-red text-brand-red-foreground hover:bg-brand-red/90"
            >
              Send message
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
