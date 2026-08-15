export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // Direct ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/")[1];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = url.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      // /shorts/ID, /embed/ID, /live/ID, /v/ID
      const known = ["shorts", "embed", "live", "v"];
      if (parts.length >= 2 && known.includes(parts[0])) {
        const id = parts[1];
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
    }
  } catch {
    // ignore
  }
  // Regex fallback
  const m = trimmed.match(/([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export interface ThumbnailVariant {
  key: string;
  label: string;
  resolution: string;
  filename: string;
}

export const THUMBNAIL_VARIANTS: ThumbnailVariant[] = [
  { key: "maxresdefault", label: "Maximum Resolution", resolution: "1280×720", filename: "maxresdefault.jpg" },
  { key: "sddefault", label: "Standard Definition", resolution: "640×480", filename: "sddefault.jpg" },
  { key: "hqdefault", label: "High Quality", resolution: "480×360", filename: "hqdefault.jpg" },
  { key: "mqdefault", label: "Medium Quality", resolution: "320×180", filename: "mqdefault.jpg" },
  { key: "default", label: "Default", resolution: "120×90", filename: "default.jpg" },
];

export function thumbnailUrl(id: string, filename: string) {
  return `https://i.ytimg.com/vi/${id}/${filename}`;
}
