import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { asImageSrc } from "@prismicio/client";

import { Logo } from "./Logo";
import { Bounded } from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";

export async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const boardTextureURLs = settings.data.footer_skateboard
    .map((item) => asImageSrc(item.skateboard, { h: 600 }))
    .filter((url): url is string => Boolean(url));
  return (
    <div className="bg-texture text-white bg-zinc-900 overflow-hidden">
      <div className="relative h-[75dvh] p-10 md:p-14 lg:p-16 md:aspect-auto">
        {/* Image */}
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          fill
          className="object-cover"
        />
        <Logo className="relative pointer-events-none h-20 md:h-28 mix-blend-exclusion" />

        <FooterPhysics
          className="absolute inset-0"
          boardTextureURLs={boardTextureURLs}
        />
      </div>
      <Bounded as="nav">
        <ul className="flex flex-wrap gap-8 text-lg md:text-xl justify-center">
          {settings.data.navigation.map((link) => (
            <li key={link.link.text} className="hover:underline">
              <PrismicNextLink field={link.link} />
            </li>
          ))}
        </ul>
      </Bounded>
    </div>
  );
}
