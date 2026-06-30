import { useState } from "react";
import { Check, Copy, Link2, Mail, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

type ShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
};

const ShareDialog = ({ open, onOpenChange, title, url }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socials = [
    {
      label: "Facebook",
      icon: Facebook,
      color: "text-[#1877F2]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      color: "text-[#0A66C2]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "X / Twitter",
      icon: Twitter,
      color: "text-text-dark",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Instagram",
      icon: Instagram,
      color: "text-[#E1306C]",
      href: `https://www.instagram.com/`,
    },
    {
      label: "Email",
      icon: Mail,
      color: "text-accent",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Quick Share</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-light">
              Your sharable link
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/60 p-2 pl-3">
              <Link2 size={16} className="text-text-light shrink-0" />
              <span className="flex-1 truncate font-mono text-xs text-text-mid">{url}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {copied ? (
                  <>
                    <Check size={14} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy URL
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-light">
              More for sharing
            </p>
            <div className="grid grid-cols-5 gap-3">
              {socials.map(({ label, icon: Icon, color, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => toast({ title: "Sharing", description: `Opening ${label}…` })}
                  className="flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-muted"
                  aria-label={`Share on ${label}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background">
                    <Icon size={20} className={color} />
                  </span>
                  <span className="text-[10px] font-medium text-text-mid">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
