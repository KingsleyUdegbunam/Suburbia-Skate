import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { JSX } from "react";

type Props = { children: JSX.Element };

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
