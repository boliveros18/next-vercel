import { FC, ReactNode, useState, MouseEvent } from "react";
import { Popover, IconButton, Grid } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import { LINK_PAGE, hashtag } from "../../../constans";

interface Props {
  children?: ReactNode;
}

export const EditCommentUi: FC<Props> = ({}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-label="edit"
        style={{
          color: "black",
        }}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ fontSize: "22px", mt: -1 }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Grid container>
          <Grid item sx={{ m: 1 }}>
            <FacebookShareButton
              url={LINK_PAGE}
              hashtag={hashtag}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <FacebookMessengerShareButton url={LINK_PAGE} appId={""}>
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <WhatsappShareButton
              url={LINK_PAGE}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <TwitterShareButton
              url={LINK_PAGE}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </Grid>
          <Grid item sx={{ m: 1 }}>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};
