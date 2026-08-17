import { useState } from "react";
import { Code2, Mail, Facebook, Instagram, Twitter, MessageCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/ezflip-logo.png.asset.json";

type ShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
};

const ShareDialog = ({ open, onOpenChange, title, url }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const embedCode = `<iframe src="${url}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;

  const copy = async (text: string, done: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
    done(true);
    setTimeout(() => done(false), 1500);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socials = [
    {
      label: "X / Twitter",
      icon: Twitter,
      color: "text-[#1DA1F2]",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Email",
      icon: Mail,
      color: "text-[#EA4335]",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
    {
      label: "Instagram",
      icon: Instagram,
      color: "text-[#E1306C]",
      href: "https://www.instagram.com/",
    },
    {
      label: "Facebook",
      icon: Facebook,
      color: "text-[#1877F2]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      color: "text-[#25D366]",
      href: `https://wa.me/?text=${encodedUrl}`,
    },
    {
      label: "Messenger",
      icon: Send,
      color: "text-[#0084FF]",
      href: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=0&redirect_uri=${encodedUrl}`,
    },
  ];

  const tileBase =
    "flex h-12 w-12 items-center justify-center rounded-lg border transition-colors";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl md:text-2xl">Share your flipbook</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* URL row */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/60 p-1.5 pl-4">
            <span className="flex-1 min-w-0 truncate text-sm text-text-dark">{url}</span>
            <button
              onClick={() => copy(url, setCopied)}
              className="shrink-0 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent/90"
            >
              {copied ? "Copied" : "Copy Link"}
            </button>
          </div>

          {/* Share with */}
          <div>
            <p className="mb-3 text-sm font-semibold text-text-dark">Share with:</p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowEmbed((v) => !v)}
                aria-pressed={showEmbed}
                aria-label="Embed code"
                className={`${tileBase} ${
                  showEmbed
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-muted/60 text-text-mid hover:bg-muted"
                }`}
              >
                <Code2 size={20} />
              </button>
              {socials.map(({ label, icon: Icon, color, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => toast({ title: "Sharing", description: `Opening ${label}…` })}
                  aria-label={`Share on ${label}`}
                  className={`${tileBase} border-border bg-muted/60 hover:bg-muted`}
                >
                  <Icon size={20} className={color} />
                </a>
              ))}
            </div>
          </div>

          {/* Embed snippet or QR */}
          {showEmbed ? (
            <div>
              <p className="mb-2 text-sm font-semibold text-text-dark">Copy the code snippet</p>
              <pre className="overflow-x-auto rounded-lg bg-[#231F20] p-4 text-xs leading-relaxed text-white whitespace-pre-wrap break-all">
                <code>{embedCode}</code>
              </pre>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => copy(embedCode, setCodeCopied)}
                  className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent/90"
                >
                  {codeCopied ? "Copied" : "Copy Code"}
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-border p-4 text-center">
              <img src={logo.url} alt="eZFlip" className="mx-auto mb-3 h-6 w-auto" />
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=0&data=${encodedUrl}`}
                alt={`QR code linking to ${title}`}
                className="mx-auto h-48 w-48"
                loading="lazy"
              />
              <p className="mt-3 text-sm text-text-mid">Scan the QR Code to view your eZFlip</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
