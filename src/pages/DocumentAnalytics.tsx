import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Eye,
  Link2,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppShell from "@/components/AppShell";
import { useDocuments } from "@/hooks/useDocuments";
import {
  formatDateTime,
  formatReadTime,
  getAnalyticsForDoc,
  type DeviceType,
} from "@/lib/analyticsMock";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const RANGES = ["Last 7 Days", "Last 30 Days", "All Time"] as const;
type Range = (typeof RANGES)[number];

const ACCENT = "#F05A28";
const PRIMARY = "#231F20";
const SOFT = "#E5E1DC";
const PIE_COLORS = [ACCENT, PRIMARY, "#BE1E2D"];

const PAGE_SIZE = 25;

const DeviceIcon = ({ device }: { device: DeviceType }) => {
  if (device === "Mobile") return <Smartphone size={14} />;
  if (device === "Tablet") return <Tablet size={14} />;
  return <Monitor size={14} />;
};

const MetricCard = ({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
  hint?: string;
}) => (
  <div className="rounded-2xl border border-border/70 bg-background p-5 transition-all hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgba(35,31,32,0.25)] animate-fade-in-up">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-wide text-text-light">
        {label}
      </span>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon size={16} />
      </span>
    </div>
    <div className="mt-4 font-heading text-3xl font-bold text-primary">{value}</div>
    {hint && <div className="mt-1 text-xs text-text-mid">{hint}</div>}
  </div>
);

