import Image from "next/image";
import type { PropsWithChildren } from "react";

import { cn } from "@/shared/utils/cn";

interface MainPageBackgroundProps extends PropsWithChildren {
  className?: string;
}

export function MainPageBackground({ children, className }: MainPageBackgroundProps) {
  return (
    <main
      className={cn(
        "relative isolate overflow-hidden bg-[linear-gradient(180deg,#D1EDFA_0%,#D9E7FB_43%,#E5DBFC_100%)]",
        className,
      )}
    >
      <Image
        src="/assets/backgrounds/main-page-vector.png"
        alt=""
        aria-hidden="true"
        width={2301}
        height={1539}
        priority
        sizes="(min-width: 1920px) 2301px, 120vw"
        className="pointer-events-none absolute left-0 top-[-194px] z-0 hidden h-[1540px] w-[2301px] max-w-none select-none object-fill min-[1100px]:block"
      />

      <div className="relative z-10">{children}</div>
    </main>
  );
}
