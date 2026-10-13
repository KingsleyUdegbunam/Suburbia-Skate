"use client";

import { Heading } from "@/src/components/Heading";
import {
  ColorField,
  Content,
  ImageField,
  KeyTextField,
} from "@prismicio/client";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { useCustomizerControls } from "./context";

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  "wheels" | "decks" | "metals"
> & { className?: string };

export default function Controls({ wheels, decks, metals, className }: Props) {
  const {
    setSelectedBolt,
    setSelectedDeck,
    setSelectedTruck,
    setSelectedWheel,
    selectedBolt,
    selectedDeck,
    selectedTruck,
    selectedWheel,
  } = useCustomizerControls();

  return (
    <div className={clsx("flex flex-col gap-6", className)}>
      <Options title="Decks" selectedName={selectedDeck?.uid}>
        {decks.map((deck) => {
          if (!deck) return;

          return (
            <Option
              key={deck.uid}
              imageField={deck.texture}
              imgixParams={{
                rect: [30, 1550, 1000, 1000],
                height: 150,
                width: 150,
              }}
              selected={selectedDeck?.uid === deck.uid}
              onClick={() => {
                setSelectedDeck(deck);
              }}
            >
              {selectedDeck?.uid?.replace(/-/g, " ")}
            </Option>
          );
        })}
      </Options>

      <Options title="Wheels" selectedName={selectedWheel?.uid}>
        {wheels.map((wheel) => {
          if (!wheel) return;

          return (
            <Option
              key={wheel.uid}
              imageField={wheel.texture}
              imgixParams={{
                rect: [0, 0, 900, 900],
                height: 150,
                width: 150,
              }}
              selected={selectedWheel?.uid === wheel.uid}
              onClick={() => {
                setSelectedWheel(wheel);
              }}
            >
              {selectedDeck?.uid?.replace(/-/g, " ")}
            </Option>
          );
        })}
      </Options>

      <Options title="Trucks" selectedName={selectedTruck?.uid}>
        {metals.map((truck) => {
          if (!truck) return;

          return (
            <Option
              key={truck.uid}
              colorField={truck.color}
              selected={selectedTruck?.uid === truck.uid}
              onClick={() => {
                setSelectedTruck(truck);
              }}
            >
              {selectedDeck?.uid?.replace(/-/g, " ")}
            </Option>
          );
        })}
      </Options>

      <Options title="Bolts" selectedName={selectedBolt?.uid}>
        {metals.map((bolt) => {
          if (!bolt) return;

          return (
            <Option
              key={bolt.uid}
              colorField={bolt.color}
              selected={selectedBolt?.uid === bolt.uid}
              onClick={() => {
                setSelectedBolt(bolt);
              }}
            >
              {selectedDeck?.uid?.replace(/-/g, " ")}
            </Option>
          );
        })}
      </Options>
    </div>
  );
}

type OptionsProps = {
  title?: ReactNode;
  selectedName?: KeyTextField;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  const selectedOption = selectedName?.replace(/-/g, " ");

  return (
    <div>
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-300 capitalize">
          <span className="select-none text-zinc-500">| </span>
          {selectedOption}
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
} & (
    | {
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps["imgixParams"];
        colorField?: never;
      }
    | { colorField: ColorField; imageField?: never; imgixParams?: never }
  );

function Option({
  children,
  selected,
  imageField,
  imgixParams,
  colorField,
  onClick,
}: OptionProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-0.5  outline-white",
          selected && "outline-2",
        )}
      >
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            imgixParams={imgixParams}
            className="pointer-events-none size-full rounded-full"
            alt=""
          />
        ) : (
          <div
            className="size-full rounded-full"
            style={{ backgroundColor: colorField ?? undefined }}
          />
        )}
        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}
