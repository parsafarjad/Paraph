import type { PropsWithChildren } from "react";
import Image from "next/image";

import { cn } from "@/shared/utils/cn";

interface MainPageBackgroundProps extends PropsWithChildren {
  className?: string;
}

export function MainPageBackground({
  children,
  className,
}: MainPageBackgroundProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(180deg,#D1EDFA_0%,#D7E7FB_38%,#DFE1FC_70%,#E5DBFC_100%)]",
        className,
      )}
    >
      {/* vector texture */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden">
        <Image
          src="/assets/backgrounds/main-page-vector.png"
          alt=""
          aria-hidden="true"
          width={1400}
          height={1078}
          priority
          className="
            h-auto w-[min(88vw,1400px)] max-w-none
            translate-x-[-8%] translate-y-[12%]
            select-none opacity-95 mix-blend-screen
          "
        />
      </div>

      {/* content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}