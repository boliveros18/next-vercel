import { FC, ReactNode, useState } from "react";
import * as React from "react";

interface Props {
  children?: ReactNode;
  text: any;
}

export const ReadMore: FC<Props> = ({ text }) => {
  const letters: number = 25;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <span style={{ fontSize: 14 }}>
      {isReadMore && text ? text.slice(0, letters) : text}
      {text && (
        <span
          hidden={text.length < letters}
          onClick={toggleReadMore}
          style={{ color: "rgb(192,192,192)", cursor: "pointer" }}
        >
          {isReadMore ? "...more" : " less"}
        </span>
      )}
    </span>
  );
};
