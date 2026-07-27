// src/shared/config/fonts.ts

import localFont from "next/font/local";

export const yekan = localFont({
  src: [
    {
      path: "../../../public/fonts/yekan/iranyekanwebregularfanum.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/yekan/iranyekanwebboldfanum.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/yekan/iranyekanwebblackfanum.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iranyekan-local",
  display: "swap",
  preload: true,
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

export const doran = localFont({
  src: [
    {
      path: "../../../public/fonts/doran/DoranFaNum-Regular.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/doran/DoranFaNum-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/doran/DoranFaNum-ExtraBold.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-doran-local",
  display: "swap",
  preload: true,
  fallback: ["Tahoma", "Arial", "sans-serif"],
});
