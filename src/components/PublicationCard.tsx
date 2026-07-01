import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Check,
  Copy,
  ExternalLink,
  Link2,
  MessageSquare,
  MoreVertical,
  Share2,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import type { DocItem } from "@/hooks/useDocuments";

type Props = {
  doc: DocItem;
  copied: boolean;
  onCopy: (doc: DocItem) => void;
  onShare: (doc: DocItem) => void;
  onDelete?: (doc: DocItem) => void;
  showDelete?: boolean;
};

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    const day = d.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    const month = d.toLocaleString("en-US", { month: "long" });
    return `${day}${suffix} ${month}, ${d.getFullYear()}`;
  } catch {
    return "";
  }
};

const BookPreview = () => (
  <div
    aria-hidden
    className="relative h-[180px] w-full overflow-hidden rounded-lg border border-border/70 bg-[#F5F3F1]"
  >
    {/* Book */}
    <div className="absolute left-1/2 top-1/2 h-[160px] w-[249px] -translate-x-1/2 -translate-y-1/2 bg-white shadow-[0_8px_20px_-12px_rgba(0,0,0,0.25)]">
      {/* Left page shading */}
      <div
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          background:
            "linear-gradient(270deg,#C6C6C6 0%,#D4D2D2 5%,#E2E2E2 10%,#EDEDED 15%,#FFFFFF 52.78%,#FFFFFF 100%)",
        }}
      />
      {/* Right page stacked sheets */}
      <div className="absolute inset-y-0 right-0 w-1/2">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="absolute inset-y-0 right-0 w-full bg-[#F9F9F9]"
            style={{
              right: `${-1.55 + i * 0.22}px`,
              top: `${1.11 - i * 0.14}%`,
              bottom: `${0.56 - i * 0.07}%`,
              borderRight: "0.5px solid rgba(0,0,0,0.31)",
              boxShadow: "inset -0.5px 0 1px #DDDDDD",
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg,#FFFFFF 0%,#FFFFFF 50%,#EDEDED 85%,#E9E9E9 90%,#DEDEDE 95%,#D2D2D2 100%)",
          }}
        />
      </div>
      {/* Left page text lines */}
      <div className="absolute left-[8px] top-[10px] flex w-[108px] flex-col gap-[3px]">
        <div className="h-[3px] w-[40%] bg-neutral-800/70" />
        <div className="h-[2px] w-[70%] bg-neutral-500/60" />
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="h-[2px] bg-neutral-400/50"
            style={{ width: `${55 + ((i * 13) % 40)}%` }}
          />
        ))}
      </div>
      {/* Right page text lines */}
      <div className="absolute right-[8px] top-[10px] flex w-[108px] flex-col gap-[3px]">
        <div className="h-[3px] w-[40%] bg-neutral-800/70" />
        <div className="h-[2px] w-[70%] bg-neutral-500/60" />
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="h-[2px] bg-neutral-400/50"
            style={{ width: `${50 + ((i * 17) % 45)}%` }}
          />
        ))}
      </div>
      {/* Spine */}
      <div
        className="absolute left-1/2 top-0 h-full w-[7px] -translate-x-1/2 blur-[2px]"
        style={{
          background:
            "linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.32) 100%)",
        }}
      />
    </div>
  </div>
);

const PublicationCard = ({ doc, copied, onCopy, onShare, onDelete, showDelete = true }: Props) => {
  const navigate = useNavigate();

  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-[#E4E1E0] bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgba(35,31,32,0.25)] animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Link
            to={`/viewer/${doc.id}`}
            className="block truncate font-heading text-lg font-medium leading-6 text-[#231F20] hover:text-primary"
          >
            {doc.name}
          </Link>
          <p className="mt-0.5 truncate text-sm font-normal leading-5 text-[#848484]">
            Created on: {formatDate(doc.uploadedAt)}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="More options"
              className="p-1 text-[#231F20] transition-colors hover:text-accent"
            >
              <MoreVertical size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem asChild>
              <a
                href={`/viewer/${doc.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink size={14} />
                Open in new tab
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onShare(doc)} className="flex items-center gap-2">
              <Share2 size={14} />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onCopy(doc);
                toast({ title: "Link copied", description: doc.shortUrl });
              }}
              className="flex items-center gap-2"
            >
              <Link2 size={14} />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/viewer/${doc.id}?chat=open`)}
              className="flex items-center gap-2"
            >
              <MessageSquare size={14} />
              EzChat
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/analytics/${doc.id}`)}
              className="flex items-center gap-2"
            >
              <BarChart3 size={14} />
              Analytics
            </DropdownMenuItem>
            {showDelete && onDelete && (
              <>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash2 size={14} />
                      Delete flipbook
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this flipbook?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove “{doc.name}”. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(doc)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete flipbook
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Book preview */}
      <Link to={`/viewer/${doc.id}`} className="block">
        <BookPreview />
      </Link>

      {/* Footer: URL + actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 rounded border border-[#F05A28]/60 px-2 py-1">
          <span className="flex-1 truncate font-mono text-sm text-[#231F20]">{doc.shortUrl}</span>
          <button
            onClick={() => onCopy(doc)}
            aria-label={copied ? "Copied" : "Copy URL"}
            className={`flex items-center gap-1 text-sm font-medium transition-colors ${
              copied ? "text-green-600" : "text-[#848484] hover:text-accent"
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy URL"}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/viewer/${doc.id}?chat=open`}
            aria-label="Open chat assistant"
            className="flex h-8 w-8 items-center justify-center rounded text-[#231F20] transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <MessageSquare size={20} />
          </Link>
          <Link
            to={`/analytics/${doc.id}`}
            aria-label="Analytics"
            className="flex h-8 w-8 items-center justify-center rounded text-[#231F20] transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <BarChart3 size={20} />
          </Link>
          <button
            onClick={() => onShare(doc)}
            aria-label="Share"
            className="flex h-8 w-8 items-center justify-center rounded border border-[#E4E1E0] bg-[#F5F3F1] text-[#231F20] transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PublicationCard;
