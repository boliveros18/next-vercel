import { FC, ReactNode, useState, useEffect, useContext } from "react";
import { ClinicContext } from "../../../context/clinic/ClinicContext";

import { IconButton, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { AuthContext } from "../../../context/auth";

interface Props {
  children?: ReactNode;
}

export const Stars: FC<Props> = ({}) => {
  const { clinics } = useContext(ClinicContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const stars = Array(5).fill(0);
  const countStars =
    clinics[0].qualification
      .map((item) => item.stars)
      .reduce((previous, current) => previous + current) /
    clinics[0].qualification.length;

  useEffect(() => {
    setCurrentValue(Math.round(countStars));
  }, [countStars]);

  const handleClick = (value: number) => {
    isLoggedIn ? setCurrentValue(value) : null;
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
