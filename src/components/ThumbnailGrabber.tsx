import { useState } from "react";
import { Download, Link2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  extractYouTubeId,
  THUMBNAIL_VARIANTS,
  thumbnailUrl,
} from "@/lib/youtube";

export function ThumbnailGrabber() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleGrab(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    const id = extractYouTubeId(url);
    if (!id) {
      setError("Please enter a valid YouTube URL or video ID.");
      setVideoId(null);
      return;
    }
    setVideoId(id);
  }

  async function handleDownload(src: string, name: string) {
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open in new tab after validating URL to prevent Open Redirect vulnerability
      if (src.startsWith("https://i.ytimg.com/") || src.startsWith("https://img.youtube.com/")) {
        window.open(src, "_blank", "noopener");
      } else {
        console.error("Blocked download fallback redirection: unsafe source URL:", src);
      }
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleGrab}
        className="flex flex-col sm:flex-row gap-3 bg-card p-3 rounded-xl shadow-elevated border border-border"
      >
        <div className="flex-1 flex items-center gap-2 px-3 bg-background rounded-lg border border-border focus-within:ring-2 focus-within:ring-brand-blue">
          <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a YouTube URL, e.g. https://youtu.be/dQw4w9WgXcQ"
            className="border-0 shadow-none focus-visible:ring-0 px-0 h-12 text-base"
            aria-label="YouTube URL"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-12 px-8 bg-brand-red text-brand-red-foreground hover:bg-brand-red/90 font-semibold"
        >
          Get Thumbnails
        </Button>
      </form>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-3">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {videoId && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-1">Available Thumbnails</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Video ID: <code className="font-mono">{videoId}</code> — Right-click → Save image, or use the Download button.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {THUMBNAIL_VARIANTS.map((v) => (
              <ThumbCard
                key={v.key}
                src={thumbnailUrl(videoId, v.filename)}
                label={v.label}
                resolution={v.resolution}
                filename={`${videoId}-${v.filename}`}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ThumbCard({
  src,
  label,
  resolution,
  filename,
  onDownload,
}: {
  src: string;
  label: string;
  resolution: string;
  filename: string;
  onDownload: (src: string, name: string) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden flex flex-col">
      <div className="aspect-video bg-muted relative flex items-center justify-center">
        {!failed ? (
          <>
            {!loaded && (
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground absolute" />
            )}
            <img
              src={src}
              alt={`${label} YouTube thumbnail (${resolution})`}
              loading="lazy"
              onLoad={(e) => {
                const img = e.currentTarget;
                // YouTube returns a 120x90 gray placeholder when a resolution doesn't exist
                if (img.naturalWidth <= 120 && label !== "Default") {
                  setFailed(true);
                } else {
                  setLoaded(true);
                }
              }}
              onError={() => setFailed(true)}
              className={`w-full h-full object-cover transition-opacity ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <span className="text-xs text-muted-foreground px-4 text-center">
            Not available for this video
          </span>
        )}
      </div>
      <div className="p-4 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold text-sm">{label}</div>
          <div className="text-xs text-muted-foreground">{resolution}</div>
        </div>
        <Button
          size="sm"
          disabled={failed}
          onClick={() => onDownload(src, filename)}
          className="bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90"
        >
          <Download className="w-4 h-4 mr-1" /> Download
        </Button>
      </div>
    </div>
  );
}
