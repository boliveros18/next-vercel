import { FC, ReactNode, useContext, useState } from "react";
import { CardHeader, Typography, Box, IconButton, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Clinic, Medic } from "../../../interfaces";
import CardActionArea from "@mui/material/CardActionArea";
import { ApiClient } from "../../../apis";
import { AuthContext } from "../../../context/auth";

interface Props {
  children?: ReactNode;
  clinic: Clinic;
  medic: Medic;
}

export const MedicAccountCard: FC<Props> = ({ clinic, medic }) => {
  const { updateUser, user } = useContext(AuthContext);
  const stars = Array(5).fill(0);

  return (
    <CardHeader
      sx={{ mt: -1, mb: -3 }}
      avatar={
        <CardActionArea>
          <label>
            <input
              type="file"
              hidden
              accept="image/png, image/jpeg, image/jpg"
              onChange={async ({ target }) => {
                if (target.files) {
                  try {
                    const file = target.files[0];
                    const formData = new FormData();
                    formData.append("photo", file);
                    const { data } = await ApiClient.post("/image", formData);
                    user?._id
                      ? await updateUser(user?._id, {
                          ...user,
                          photo: data.message,
                        })
                      : null;
                  } catch (error) {
                    console.log({ error });
                  }
                }
              }}
            />
            <Avatar
              alt={user?.name}
              src={user ? user.photo : ""}
              sx={{ width: 100, height: 120, cursor: "pointer" }}
              variant={"rounded"}
            />
          </label>
        </CardActionArea>
      }
      title={
        <>
          <Typography sx={{ fontSize: 15, fontWeight: 400 }}>
            <span style={{ fontWeight: "500" }}>MD.</span>
            {" " + user?.name}
            <br />
            {clinic.name ? clinic.name : "Clinic name"}
            <br />
            {clinic.province
              ? clinic.province + ", " + clinic.country
              : "City, Country"}
            <br />
          </Typography>
          <Box
            sx={{
              ml: -2,
            }}
          >
            {stars.map((_, item) => (
              <IconButton
                disableRipple
                size="large"
                key={item}
                sx={{
                  cursor: "auto",
                  mr: -3,
                  mt: -1,
                  mb: -2,
                  color: medic.qualification > item ? "#FFBA5A" : "#a9a9a9",
                }}
              >
                <StarIcon />
              </IconButton>
            ))}
          </Box>
        </>
      }
    />
  );
};

export default MedicAccountCard;
