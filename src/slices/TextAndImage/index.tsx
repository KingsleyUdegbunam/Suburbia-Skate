import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import { Bounded } from "@/src/components/Bounded";
import { Heading } from "@/src/components/Heading";
import clsx from "clsx";
import { ButtonLink } from "@/src/components/ButtonLink";
import { ParallaxImage } from "./components/ParallaxImage";

declare module "react" {
  interface CSSProperties {
    "--index"?: number;
  }
}
/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage: FC<TextAndImageProps> = ({ slice, index }) => {
  const THEME = slice.primary.theme;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        THEME === "Blue" && "bg-brand-blue text-white/90",
        THEME === "Orange" && "bg-brand-orange text-white/90",
        THEME === "Navy" && "bg-brand-navy text-white/90",
        THEME === "Lime" && "bg-brand-lime",
        "bg-texture overflow-hidden sticky top-[calc(var(--index)*3rem)]",
      )}
      style={{ "--index": index }}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center text-center gap-8 md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "order-2",
          )}
        >
          <Heading as="h2">
            <PrismicText field={slice.primary.heading} />
          </Heading>

          <div className="max-w-md leading-relaxed text-lg">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <ButtonLink
            field={slice.primary.button}
            color={THEME === "Lime" ? "orange" : "lime"}
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>

        <ParallaxImage
          foregroundImage={slice.primary.foreground_image}
          backgroundImage={slice.primary.background_image}
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;
