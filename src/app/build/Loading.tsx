"use client";

import { Logo } from "@/src/components/Logo";
import { useProgress } from "@react-three/drei";
import clsx from "clsx";
import { useEffect } from "react";

export default function Loading() {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress < 100) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    }
  }, [progress]);
  return (
    <div
      className={clsx(
        "absolute inset-0 grid place-content-center bg-brand-navy font-sans text-[15vw] text-white transition-opacity duration-1000",
        progress >= 100 ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <Logo className="w-[15vw] animate-squiggle text-brand-pink" />
      <p className="w-full animate-squiggle content-center text-center leading-none text-brand-lime uppercase">
        loading...
      </p>
    </div>
  );
}
