"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const LINES = [
  "> INITIALIZING_TERMINAL...",
  "> ESTABLISHING_SECURE_CONNECTION...",
  "> CONNECTION_ESTABLISHED (192.168.0.23:443)",
  "> BYPASSING_LOCAL_FIREWALL...",
  `> ACCESSING_HOST_SYSTEM... ${String.fromCharCode(0x2713)}`,
  "> DECRYPTING_PAYLOAD...",
  "> INJECTING_SEQUENCE...",
  "",
  "> ⚠️  WARNING: UNAUTHORIZED_ACCESS_DETECTED",
  "> ⚠️  TRACING_ORIGIN...",
  "> ⚠️  ORIGIN_IDENTIFIED:",
  ">    LAT:  14.5995° N",
  ">    LONG: 120.9842° E",
  ">    LOC:  MANILA, PH",
  "",
  "> JUST KIDDING.",
    `> IT'S JUST A PORTFOLIO. :)`,
];

export function TerminalPrankPage() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;
    const delay = LINES[visibleLines] === "" ? 300 : 40 + Math.random() * 60;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [visibleLines]);

  const done = visibleLines >= LINES.length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl font-mono text-sm sm:text-base leading-relaxed text-neutral-300 select-none">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`${line.startsWith("> ⚠️") ? "text-red-400/80" : ""} ${line === "> JUST KIDDING." || line.startsWith("> IT'S JUST") ? "text-neutral-500" : ""}`}
          >
            {line}
            {i === visibleLines - 1 && !done && (
              <span className="inline-block w-2 h-4 bg-neutral-400 ml-1 animate-pulse" />
            )}
          </div>
        ))}
        {done && (
          <div className="mt-10">
            <Link
              href="/"
              className="text-sm font-mono text-neutral-500 hover:text-white transition-colors"
            >
              -&gt; RETURN TO BASE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
