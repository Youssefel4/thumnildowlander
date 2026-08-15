import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Youtube } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-brand-red text-brand-red-foreground">
              <Youtube className="w-5 h-5" />
            </span>
            <span>
              Thumb<span className="text-brand-blue">Grab</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-muted-foreground hover:text-brand-blue transition-colors"
                activeProps={{ className: "text-brand-blue" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <nav className="md:hidden border-t border-border bg-background">
            <div className="container mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-secondary/50 mt-16">
        <div className="container mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-brand-red text-brand-red-foreground">
                <Youtube className="w-5 h-5" />
              </span>
              <span>ThumbGrab</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Free YouTube thumbnail downloader. Get HD thumbnails in every resolution, instantly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Pages</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-brand-blue">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-brand-blue">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-blue">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} ThumbGrab. Not affiliated with YouTube or Google.
          </div>
        </div>
      </footer>
    </div>
  );
}
