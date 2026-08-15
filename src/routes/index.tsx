import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ThumbnailGrabber } from "@/components/ThumbnailGrabber";
import {
  Zap,
  ShieldCheck,
  Download,
  Image as ImageIcon,
  Smartphone,
  Sparkles,
  ClipboardPaste,
  MousePointerClick,
  DownloadCloud,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Free YouTube Thumbnail Downloader — HD, 4K | ThumbGrab" },
      {
        name: "description",
        content:
          "Download any YouTube video thumbnail in HD, 4K, SD, and standard resolutions. Free, fast, no signup. Paste a URL and grab the image instantly.",
      },
      { property: "og:title", content: "Free YouTube Thumbnail Downloader | ThumbGrab" },
      {
        property: "og:description",
        content: "Paste a YouTube URL and download the thumbnail in every available resolution.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ThumbGrab",
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Free YouTube thumbnail downloader. Download YouTube thumbnails in HD, 4K, and all resolutions.",
        }),
      },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: Zap, title: "Instant Results", desc: "Paste a URL and get every thumbnail size in a single click — no waiting, no loading screens." },
  { icon: ImageIcon, title: "All Resolutions", desc: "Maxres (1280×720), SD, HQ, MQ, and default — get every size YouTube serves." },
  { icon: Download, title: "One-Click Download", desc: "Save the original JPG straight to your device. No watermarks, no compression." },
  { icon: ShieldCheck, title: "100% Free & Safe", desc: "No signup, no payment, no logging. Your URL never leaves your browser." },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Works perfectly on phones, tablets, and desktops. Download on the go." },
  { icon: Sparkles, title: "Always Up-to-Date", desc: "Works with regular videos, Shorts, live streams, and youtu.be short links." },
];

const steps = [
  { icon: ClipboardPaste, title: "Paste the URL", desc: "Copy any YouTube video link and paste it into the input box above." },
  { icon: MousePointerClick, title: "Click Get Thumbnails", desc: "We instantly fetch every available thumbnail resolution for that video." },
  { icon: DownloadCloud, title: "Download", desc: "Pick the size you need and hit Download to save the JPG image." },
];

const faqs = [
  { q: "Is ThumbGrab free?", a: "Yes — completely free, with no signup or hidden fees. Download as many YouTube thumbnails as you want." },
  { q: "What is the highest resolution available?", a: "The maximum resolution is 1280×720 (maxresdefault.jpg). YouTube only generates this for videos uploaded in HD or higher." },
  { q: "Why is the maxres thumbnail missing for some videos?", a: "If the uploader didn't provide an HD source, YouTube won't generate maxresdefault.jpg. In that case, use sddefault or hqdefault instead." },
  { q: "Does it work with YouTube Shorts?", a: "Yes. Shorts URLs (youtube.com/shorts/...) and shortened youtu.be links are fully supported." },
  { q: "Is this legal?", a: "Thumbnails are public images served by YouTube. Use them responsibly and respect copyright — they belong to the original video creators." },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section
        className="px-4 py-16 sm:py-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-brand-blue mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Free • No signup • HD quality
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-5">
            YouTube Thumbnail{" "}
            <span className="text-brand-red">Downloader</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Paste any YouTube video URL and download the thumbnail in HD, SD, and every available
            resolution — instantly and for free.
          </p>
          <ThumbnailGrabber />
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why use ThumbGrab?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The fastest, cleanest way to grab YouTube thumbnails in any resolution.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20 bg-secondary/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How it works</h2>
            <p className="text-muted-foreground">Three steps. Less than ten seconds.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative bg-card border border-border rounded-xl p-6 shadow-card">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-brand-red text-brand-red-foreground font-bold flex items-center justify-center text-sm shadow-md">
                  {i + 1}
                </div>
                <s.icon className="w-7 h-7 text-brand-blue mb-3" />
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Frequently asked questions</h2>
            <p className="text-muted-foreground">
              More questions? Visit our{" "}
              <Link to="/faq" className="text-brand-blue underline">
                full FAQ
              </Link>
              .
            </p>
          </div>
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
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="px-4 py-20 bg-secondary/40">
        <div className="container mx-auto max-w-3xl prose-like">
          <h2 className="text-3xl font-bold mb-4">About the YouTube Thumbnail Downloader</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">ThumbGrab</strong> is a free online tool that lets
              you download high-quality YouTube thumbnails in just one click. Whether you're a
              content creator, designer, blogger, or just want to save a thumbnail for personal use,
              our tool grabs every resolution YouTube has available — including the elusive 1280×720
              maxres thumbnail.
            </p>
            <h3 className="text-xl font-semibold text-foreground pt-2">
              Which thumbnail sizes can I download?
            </h3>
            <p>
              Every YouTube video has up to five thumbnail variants: <code>maxresdefault.jpg</code>{" "}
              (1280×720), <code>sddefault.jpg</code> (640×480), <code>hqdefault.jpg</code>{" "}
              (480×360), <code>mqdefault.jpg</code> (320×180), and <code>default.jpg</code> (120×90).
              ThumbGrab fetches all of them so you can pick the perfect size for your project.
            </p>
            <h3 className="text-xl font-semibold text-foreground pt-2">
              Use cases for YouTube thumbnail downloads
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Studying competitor thumbnails for design inspiration</li>
              <li>Building a moodboard or reference library</li>
              <li>Creating blog posts that link to YouTube videos</li>
              <li>Designing video playlists for websites and presentations</li>
              <li>Re-uploading your own thumbnails to other platforms</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground pt-2">Privacy first</h3>
            <p>
              ThumbGrab runs entirely in your browser. We don't store your URLs, your downloads, or
              any personal information. The thumbnail images are fetched directly from YouTube's CDN
              (i.ytimg.com).
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
