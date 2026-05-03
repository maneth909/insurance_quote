import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WECARE Insurance Broker",
  description: "Get a home and content insurance quote from WECARE Insurance Broker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans antialiased text-neutral-900 dark:text-neutral-50 flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>
          <footer className="py-6 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
              &copy; {new Date().getFullYear()} WECARE Insurance Broker. All rights reserved.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
