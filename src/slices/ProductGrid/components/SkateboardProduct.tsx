import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { formatUSD } from "./FormatUSD";
import { FaStar } from "react-icons/fa6";
import { ButtonLink } from "@/src/components/ButtonLink";
import { HorizontalLine, VerticalLine } from "@/src/components/Line";
import clsx from "clsx";
import { Scribble } from "./Scribble";

async function getDominantColor(url: string) {
  const paletteURL = new URL(url);
  paletteURL.searchParams.set("palette", "json");

  const res = await fetch(paletteURL);
  if (!res.ok) return undefined;

  const json = await res.json();
  const colors = json.dominant_colors;

  return colors?.vibrant?.hex ?? colors?.vibrant_light?.hex;
}

type Props = { id: string };
const VERTICAL_LINE_CLASSES =
  "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";
const HORIZONTAL_LINE_CLASSES =
  "-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400 ";
export async function SkateboardProduct({ id }: Props) {
  const client = createClient();
  const product = await client.getByID<Content.SkateboardDocument>(id);
  const price = isFilled.number(product.data.price_cents)
    ? formatUSD(product.data.price_cents)
    : "Price not available";

  const dominantColor = isFilled.image(product.data.image)
    ? await getDominantColor(product.data.image.url)
    : undefined;

  return (
    <div className="relative group mx-auto w-full max-w-72 px-8 pt-4">
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")} />
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")} />
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

      <div className="flex items-center justify-between text-sm md:text-xl lg:text-2xl">
        <span>{price}</span>
        <span className="inline-flex gap-1">
          <FaStar className="text-yellow-400" /> 37
        </span>
      </div>
      <div className="-mb-1 overflow-hidden py-4">
        <Scribble className="absolute inset-[-10]" color={dominantColor} />
        <PrismicNextImage
          alt=""
          width={150}
          field={product.data.image}
          className="mx-auto w-[58%] origin-top transform-gpu transition-transform group-hover:scale-150 duration-500 ease-in-out"
        />
      </div>
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />
      <h3 className="my-2 font-sans text-center leading-tight text-lg md:text-xl">
        {product.data.name}
      </h3>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ButtonLink field={product.data.customizer_link}>Customize</ButtonLink>
      </div>
    </div>
  );
}
