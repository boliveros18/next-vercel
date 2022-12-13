import { FC, ReactNode, useState, useEffect } from "react";
import { Qualification } from "../../../interfaces";

import { IconButton, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  children?: ReactNode;
  qualification: Qualification;
}

export const Stars: FC<Props> = ({ qualification }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const stars = Array(5).fill(0);

  useEffect(() => {
    setCurrentValue(Math.round(qualification.current));
  }, [qualification]);

  const handleClick = (value: number) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <Box>
      {stars.map((_, item) => (
        <IconButton
          size="large"
          key={item}
          onClick={() => handleClick(item + 1)}
          onMouseOver={() => handleMouseOver(item + 1)}
          onMouseLeave={handleMouseLeave}
          sx={{
            mr: -2,
            mt: -2,
            mb: -1,
            color:
              hoverValue > item || currentValue > item ? "#FFBA5A" : "#a9a9a9",
          }}
        >
          <StarIcon />
        </IconButton>
      ))}
    </Box>
  );
};
