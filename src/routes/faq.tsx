import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — YouTube Thumbnail Downloader | ThumbGrab" },
      {
        name: "description",
        content:
          "Answers to common questions about downloading YouTube thumbnails: supported resolutions, Shorts, legality, and more.",
      },
      { property: "og:title", content: "ThumbGrab FAQ" },
      { property: "og:description", content: "Frequently asked questions about ThumbGrab." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  { q: "Is ThumbGrab really free?", a: "Yes. ThumbGrab is 100% free, with no signup, no watermarks, and no daily download limit." },
  { q: "What URLs are supported?", a: "Regular YouTube links (youtube.com/watch?v=...), short links (youtu.be/...), Shorts (youtube.com/shorts/...), embeds, and live streams." },
  { q: "What is the highest available resolution?", a: "1280×720 (maxresdefault.jpg). YouTube only generates this for videos uploaded in HD or higher." },
  { q: "Why is maxres missing for some videos?", a: "If the uploader didn't provide an HD source, YouTube doesn't create the 1280×720 file. Use sddefault (640×480) or hqdefault (480×360) instead." },
  { q: "Do you store the URLs I paste?", a: "No. URLs are processed in your browser only. We don't log them and we don't send them to any server." },
  { q: "Is downloading thumbnails legal?", a: "Thumbnails are public images served by YouTube. You're free to download them, but they're still copyrighted by the original creator. Use them responsibly — fair use, attribution, or with permission." },
  { q: "Can I download thumbnails in bulk?", a: "Not yet — but you can download every resolution for a single video at once. Bulk downloads are on the roadmap." },
  { q: "Does it work on mobile?", a: "Yes. ThumbGrab is fully responsive and works on iOS, Android, tablets, and desktops." },
  { q: "What format are the thumbnails in?", a: "Always JPG — that's the format YouTube serves natively." },
  { q: "Will this work with private or unlisted videos?", a: "Only if the thumbnail is publicly accessible. Private videos block thumbnail access entirely." },
];

function FAQPage() {
  return (
    <SiteLayout>
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">Frequently asked questions</h1>
          <p className="text-muted-foreground mb-10">
            Everything you might want to know about ThumbGrab and YouTube thumbnails.
          </p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="bg-card border border-border rounded-lg p-4 group"
              >
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  {f.q}
                  <span className="text-brand-blue group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
