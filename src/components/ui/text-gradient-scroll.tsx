"use client";

import React, { createContext, useContext, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type TextOpacityEnum = "none" | "soft" | "medium";
type ViewTypeEnum = "word" | "letter";

type TextGradientScrollType = {
  text: string;
  type?: ViewTypeEnum;
  className?: string;
  textOpacity?: TextOpacityEnum;
};

type LetterType = {
  children: React.ReactNode | string;
  progress: MotionValue<number>;
  range: number[];
};

type WordType = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
};

type CharType = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
};

type TextGradientScrollContextType = {
  textOpacity?: TextOpacityEnum;
  type?: ViewTypeEnum;
};

const TextGradientScrollContext = createContext<TextGradientScrollContextType>({});

function useGradientScroll() {
  return useContext(TextGradientScrollContext);
}

function TextGradientScroll({
  text,
  className,
  type = "letter",
  textOpacity = "soft",
}: TextGradientScrollType) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const words = text.split(" ");

  return (
    <TextGradientScrollContext.Provider value={{ textOpacity, type }}>
      <p
        ref={ref}
        className={cn(
          "relative flex flex-wrap m-0",
          className
        )}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return type === "word" ? (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          ) : (
            <Letter key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Letter>
          );
        })}
      </p>
    </TextGradientScrollContext.Provider>
  );
}

export { TextGradientScroll };

const Word = ({ children, progress, range }: WordType) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity } = useGradientScroll();

  return (
    <span className="relative me-1.5 mt-1.5">
      <span
        className={cn(
          textOpacity === "none" && "opacity-100",
          textOpacity === "soft" && "opacity-20",
          textOpacity === "medium" && "opacity-40"
        )}
      >
        {children}
      </span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {children}
      </motion.span>
    </span>
  );
};

const Letter = ({ children, progress, range }: LetterType) => {
  if (typeof children !== "string") return null;
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="relative me-1.5 mt-1.5">
      {children.split("").map((char: string, i: number) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={`${char}-${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({ children, progress, range }: CharType) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity } = useGradientScroll();

  return (
    <span className="relative">
      <span
        className={cn(
          textOpacity === "none" && "opacity-100",
          textOpacity === "soft" && "opacity-20",
          textOpacity === "medium" && "opacity-40"
        )}
      >
        {children}
      </span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {children}
      </motion.span>
    </span>
  );
};
