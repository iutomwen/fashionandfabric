import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryClientProvider } from "@/components/providers/ReactQueryClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://daily-todo-task.vercel.app/"),
  title: {
    template: "%s | Fashion & Fabric Store",
    default: "Fashion & Fabric Store",
  },
  authors: {
    name: "williams",
  },
  description:
    "Build dashboard with role managemanet using next.js and supabase.",
  openGraph: {
    title: "Daily Todo",
    description: "Build dashboard with next.js and supabase ",
    url: "https://daily-todo-task.vercel.app/",
    siteName: "Daily Todo",
    images: "/og.png",
    type: "website",
  },
  keywords: ["daily web coding", "chensokheng", "dailywebcoding"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${jost.className} antialiased dark:bg-[#09090B]`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="">{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
