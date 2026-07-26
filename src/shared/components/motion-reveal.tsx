"use client";

import { m, useReducedMotion } from "motion/react";
import type { PropsWithChildren } from "react";

import { cn } from "@/shared/utils/cn";

type MotionRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  distance?: number;
}>;

export function MotionReveal({
  children,
  className,
  delay = 0,
  distance = 18,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
