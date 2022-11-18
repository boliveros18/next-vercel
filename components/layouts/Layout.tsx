import { FC, ReactNode } from "react";
import Head from "next/head";
import { HOME_TITLE } from "../../constans";
import { NavBar } from "../ui";

interface Props {
  children?: ReactNode;
  title: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{HOME_TITLE} - {title}</title>
        <meta name="author" content="Bresneth Oliveros" />
        <meta name="description" content="Pokemons page information xxxxx" />
        <meta name="keywords" content="xxxxx, pokemons, pokemon, pokedex" />
      </Head>
      <NavBar />
      <main className="padding-right">{children}</main>
    </div>
  );
};
