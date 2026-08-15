import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ThumbGrab" },
      {
        name: "description",
        content: "How ThumbGrab handles your data: no tracking of URLs, minimal analytics, AdSense disclosure.",
      },
      { property: "og:title", content: "Privacy Policy — ThumbGrab" },
      { property: "og:description", content: "How ThumbGrab handles your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: May 31, 2026</p>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              ThumbGrab ("we", "us") respects your privacy. This policy explains what information we
              collect, what we don't, and how we use it.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">Information we collect</h2>
            <p>
              ThumbGrab does <strong>not</strong> require an account and does <strong>not</strong>{" "}
              store the YouTube URLs you submit. All URL parsing and thumbnail retrieval happens in
              your browser; thumbnail images are fetched directly from YouTube's CDN
              (i.ytimg.com).
            </p>
            <p>We may collect anonymous usage analytics (page views, device type) to improve the service. We do not collect personal information.</p>
            <h2 className="text-xl font-semibold text-foreground pt-2">Cookies and advertising</h2>
            <p>
              ThumbGrab may display ads served by third parties, including Google AdSense. These
              providers may use cookies and similar technologies to serve ads based on your prior
              visits to this site or other sites. You can opt out of personalized advertising by
              visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-brand-blue underline"
                target="_blank"
                rel="noreferrer"
              >
                Google Ads Settings
              </a>
              .
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">Third-party services</h2>
            <p>
              Thumbnails are hosted by YouTube (Google LLC). Your interaction with those images is
              subject to Google's privacy policy.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">Your rights</h2>
            <p>
              Because we don't collect personally identifiable data, there's typically nothing to
              delete. If you have questions, contact us at hello@thumbgrab.app.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-2">Changes</h2>
            <p>We may update this policy from time to time. Updates will appear on this page with a new "last updated" date.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
