import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "./globals.css";
import { TooltipProvider } from '@/components/animate-ui/components/animate/tooltip';
import BackTop from '@/components/BackTop'; // 回到顶部
import DockCard from '@/components/DockCard';
import FullLoading from '@/components/FullLoading'; // 全局 Loading
import ScrollProgress from '@/components/ScrollProgress';
import { THEME_MODE } from "@/enums";
import pkg from "#/package.json";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NAME,
  description: process.env.NEXT_PUBLIC_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 插入版本 meta */}
        <meta name="version" content={pkg.version} />
        <link rel="stylesheet" href="https://cdn.baiwumm.com/fonts/MapleMono-CN-Regular/result.css" />
      </head>
      <body>
        <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME || THEME_MODE.LIGHT}>
          <TooltipProvider>
            {children}
            <DockCard />
            <FullLoading />
            <BackTop />
            <ScrollProgress />
          </TooltipProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
