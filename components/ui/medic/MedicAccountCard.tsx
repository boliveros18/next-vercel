import { FC, ReactNode, useContext } from "react";
import { CardHeader, Typography, Box, IconButton, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Clinic, Medic, Image } from "../../../interfaces";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CardActionArea from "@mui/material/CardActionArea";
import { ApiClient } from "../../../apis";
import { AuthContext } from "../../../context/auth";
import { UIContext } from "../../../context/ui";
import { ImageContext } from "../../../context/image";
import { useSnackbar } from "notistack";

interface Props {
  children?: ReactNode;
  clinic: Clinic;
  medic: Medic;
}

export const MedicAccountCard: FC<Props> = ({ clinic, medic }) => {
  const { setProgress } = useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);
  const { image, updateImage, createImage } = useContext(ImageContext);
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
                setProgress(true);
                if (target.files) {
                  try {
                    const file = target.files[0];
                    const formData = new FormData();
                    formData.append("photo", file);
                    formData.append("id", user?._id || "");
                    formData.append("type", "image");
                    const { data } = await ApiClient.post("/upload", formData);
                    if (image._id) {
                      await updateImage(image?._id, {
                        ...(image as Image),
                        ["url"]: data.message,
                      })
                        .then(() => setProgress(false))
                        .then(() =>
                          enqueueSnackbar(
                            "Your photo profile has been updated!",
                            { variant: "success" }
                          )
                        );
                    } else {
                      await createImage({
                        parent_id: user?._id,
                        url: data.message,
                      } as Image)
                        .then(() => setProgress(false))
                        .then(() =>
                          enqueueSnackbar(
                            "Your photo profile has been updated!",
                            { variant: "success" }
                          )
                        );
                    }
                  } catch (error: any) {
                    setProgress(false);
                    enqueueSnackbar("Error, try again!", { variant: "error" });
                    console.log({ error });
                  }
                }
              }}
            />
            <Avatar
              alt={user?.name}
              src={image ? image.url : ""}
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
            {" " + user?.name + " "}
            <CheckCircleIcon
              sx={{
                color: medic?.certified ? "blue" : "lightgray",
                fontSize: "15px",
              }}
            />
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
