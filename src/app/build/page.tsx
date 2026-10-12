import Link from "next/link";

import { ButtonLink } from "@/src/components/ButtonLink";
import { Heading } from "@/src/components/Heading";
import { Logo } from "@/src/components/Logo";
import { CustomizerControlsProvider } from "./context";
import { createClient } from "@/prismicio";

export default async function page() {
  const client = createClient();
  const customizerSettings = await client.getSingle("board_customizer");
  console.log(customizerSettings.data);
  const { wheels, decks, metals } = customizerSettings.data;

  const defaultWheel = wheels[0];
  const defaultDeck = decks[0];
  const defaultBolt = metals[0];
  const defaultTruck = metals[0];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defaultBolt={defaultBolt}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
      >
        <div className="relative aspect-square lg:aspect-auto shrink-0 lg:grow bg-[#3A414A]">
          <Link href="/" className="absolute left-6 top-6">
            <Logo className="h-12 text-white" />
          </Link>
          <div className="absolute inset-0"></div>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white p-4 md:p-6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm">
            Build your board
          </Heading>

          <div></div>
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
