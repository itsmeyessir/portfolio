"use client";
import React, { useEffect, useRef } from "react";

const BASE_CONFIG = {
  src: "https://giscus.app/client.js",
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO || "",
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "",
  category: "Announcements",
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "",
  mapping: "pathname" as const,
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom" as const,
  lang: "en",
};

export function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (!BASE_CONFIG.repo) return;

    const themeUrl = `${window.location.origin}/giscus-theme.css`;

    const script = document.createElement("script");
    script.src = BASE_CONFIG.src;
    script.setAttribute("data-repo", BASE_CONFIG.repo);
    script.setAttribute("data-repo-id", BASE_CONFIG.repoId);
    script.setAttribute("data-category", BASE_CONFIG.category);
    script.setAttribute("data-category-id", BASE_CONFIG.categoryId);
    script.setAttribute("data-mapping", BASE_CONFIG.mapping);
    script.setAttribute("data-strict", BASE_CONFIG.strict);
    script.setAttribute("data-reactions-enabled", BASE_CONFIG.reactionsEnabled);
    script.setAttribute("data-emit-metadata", BASE_CONFIG.emitMetadata);
    script.setAttribute("data-input-position", BASE_CONFIG.inputPosition);
    script.setAttribute("data-theme", themeUrl);
    script.setAttribute("data-lang", BASE_CONFIG.lang);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    if (ref.current) {
      ref.current.appendChild(script);
      initialized.current = true;
    }

    return () => {
      if (ref.current) ref.current.innerHTML = "";
      initialized.current = false;
    };
  }, []);

  if (!BASE_CONFIG.repo) {
    return (
      <div className="border border-neutral-800 rounded-xl p-6 text-center">
        <p className="text-sm font-mono text-neutral-500 uppercase tracking-wider">
          Comments disabled — configure <code className="text-neutral-300">NEXT_PUBLIC_GISCUS_REPO</code> to enable.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 pt-16 border-t border-neutral-800">
      <h2 className="text-lg font-mono uppercase tracking-wider text-white mb-8">
        Discussion
      </h2>
      <div ref={ref} />
    </div>
  );
}
