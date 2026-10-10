import { FC } from "react";
import { asImageSrc, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import { Bounded } from "@/src/components/Bounded";
import { Heading } from "@/src/components/Heading";
import { ButtonLink } from "@/src/components/ButtonLink";
import { WideLogo } from "./components/WideLogo";
import { TallLogo } from "./components/TallLogo";
import { InteractiveSkateboard } from "./components/InteractiveSkateboard";

const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_TRUCK_COLOR = "#6f6e6a";
const DEFAULT_BOLT_COLOR = "#6f6e6a";
/**
 * Props for `HeroSection`.
 */
export type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

/**
 * Component for "HeroSection" Slices.
 */
const HeroSection: FC<HeroSectionProps> = ({ slice }) => {
  const deckTextureURL =
    asImageSrc(slice.primary.skateboard_deck_texture) ?? DEFAULT_DECK_TEXTURE;
  const wheelTextureURL =
    asImageSrc(slice.primary.skateboard_wheel_texture) ?? DEFAULT_WHEEL_TEXTURE;
  const truckColor =
    slice.primary.skateboard_truck_color ?? DEFAULT_TRUCK_COLOR;
  const boltColor = slice.primary.skateboard_bolt_color ?? DEFAULT_BOLT_COLOR;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative h-dvh overflow-hidden bg-texture"
    >
      <div className="absolute inset-0 flex items-center justify-center pt-20">
        <WideLogo className="w-full text-brand-purple hidden lg:block opacity-20 mix-blend-multiply" />
        <TallLogo className="w-full text-brand-purple lg:hidden opacity-20 mix-blend-multiply" />
      </div>
      <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr_auto] place-items-end px-6 py-10 md:py-13 lg:py-16">
        <Heading size="lg" className="place-self-start max-w-2xl ">
          <PrismicText field={slice.primary.header} />
        </Heading>
        <div className="relative flex flex-col gap-2 md:gap-2.5 lg:gap-4 lg:flex-row lg:justify-between items-center justify-center justify w-full">
          <div className="max-w-[45ch] font-semibold">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            field={slice.primary.button}
            icon="skateboard"
            size="lg"
            className="z-20 mt-2 block"
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>

      <InteractiveSkateboard
        deckTextureURL={deckTextureURL}
        wheelTextureURL={wheelTextureURL}
        truckColor={truckColor}
        boltColor={boltColor}
      />
    </Bounded>
  );
};

export default HeroSection;
