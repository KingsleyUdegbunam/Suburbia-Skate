import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `HeroSection`.
 */
export type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

/**
 * Component for "HeroSection" Slices.
 */
const HeroSection: FC<HeroSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <PrismicRichText field={slice.primary.header} />
        <PrismicRichText field={slice.primary.body} />
        <PrismicNextLink field={slice.primary.button} />
      </div>
    </section>
  );
};

export default HeroSection;