const ChartCard = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border/70 bg-background p-5 animate-fade-in-up">
    <div className="mb-3">
      <h3 className="font-heading text-base font-bold text-primary">{title}</h3>
      {subtitle && <p className="text-xs text-text-mid">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const DocumentAnalytics = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDocument } = useDocuments();
  const doc = id ? getDocument(id) : undefined;
  const [range, setRange] = useState<Range>("All Time");
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState(false);

  const data = useMemo(
    () => getAnalyticsForDoc(id ?? "unknown", doc?.pages ?? 12),
    [id, doc?.pages],
  );

  if (!doc) {
    return (
      <AppShell>
        <div className="rounded-2xl border border-dashed border-border-strong bg-background py-20 text-center">
          <p className="text-text-mid">Document not found.</p>
          <Link to="/library" className="mt-4 inline-block text-accent hover:underline">
            Back to Library
          </Link>
        </div>
      </AppShell>
    );
  }

  const shareUrl = `https://ezflip.ai${doc.shortUrl}`;

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const totalPages = Math.max(1, Math.ceil(data.opens.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedOpens = data.opens.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Top 3 most engaging pages for heatmap highlight
  const topPages = [...data.pageStats]
    .sort((a, b) => b.avgSeconds - a.avgSeconds)
    .slice(0, 3)
    .map((p) => p.page);

  return (
    <AppShell>
      {/* Header strip */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 animate-fade-in-up">
        <div className="min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-text-mid transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
            <BarChart3 size={14} />
            Document Analytics
          </div>
          <h1 className="mt-1 font-heading text-2xl md:text-3xl font-bold text-primary truncate">
            {doc.name}
          </h1>
          <div className="mt-1 text-sm text-text-mid">
            {doc.pages} pages
            {!data.empty && (
              <>
                {" · "}
                <span className="inline-flex items-center gap-1">
                  <RefreshCw size={12} />
                  Data refreshed {data.lastUpdatedMinutesAgo}m ago
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 md:items-end">
          <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-md border border-accent/40 bg-background px-3 py-2">
            <Link2 size={14} className="shrink-0 text-text-light" />
            <span className="truncate font-mono text-xs sm:text-sm font-medium text-text-dark max-w-[260px]">
              {shareUrl}
            </span>
            <button
              onClick={copyShareLink}
              aria-label="Copy share link"
              className={`inline-flex shrink-0 items-center gap-1 text-xs font-semibold transition-colors ${
                copied ? "text-green-600" : "text-text-light hover:text-accent"
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy URL"}</span>
            </button>
          </div>
        </div>
      </div>

      {data.empty ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-background py-20 px-6 text-center animate-fade-in-up">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
            <BarChart3 size={28} strokeWidth={1.75} />
          </div>
          <h3 className="font-heading text-lg md:text-xl font-bold text-primary">
            No Views Yet
          </h3>
          <p className="mt-2 max-w-md text-sm text-text-mid">
            Share your link to start tracking. Analytics will appear here as soon as your
            first reader opens the flipbook.
          </p>
          <button
            onClick={copyShareLink}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-8px_rgba(240,90,40,0.6)] transition-all hover:scale-[1.03] active:scale-95"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Link Copied" : "Copy Share Link"}
          </button>
          <div className="mt-4 font-mono text-xs text-text-light">{shareUrl}</div>
        </div>
      ) : (
        <>
          {/* Date range filter */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-background p-1">
              {RANGES.map((r) => {
                const active = range === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`rounded-full px-3 md:px-4 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-accent text-primary-foreground"
                        : "text-text-mid hover:text-text-dark"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              icon={Eye}
              label="Unique Views"
              value={data.summary.uniqueViews.toLocaleString()}
              hint="Distinct readers"
            />
            <MetricCard
              icon={Clock}
              label="Avg Read Time"
              value={formatReadTime(data.summary.avgReadTimeSeconds)}
              hint="Per reader session"
            />
            <MetricCard
              icon={CheckCircle2}
              label="Completion Rate"
              value={`${data.summary.completionRate}%`}
              hint="Reached the last page"
            />
            <MetricCard
              icon={Link2}
              label="Total Link Opens"
              value={data.summary.totalOpens.toLocaleString()}
              hint="Including repeat visits"
            />
          </div>

          {/* Devices + Referrers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <ChartCard title="Device Breakdown" subtitle="Where your readers open the flipbook">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="h-40 w-40 sm:h-48 sm:w-48 shrink-0 self-start">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.devices}
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {data.devices.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid #eee",
                          fontSize: 12,
                        }}
                        formatter={(v: number) => `${v}%`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="flex-1 w-full space-y-3">
                  {data.devices.map((d, i) => (
                    <li key={d.name} className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm text-text-dark min-w-0">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                        />
                        <DeviceIcon device={d.name} />
                        {d.name}
                      </span>
                      <span className="font-semibold text-primary">{d.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ChartCard>

            <ChartCard title="Traffic Sources" subtitle="Where your link opens come from">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.referrers}
                    layout="vertical"
                    margin={{ top: 4, right: 24, bottom: 4, left: 12 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      width={80}
                      tick={{ fontSize: 12, fill: "#52514F" }}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(240,90,40,0.06)" }}
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #eee",
                        fontSize: 12,
                      }}
                      formatter={(v: number) => `${v}%`}
                    />
                    <Bar dataKey="value" fill={ACCENT} radius={[0, 6, 6, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Page time + Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <ChartCard
              title="Page-Time Heatmap"
              subtitle="Average seconds per page. Top 3 highlighted."
            >
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.pageStats} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                    <XAxis
                      dataKey="page"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#52514F" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#52514F" }}
                      width={32}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(240,90,40,0.06)" }}
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #eee",
                        fontSize: 12,
                      }}
                      formatter={(v: number) => `${v}s`}
                      labelFormatter={(l) => `Page ${l}`}
                    />
                    <Bar dataKey="avgSeconds" radius={[6, 6, 0, 0]}>
                      {data.pageStats.map((p) => (
                        <Cell
                          key={p.page}
                          fill={topPages.includes(p.page) ? ACCENT : SOFT}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard
              title="Drop-Off Funnel"
              subtitle="Percentage of readers reaching each page"
            >
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.funnel} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                    <XAxis
                      dataKey="page"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#52514F" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#52514F" }}
                      width={32}
                      domain={[0, 100]}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(35,31,32,0.04)" }}
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #eee",
                        fontSize: 12,
                      }}
                      formatter={(v: number) => `${v}%`}
                      labelFormatter={(l) => `Page ${l}`}
                    />
                    <Bar dataKey="percent" fill={PRIMARY} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Link Open Log */}
          <div className="rounded-2xl border border-border/70 bg-background animate-fade-in-up">
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 border-b border-border/60">
              <div>
                <h3 className="font-heading text-base font-bold text-primary">
                  Link Open Log
                </h3>
                <p className="text-xs text-text-mid">
                  Every time your share link was opened. Newest first.
                </p>
              </div>
              <span className="text-xs font-medium text-text-light">
                {data.opens.length} opens
              </span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-text-mid">Date & Time</TableHead>
                  <TableHead className="text-text-mid">Device</TableHead>
                  <TableHead className="text-text-mid">Country</TableHead>
                  <TableHead className="text-text-mid">Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedOpens.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="text-sm text-text-dark tabular-nums">
                      {formatDateTime(o.timestamp)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-sm text-text-dark">
                        <DeviceIcon device={o.device} />
                        {o.device}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-sm text-text-dark">
                        <span className="text-base leading-none">{o.flag}</span>
                        {o.countryName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-text-dark">
                        {o.source}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {data.opens.length > PAGE_SIZE && (
              <div className="p-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((p) => Math.max(1, p - 1));
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(p);
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((p) => Math.min(totalPages, p + 1));
                        }}
                        className={
                          currentPage === totalPages ? "pointer-events-none opacity-50" : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </>
      )}
    </AppShell>
  );
};

export default DocumentAnalytics;
