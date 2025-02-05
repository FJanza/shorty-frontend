import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider/Index";
import {Toaster} from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoorty",
  description: "Take control of your links",
  metadataBase: new URL("https://shoorty.com"),
  openGraph: {
    type: "website",
    url: "https://shoorty.com/",
    title: "Shoorty - URLs shorter",
    description: "Shorten and manage your links with Shoorty efficiently.",
    images: ["/screenshoot.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shoorty - Acortador de URLs",
    description: "Shorten and manage your links with Shoorty efficiently.",
    images: ["/screenshoot.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta property="og:image" content="/screenshoot.webp" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#141414] text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
