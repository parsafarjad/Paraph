import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils/cn";

type PageContainerProps = ComponentPropsWithoutRef<"div">;

/**
 * Matches the 1680px desktop content frame used by the Paraf Club Figma file.
 * On smaller screens it keeps a safe 16px gutter on each side.
 */
export function PageContainer({ className, ...props }: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-[calc(100%_-_32px)] max-w-[1680px]", className)}
      {...props}
    />
  );
}
