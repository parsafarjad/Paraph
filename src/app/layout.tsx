import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import { doran, yekan } from "@/shared/config/fonts";
import { AppProviders } from "@/shared/components/app-providers";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "پاراف کلاب",
    template: "%s | پاراف کلاب",
  },
  description:
    "باشگاه مشتریان پاراف؛ امتیازها، سکه‌ها، سطح وفاداری و فعالیت‌های اخیر.",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#dfeaff",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fa" dir="rtl" className={`${yekan.variable} ${doran.variable}`}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
