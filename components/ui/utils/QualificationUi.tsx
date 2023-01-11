import { FC, ReactNode, useState } from "react";
import { Typography, Box, Grid, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  children?: ReactNode;
  average: number;
  length: number;
  currentValue: number;
  handleClick: any;
}

export const QualificationUi: FC<Props> = ({
  average,
  length,
  currentValue,
  handleClick,
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const stars = Array(5).fill(0);

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <>
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
                hoverValue > item || currentValue > item
                  ? "#FFBA5A"
                  : "#a9a9a9",
            }}
          >
            <StarIcon />
          </IconButton>
        ))}
      </Box>
      <Grid container spacing={1}>
        <Box sx={{ flexGrow: 1 }} />
        <Grid item>
          <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
            {average > 3 ? "Excellent(" : "Good("}
            {length + " qualifications) | "}
          </Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              width: 35,
              height: 20,
              borderRadius: "3px",
              backgroundColor: "green",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                color: "white",
                fontWeight: "500",
                ml: "5px",
              }}
            >
              {average}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
