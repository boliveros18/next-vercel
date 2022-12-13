import { FC } from "react";
import * as React from "react";

interface Props {
  author: string;
  comment: any;
}

export const CardDetailUi: FC<Props> = ({ author, comment }) => {
  return (
    <div>
      <span style={{ fontSize: 14, fontWeight: "500" }}>{author + " "}</span>
      <span style={{ fontSize: 14 }}>{comment}</span>
    </div>
  );
};
