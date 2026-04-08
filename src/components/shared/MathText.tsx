"use client";

import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * MathText component that parses string and renders LaTeX for content between $...$ (inline) or $$...$$ (block)
 */
export const MathText: React.FC<MathTextProps> = ({ text, className }) => {
  if (!text) return null;

  // Split text by block math ($$...$$) and inline math ($...$)
  // We use a regex that captures both, prioritized by block math
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const math = part.slice(2, -2);
          return <BlockMath key={index} math={math} />;
        } else if (part.startsWith("$") && part.endsWith("$")) {
          const math = part.slice(1, -1);
          return <InlineMath key={index} math={math} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
