import { FC } from "react";
import * as React from "react";

interface Props {
  author: any;
  comment: any;
  link?: any;
  info?: boolean;
}

export const CardDetailUi: FC<Props> = ({ author, comment, link, info }) => {
  return (
    <div style={{ marginBottom: info ? -4 : 0, marginTop: info ? -6 : 0 }}>
      <a
        href={link}
        style={{
          fontSize: 14,
          fontWeight: 500,
          cursor: info ? "pointer" : "auto",
          textDecoration: "none",
          color: "black",
        }}
      >
        {author + " "}
      </a>
      <span style={{ fontSize: 14, textTransform: "lowercase"  }}>{comment}</span>
    </div>
  );
};
