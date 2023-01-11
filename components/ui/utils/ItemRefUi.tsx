import { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children?: ReactNode;
  author: any;
  link: any;
  tag?: boolean;
}

export const ItemRefUi: FC<Props> = ({ author, link, tag, children }) => {
  return (
    <>
      <Link href={link}>
        <a
          style={{
            textDecoration: "none",
            color: tag ? "#001B87" : "black",
            fontWeight: tag ? "" : "500",
          }}
        >
          {author}
        </a>
      </Link>
      <span>{" " + children}</span>
    </>
  );
};
