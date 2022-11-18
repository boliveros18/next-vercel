import { NextPage } from "next";

import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui/NoFavorites";
import { useState, useEffect } from "react";
import { localFavorites } from "../../utils";
import { FavoritePokemons } from "../../components/pokemon/FavoritePokemons";

interface Props {}

const FavoritePage: NextPage<Props> = ({}) => {
  const [favorite, setFavorite] = useState<number[]>([]);

  useEffect(() => {
    setFavorite(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favoritos">
      {favorite.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favorite}/>
      )}
    </Layout>
  );
};

export default FavoritePage;
