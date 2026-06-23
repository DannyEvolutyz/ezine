import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Token = { text: string; highlight: boolean };

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
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lineMap, setLineMap] = useState<number[]>([]);
  const [revealedLines, setRevealedLines] = useState(0);
  const hasPlayedRef = useRef(false);

  const words = useMemo(
    () =>
      TOKENS.flatMap((t, ti) => {
        const parts = t.text.match(/\S+\s*/g) ?? [t.text];
        return parts.map((p, pi) => ({
          text: p,
          highlight: t.highlight,
          key: `${ti}-${pi}`,
        }));
      }),
    []
  );

  const measure = () => {
    const spans = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (spans.length === 0) return;
    const tops: number[] = [];
    const map: number[] = [];
    spans.forEach((s) => {
      const top = s.offsetTop;
      let idx = tops.findIndex((t) => Math.abs(t - top) < 4);
      if (idx === -1) {
        tops.push(top);
        idx = tops.length - 1;
      }
      map.push(idx);
    });
    setLineMap(map);
  };

  useLayoutEffect(() => {
    measure();
    const onResize = () => {
      if (hasPlayedRef.current) return;
      measure();
    };
    window.addEventListener("resize", onResize);
    // Re-measure once fonts settle.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!hasPlayedRef.current) measure();
      });
    }
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lineCount = lineMap.length ? Math.max(...lineMap) + 1 : 0;

  useEffect(() => {
    if (lineCount === 0 || hasPlayedRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      hasPlayedRef.current = true;
      setRevealedLines(lineCount);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const play = () => {
      if (hasPlayedRef.current) return;
      hasPlayedRef.current = true;
      for (let i = 0; i < lineCount; i++) {
        setTimeout(() => setRevealedLines((n) => Math.max(n, i + 1)), i * 200);
      }
    };

    // If section is already in view on mount, play immediately.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    if (visible > 0 && visible / Math.min(rect.height, vh) >= 0.35) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            play();
            observer.disconnect();
          }
        });
      },
      { threshold: [0.35] }
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
          {words.map((w, i) => {
            const line = lineMap[i] ?? null;
            const revealed = line !== null && revealedLines > line;
            return (
              <span
                key={w.key}
                ref={(el) => (wordRefs.current[i] = el)}
                style={{
                  display: "inline-block",
                  opacity: revealed ? 1 : 0.25,
                  transform: revealed ? "translateY(0)" : "translateY(6px)",
                  transition:
                    "opacity 600ms ease-out, transform 600ms ease-out, color 400ms ease-out",
                  whiteSpace: "pre-wrap",
                }}
                className={
                  w.highlight && revealed
                    ? "text-text-dark font-semibold"
                    : ""
                }
              >
                {w.text}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
};

export default WhatIsEzine;
