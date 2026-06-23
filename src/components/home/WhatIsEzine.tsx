import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Token = { text: string; highlight: boolean };

const TOKENS: Token[] = [
  { text: "Ezine helps you turn static documents and PDFs into", highlight: false },
  { text: "interactive", highlight: true },
  { text: ",", highlight: false },
  { text: "AI-powered", highlight: true },
  { text: "experiences. With built-in AI chat, users can ask questions, generate", highlight: false },
  { text: "instant summaries", highlight: true },
  { text: ", and", highlight: false },
  { text: "track", highlight: true },
  { text: "how your audience", highlight: false },
  { text: "engages", highlight: true },
  { text: "— all without changing how you create or share your content.", highlight: false },
];

type Word = { text: string; highlight: boolean; key: string; trailingPunct?: string };

const WhatIsEzine = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lineMap, setLineMap] = useState<number[]>([]);
  const [progress, setProgress] = useState(0); // 0..1 across outer container

  // Build words. Punctuation-only tokens (",", ", and") merge into previous word so commas hug.
  const words: Word[] = useMemo(() => {
    const out: Word[] = [];
    TOKENS.forEach((t, ti) => {
      const trimmed = t.text.trim();
      // If token is pure punctuation (starts with , or .), attach to previous word.
      if (/^[,.;:!?]/.test(trimmed) && out.length > 0) {
        // Split: leading punctuation goes onto previous word; rest becomes separate words.
        const match = trimmed.match(/^([,.;:!?]+)\s*(.*)$/);
        if (match) {
          out[out.length - 1].text += match[1];
          const rest = match[2];
          if (rest) {
            rest.split(/\s+/).forEach((w, pi) => {
              if (w) out.push({ text: w, highlight: t.highlight, key: `${ti}-${pi}` });
            });
          }
          return;
        }
      }
      const parts = trimmed.split(/\s+/);
      parts.forEach((p, pi) => {
        if (p) out.push({ text: p, highlight: t.highlight, key: `${ti}-${pi}` });
      });
    });
    return out;
  }, []);

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
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => measure());
    }
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lineCount = lineMap.length ? Math.max(...lineMap) + 1 : 0;

  // Drive progress from scroll position of outer container.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }
    const el = outerRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Progress 0 when top of outer hits top of viewport;
      // 1 when bottom of outer leaves top of viewport (= scrollable distance).
      const scrollable = rect.height - vh;
      if (scrollable <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setProgress(p);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Map progress → number of revealed lines. Start at ~10% scroll, finish by ~85%.
  const revealStart = 0.1;
  const revealEnd = 0.85;
  const linesProgress = Math.max(
    0,
    Math.min(1, (progress - revealStart) / (revealEnd - revealStart))
  );
  const revealedLines = Math.floor(linesProgress * (lineCount + 0.001) * 1);
  const partialLineFrac = linesProgress * lineCount - revealedLines; // 0..1 within current line

  return (
    <div ref={outerRef} className="relative bg-off-white" style={{ height: "250vh" }}>
      <section className="sticky top-0 h-screen flex items-center px-5 md:px-12">
        <div className="max-w-[800px] mx-auto text-center w-full">
          <h2 className="font-heading text-[18px] font-medium tracking-tight leading-[1.1] text-text-dark mb-8">
            What is <span className="uppercase tracking-wider">EZINE</span>?
          </h2>
          <p
            ref={paragraphRef}
            className="whatis-text text-[24px] md:text-[32px] leading-[1.65] text-text-mid font-light"
          >
            {words.map((w, i) => {
              const line = lineMap[i] ?? null;
              let opacity = 0.22;
              let revealed = false;
              if (line !== null) {
                if (revealedLines > line) {
                  opacity = 1;
                  revealed = true;
                } else if (revealedLines === line) {
                  // Currently fading line.
                  opacity = 0.22 + 0.78 * partialLineFrac;
                  revealed = partialLineFrac > 0.5;
                }
              }
              return (
                <span key={w.key} style={{ whiteSpace: "normal" }}>
                  <span
                    ref={(el) => (wordRefs.current[i] = el)}
                    style={{
                      display: "inline-block",
                      opacity,
                      transition:
                        "opacity 250ms ease-out, color 300ms ease-out",
                    }}
                    className={
                      w.highlight && revealed
                        ? "text-text-dark font-semibold"
                        : ""
                    }
                  >
                    {w.text}
                  </span>{" "}
                </span>
              );
            })}
          </p>
        </div>
      </section>
    </div>
  );
};

export default WhatIsEzine;
