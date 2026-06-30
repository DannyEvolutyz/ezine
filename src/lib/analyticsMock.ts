// Deterministic mock analytics data keyed by doc id

export type DeviceType = "Mobile" | "Desktop" | "Tablet";
export type Source = "Direct" | "Email" | "WhatsApp" | "Embedded" | "Social" | "Other";

export interface OpenEvent {
  id: string;
  timestamp: string; // ISO
  device: DeviceType;
  countryCode: string;
  countryName: string;
  flag: string;
  source: Source;
}

export interface AnalyticsData {
  empty: boolean;
  summary: {
    uniqueViews: number;
    avgReadTimeSeconds: number;
    completionRate: number;
    totalOpens: number;
  };
  devices: { name: DeviceType; value: number }[];
  referrers: { name: Source; value: number }[];
  pageStats: { page: number; avgSeconds: number; views: number }[];
  funnel: { page: number; percent: number }[];
  opens: OpenEvent[];
  lastUpdatedMinutesAgo: number;
}

// Tiny seeded RNG so values are stable per doc
function seedFrom(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COUNTRIES: { code: string; name: string; flag: string }[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
];

const DEVICES: DeviceType[] = ["Mobile", "Desktop", "Tablet"];
const SOURCES: Source[] = ["Direct", "Email", "WhatsApp", "Embedded", "Social", "Other"];

export function getAnalyticsForDoc(docId: string, pages: number): AnalyticsData {
  // demo empty state for a specific seeded doc
  if (docId === "doc-3") {
    return {
      empty: true,
      summary: { uniqueViews: 0, avgReadTimeSeconds: 0, completionRate: 0, totalOpens: 0 },
      devices: [],
      referrers: [],
      pageStats: [],
      funnel: [],
      opens: [],
      lastUpdatedMinutesAgo: 0,
    };
  }

  const rand = seedFrom(docId);
  const totalOpens = 120 + Math.floor(rand() * 480);
  const uniqueViews = Math.floor(totalOpens * (0.55 + rand() * 0.25));
  const avgReadTimeSeconds = 45 + Math.floor(rand() * 240);
  const completionRate = 35 + Math.floor(rand() * 50);

  // devices
  const m = 35 + Math.floor(rand() * 30);
  const d = 30 + Math.floor(rand() * 30);
  const t = Math.max(0, 100 - m - d);
  const devices = [
    { name: "Mobile" as const, value: m },
    { name: "Desktop" as const, value: d },
    { name: "Tablet" as const, value: t },
  ];

  // referrers (percent)
  const refRaw = SOURCES.map(() => 1 + rand() * 5);
  const sum = refRaw.reduce((a, b) => a + b, 0);
  const referrers = SOURCES.map((name, i) => ({
    name,
    value: Math.round((refRaw[i] / sum) * 100),
  }));

  // page stats
  const pageStats = Array.from({ length: pages }, (_, i) => ({
    page: i + 1,
    avgSeconds: 8 + Math.floor(rand() * 90),
    views: Math.max(1, Math.floor(uniqueViews * (1 - i / (pages * 1.4)) * (0.7 + rand() * 0.4))),
  }));

  // funnel - monotonically decreasing
  let pct = 100;
  const funnel = Array.from({ length: pages }, (_, i) => {
    if (i > 0) pct = Math.max(5, pct - rand() * 14);
    return { page: i + 1, percent: Math.round(pct) };
  });

  // opens
  const opens: OpenEvent[] = Array.from({ length: Math.min(totalOpens, 87) }, (_, i) => {
    const country = COUNTRIES[Math.floor(rand() * COUNTRIES.length)];
    const device = DEVICES[Math.floor(rand() * DEVICES.length)];
    const source = SOURCES[Math.floor(rand() * SOURCES.length)];
    const minutesAgo = Math.floor(rand() * 60 * 24 * 30);
    const ts = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
    return {
      id: `open-${docId}-${i}`,
      timestamp: ts,
      device,
      countryCode: country.code,
      countryName: country.name,
      flag: country.flag,
      source,
    };
  }).sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  return {
    empty: false,
    summary: { uniqueViews, avgReadTimeSeconds, completionRate, totalOpens },
    devices,
    referrers,
    pageStats,
    funnel,
    opens,
    lastUpdatedMinutesAgo: 3 + Math.floor(rand() * 40),
  };
}

export function formatReadTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  const dd = d.getDate().toString().padStart(2, "0");
  const mon = d.toLocaleString("en-US", { month: "short" });
  const yyyy = d.getFullYear();
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${dd} ${mon} ${yyyy}, ${hh}:${mm}`;
}
