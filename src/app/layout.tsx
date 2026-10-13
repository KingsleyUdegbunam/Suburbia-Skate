import "./globals.css";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import { Metadata } from "next";

import { SVGFilters } from "../components/SVGFilter";

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

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");
  return {
    title: settings.data.site_title,
    description: settings.data.meta_description,

    openGraph: {
      images: settings.data.fallback_og_image.url ?? undefined,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmMono.variable} ${bowlbyOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mono text-zinc-800">
        <main>{children}</main>
        <SVGFilters />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
