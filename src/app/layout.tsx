import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";

import { AppProviders } from "@/shared/components/app-providers";

import "@fontsource-variable/vazirmatn";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "پاراف کلاب",
    template: "%s | پاراف کلاب",
  },
  description: "باشگاه مشتریان پاراف؛ امتیازها، سکه‌ها، سطح وفاداری و فعالیت‌های اخیر.",
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
    <html lang="fa" dir="rtl">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
