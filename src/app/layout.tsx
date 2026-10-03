import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
