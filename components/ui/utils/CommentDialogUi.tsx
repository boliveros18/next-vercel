import { FC, ReactNode, ChangeEventHandler, MouseEventHandler } from 'react';
import { IconButton, Grid, Box, Typography } from "@mui/material";
import { CommentForm, StyledInputComment } from "../styled/CommentForm";

interface Props {
  children?: ReactNode;
  handleInput: ChangeEventHandler;
  handleSubmit: MouseEventHandler;
  onCancel: boolean;
  value: string;
  handleClose: any;
}

export const CommentDialogUi: FC<Props> = ({
  handleInput,
  handleSubmit,
  onCancel,
  value,
  handleClose
}) => {
  return (
    <Grid container sx={{ mb: 1 }}>
      <Grid item xs={12} sm={12} md={12}>
        <CommentForm style={{ color: "black", borderRadius: "3px" }}>
          <StyledInputComment
            style={{ width: "100%", fontSize: 15 }}
            value={value}
            type="text"
            name="description"
            inputProps={{ "aria-label": "comment" }}
            inputRef={(input: any) => onCancel && input?.focus()}
            onChange={handleInput}
            autoComplete="off"
          />
        </CommentForm>
      </Grid>
      <Grid item xs={2} sm={2} md={2}></Grid>
      <Box sx={{ flexGrow: 1 }} />
      <Grid item xs={2} sm={2} md={1} sx={{ mr: 2 }}>
        <IconButton
          aria-label="settings"
          style={{
            color: "black",
          }}
          onClick={handleClose}
        >
          <Typography
            sx={{ fontSize: 15, textTransform: "capitalize" }}
            variant="subtitle2"
          >
            Cancel
          </Typography>
        </IconButton>
      </Grid>
      <Grid item xs={2} sm={2} md={1} sx={{ mr: 2 }}>
        <IconButton
          aria-label="settings"
          style={{
            color: "black",
          }}
          onClick={handleSubmit}
        >
          <Typography
            sx={{ fontSize: 15, textTransform: "capitalize" }}
            variant="subtitle2"
          >
            Post
          </Typography>
        </IconButton>
      </Grid>
    </Grid>
  );
};
