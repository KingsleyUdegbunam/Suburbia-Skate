import Link from "next/link";
import React from "react";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="header absolute left-0 right-0 top-0 z-50 px-4 md:px-5 py-4 md:py-5 lg:py-6 h-32 md:h-40 lg:h-48">
      <div className="mx-auto w-full max-w-6xl grid gap-6 items-center grid-cols-[auto_auto] md:grid-cols-[1fr_auto_1fr]">
        <Link className="justify-self-start" href="/">
          <Logo className="h-12 md:h-16 lg:h-20 text-brand-purple" />
        </Link>
        <nav
          aria-label="Main"
          className="col-span-full flex items-center justify-center row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
        >
          <ul className="list-none flex items-center gap-8">
            {settings.data.navigation.map((item) => (
              <li key={item.link.text} className="text-lg md:text-xl">
                <PrismicNextLink field={item.link} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="justify-self-end">
          <ButtonLink href="" icon="cart" color="purple" aria-label="Cart (1)">
            <span className="hidden md:inline">Cart (1)</span>
            <span className="md:hidden">1</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
