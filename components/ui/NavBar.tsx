import { FC, ReactNode } from "react";
import { Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

export const NavBar: FC<Props> = ({}) => {
  const { theme } = useTheme();

  return (
    <div
      className="nav-bar"
      style={{
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/132.png"
        alt="image pokemon"
        width={70}
        height={70}
        priority
      />
      <Text color="white" h2>
        P
      </Text>
      <Link href="/">
        <a>
          <Text color="white" weight="bold" h3>
            ókemon
          </Text>
        </a>
      </Link>
      <Spacer css={{ flex: 1 }} />
      <Link href="/favorites">
        <a>
          <Text color="white" h5 weight="bold"   style={{
        backgroundColor: theme?.colors.gray900.value,
      }}>
            Favoritos
          </Text>
        </a>
      </Link>
    </div>
  );
};
