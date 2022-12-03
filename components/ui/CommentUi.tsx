import { FC } from "react";
import * as React from "react";

interface Props {
  autor: string;
  comment: any;
}

export const CommentUi: FC<Props> = ({ autor, comment }) => {
  return (
    <div>
      <span style={{ fontSize: 14, fontWeight: "bolder" }}>{autor+' '}</span>
      <span style={{ fontSize: 14 }}>{comment}</span>
    </div>
  );
};
