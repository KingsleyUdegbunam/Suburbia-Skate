import Link from "next/link";
import { asImageSrc } from "@prismicio/client";
import { createClient } from "@/prismicio";

import { ButtonLink } from "@/src/components/ButtonLink";
import { Heading } from "@/src/components/Heading";
import { Logo } from "@/src/components/Logo";
import { CustomizerControlsProvider } from "./context";
import Preview from "./Preview";
import Controls from "./Controls";

export type SearchParams = {
  wheel?: string;
  deck?: string;
  truck?: string;
  bolt?: string;
};

export default async function page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const client = createClient();
  const customizerSettings = await client.getSingle("board_customizer");
  const { wheels, decks, metals } = customizerSettings.data;

  const defaultWheel =
    wheels.find((wheel) => wheel.uid === searchParams.wheel) ?? wheels[0];
  const defaultDeck =
    decks.find((deck) => deck.uid === searchParams.deck) ?? decks[0];
  const defaultBolt =
    metals.find((bolt) => bolt.uid === searchParams.bolt) ?? metals[0];
  const defaultTruck =
    metals.find((truck) => truck.uid === searchParams.truck) ?? metals[0];

  const wheelTextureURLs = wheels
    .map((wheel) => asImageSrc(wheel.texture))
    .filter((url): url is string => Boolean(url));

  const deckTextureURLs = decks
    .map((deck) => asImageSrc(deck.texture))
    .filter((url): url is string => Boolean(url));

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defaultBolt={defaultBolt}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
      >
        <div className="relative aspect-square lg:aspect-auto shrink-0 lg:grow bg-[#3A414A]">
          <Link href="/" className="absolute z-10 left-6 top-6">
            <Logo className="h-12 text-white" />
          </Link>
          <div className="absolute inset-0">
            <Preview
              deckTextureURLs={deckTextureURLs}
              wheelTextureURLs={wheelTextureURLs}
            />
          </div>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white p-4 md:p-6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm">
            Build your board
          </Heading>

          <Controls
            decks={decks}
            metals={metals}
            wheels={wheels}
            className="mb-6"
          />
          <div>
            <ButtonLink href="/" color="lime" icon="plus">
              Add to Cart
            </ButtonLink>
          </div>
        </div>
      </CustomizerControlsProvider>
    </div>
  );
}
