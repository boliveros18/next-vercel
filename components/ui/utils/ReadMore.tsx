import { FC, ReactNode, useState } from "react";
import * as React from "react";
import { Typography, Grid } from "@mui/material";

interface Props {
  children?: ReactNode;
  text: any;
}

export const ReadMore: FC<Props> = ({ text }) => {
  const letters: number = 150;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Grid sx={{ fontSize: 13}}>
      {isReadMore && text ? text.slice(0, letters) : text}
      {text && (
        <Typography
          hidden={text.length < letters}
          onClick={toggleReadMore}
          sx={{ color: "rgb(192,192,192)", cursor: "pointer", fontSize: 13 }}
        >
          {isReadMore ? "...more" : " less"}
        </Typography>
      )}
    </Grid>
  );
};
