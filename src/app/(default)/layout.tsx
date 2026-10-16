import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
