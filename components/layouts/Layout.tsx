import { FC, ReactNode } from "react";
import Head from "next/head";
import { HOME_TITLE } from "../../constans";
import { NavBar } from "../ui";


interface Props {
  children?: ReactNode;
  title: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {


  return (
    <div>
      <Head>
        <title>
         {HOME_TITLE + ' - ' + title}
        </title>
        <meta name="author" content="Bresneth Oliveros" />
        <meta name="description" content="Pokemons page information xxxxx" />
        <meta name="keywords" content="xxxxx, pokemons, pokemon, pokedex" />
        <meta
          property="og:title"
          content={`informacion sobre ${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre ${title}`}
        />
        <meta
          property="og:image"
          content={`${ origin }/img/banner.png`}
        />
      </Head>
      <NavBar />
      <main className="padding-right">{children}</main>
    </div>
  );
};
