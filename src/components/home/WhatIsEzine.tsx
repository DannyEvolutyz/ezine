import { useEffect, useRef, useState } from "react";

type Token = { text: string; highlight: boolean };

// Tokens preserve original spacing/punctuation; highlighted segments transition to bold/dark.
const TOKENS: Token[] = [
  { text: "Ezine helps you turn static documents and PDFs into ", highlight: false },
  { text: "interactive", highlight: true },
  { text: ", ", highlight: false },
  { text: "AI-powered", highlight: true },
  { text: " experiences. With built-in AI chat, users can ask questions, generate ", highlight: false },
  { text: "instant summaries", highlight: true },
  { text: ", and ", highlight: false },
  { text: "track", highlight: true },
  { text: " how your audience ", highlight: false },
  { text: "engages", highlight: true },
  { text: " — all without changing how you create or share your content.", highlight: false },
];

const WhatIsEzine = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [lineCount, setLineCount] = useState(0);
  const [revealedLines, setRevealedLines] = useState(0);
  const hasPlayedRef = useRef(false);

  // Flatten tokens into word-level spans for measurement.
  const words = TOKENS.flatMap((t, ti) => {
    // Split keeping trailing spaces attached to each word.
    const parts = t.text.match(/\S+\s*/g) ?? [t.text];
    return parts.map((p, pi) => ({
      text: p,
      highlight: t.highlight,
      key: `${ti}-${pi}`,
    }));
  });

  // Measure which visual line each word belongs to (by top offset).
  const measureLines = () => {
    const p = paragraphRef.current;
    if (!p) return;
    const spans = Array.from(p.querySelectorAll<HTMLSpanElement>("[data-word]"));
    const tops: number[] = [];
    const lineMap: number[] = [];
    spans.forEach((s) => {
      const top = s.offsetTop;
      let idx = tops.findIndex((t) => Math.abs(t - top) < 4);
      if (idx === -1) {
        tops.push(top);
        idx = tops.length - 1;
      }
      lineMap.push(idx);
      s.setAttribute("data-line", String(idx));
    });
    setLineCount(tops.length);
  };

  useEffect(() => {
    measureLines();
    const onResize = () => {
      if (hasPlayedRef.current) return;
      measureLines();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRevealedLines(999);
      hasPlayedRef.current = true;
      return;
    }
    const el = sectionRef.current;
    if (!el || lineCount === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            // Stagger reveal of lines (200ms apart).
            for (let i = 0; i < lineCount; i++) {
              setTimeout(() => setRevealedLines((n) => Math.max(n, i + 1)), i * 200);
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lineCount]);

  return (
    <section
      ref={sectionRef}
      className="bg-off-white min-h-[80vh] flex items-center px-5 md:px-12 py-16 md:py-20"
    >
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="font-heading text-[18px] font-medium tracking-tight leading-[1.1] text-text-dark mb-8">
          What is <span className="uppercase tracking-wider">EZINE</span>?
        </h2>
        <p
          ref={paragraphRef}
          className="whatis-text text-[24px] md:text-[32px] leading-[1.65] text-text-mid font-light"
        >
          {words.map((w) => (
            <WordSpan key={w.key} word={w} revealedLines={revealedLines} />
          ))}
        </p>
      </div>
    </section>
  );
};

const WordSpan = ({
  word,
  revealedLines,
}: {
  word: { text: string; highlight: boolean; key: string };
  revealedLines: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [line, setLine] = useState<number | null>(null);

  useEffect(() => {
    const attr = ref.current?.getAttribute("data-line");
    if (attr !== null && attr !== undefined) setLine(Number(attr));
  });

  const revealed = line === null ? false : revealedLines > line;

  return (
    <span
      ref={ref}
      data-word
      style={{
        display: "inline-block",
        opacity: revealed ? 1 : 0.25,
        transform: revealed ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 600ms ease-out, transform 600ms ease-out, color 600ms ease-out, font-weight 600ms ease-out",
        color: word.highlight && revealed ? "hsl(var(--text-dark, 220 13% 13%))" : undefined,
        fontWeight: word.highlight && revealed ? 600 : undefined,
        whiteSpace: "pre-wrap",
      }}
      className={word.highlight && revealed ? "text-text-dark font-semibold" : ""}
    >
      {word.text}
    </span>
  );
};

export default WhatIsEzine;
