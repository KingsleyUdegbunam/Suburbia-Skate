"use client";

import { useLayoutEffect, useState } from "react";

export function useIsSafari(defaultValue = false) {
  const [isSafari, setIsSafari] = useState(defaultValue);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSafari(
      typeof window === "undefined"
        ? false
        : window.navigator.userAgent.includes("Safari") &&
            !window.navigator.userAgent.includes("Chrom"), // "Chrome" or "Chromium",
    );
  }, []);

  return isSafari;
}
