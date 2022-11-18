import { FC, ReactNode } from "react";
import { Grid, Card } from "@nextui-org/react";
import { FavoriteCardPokemons } from "./FavoriteCardPokemon";

interface Props {
  children?: ReactNode;
  pokemons: number[];
}

export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <FavoriteCardPokemons key={id} id={id}/>
      ))}
    </Grid.Container>
  );
};
