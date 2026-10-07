import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { ButtonLink } from "./ButtonLink";
import { SkaterScribble } from "../slices/TeamGrid/coomponent/SkaterScribble";
import clsx from "clsx";

type Props = { Skater: Content.SkaterDocument; index: number };
const colors = [
  "text-brand-blue",
  "text-brand-lime",
  "text-brand-orange",
  "text-brand-pink",
];

export function Skater({ Skater, index }: Props) {
  const scribbleColor = colors[index];
  return (
    <div className="group skater relative flex flex-col items-center gap-4">
      <div className="stack-layout overflow-hidden">
        <PrismicNextImage
          field={Skater.data.photo_background}
          alt=""
          width={500}
          imgixParams={{ q: 20 }}
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
        />
        <SkaterScribble className={clsx("relative", scribbleColor)} />
        <PrismicNextImage
          field={Skater.data.photo_foreground}
          alt=""
          width={500}
          className="scale-100 group-hover:scale-110 duration-1000 ease-in-out transform transition-transform"
        />
        <div className="relative h-48 w-full place-self-end bg-linear-to-t from-black via-transparent to-transparent" />
        <h3 className="relative grid place-self-end justify-self-start p-2 text-brand-gray font-sans text-2xl md:text-3xl">
          <span className="mb-[-.3em] block">{Skater.data.first_name}</span>
          <span className="block">{Skater.data.last_name}</span>
        </h3>
      </div>
      <ButtonLink field={Skater.data.customizer_link}>
        Build their board
      </ButtonLink>
    </div>
  );
}
