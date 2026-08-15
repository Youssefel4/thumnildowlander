import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — ThumbGrab" },
      {
        name: "description",
        content: "The terms governing use of the ThumbGrab YouTube thumbnail downloader.",
      },
      { property: "og:title", content: "Terms of Use — ThumbGrab" },
      { property: "og:description", content: "Terms governing use of ThumbGrab." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold mb-2">Terms of Use</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: May 31, 2026</p>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              By using ThumbGrab, you agree to these terms. If you don't agree, please don't use the
              service.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">The service</h2>
            <p>
              ThumbGrab is a free utility that helps you view and download publicly available
              YouTube video thumbnails. We are not affiliated with, endorsed by, or sponsored by
              YouTube or Google.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">Acceptable use</h2>
            <p>
              You agree to use ThumbGrab only for lawful purposes. You will not use it to: violate
              intellectual property rights, harass others, attempt to overload our infrastructure,
              or redistribute the service as your own.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">Copyright</h2>
            <p>
              All thumbnails belong to their original creators or rights-holders. ThumbGrab simply
              provides a convenient way to access publicly served images. You are responsible for
              how you use downloaded thumbnails — respect copyright law and fair use guidelines in
              your jurisdiction.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">No warranty</h2>
            <p>
              ThumbGrab is provided "as is" with no warranties of any kind. We don't guarantee
              uptime, accuracy, or fitness for any particular purpose.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, ThumbGrab is not liable for any damages
              arising from your use of the service.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">Changes</h2>
            <p>
              We may update these terms at any time. Continued use of ThumbGrab after changes means
              you accept the updated terms.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
