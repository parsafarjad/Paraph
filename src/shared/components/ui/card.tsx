import type { HTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-white/70 bg-white/95 shadow-[0_12px_45px_rgba(71,85,105,0.10)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
