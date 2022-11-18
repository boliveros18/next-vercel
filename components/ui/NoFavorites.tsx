import { FC, ReactNode } from "react";
import { Container, Text, Image } from "@nextui-org/react";

interface Props {
  children?: ReactNode;
}

export const NoFavorites: FC<Props> = ({}) => {
  return (
    <Container className="favorites">
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        alt=""
        width={250}
        height={250}
        css={{ opacity: 0.2 }}
      />
      <Text h1>No hay favoritos</Text>
    </Container>
  );
};
