import { Bowlby_One_SC, DM_Mono } from "next/font/google";
import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Header } from "../components/Header";
import { SVGFilters } from "../components/SVGFilter";
import { Footer } from "../components/Footer";

const bowlbyOne = Bowlby_One_SC({
  variable: "--font-bowlby-sc",
  display: "swap",
  weight: "400",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  display: "swap",
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmMono.variable} ${bowlbyOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mono text-zinc-800">
        <main>
          <Header />
          {children}
          <Footer />
        </main>
        <SVGFilters />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
