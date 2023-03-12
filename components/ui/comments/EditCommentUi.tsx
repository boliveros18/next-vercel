import {
  FC,
  ReactNode,
  useState,
  MouseEvent,
  useContext,
  ChangeEvent,
} from "react";
import {
  Popover,
  IconButton,
  MenuList,
  MenuItem,
  ListItemText,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Comment } from "../../../interfaces";
import { CommentContext } from "../../../context/comment";
import { CommentForm, StyledInputComment } from "../styled/CommentForm";
import { UseWindowSize } from "../../../utils";

interface Props {
  children?: ReactNode;
  item: Comment;
}

export const EditCommentUi: FC<Props> = ({ item }) => {
  const mobile = UseWindowSize();
  const [value, setValue] = useState(item.description);
  const [open, setOpen] = useState(false);
  const { updateComment, deleteComment, getCommentsByParentId } = useContext(CommentContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [inputs, setInputs] = useState({});

  const handleClickPop = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenDialog = () => {
    setValue(item.description);
    setOpen(true);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setInputs("");
    setValue("");
  };

  const editComment = () => {
    item.description = value;
    updateComment(item._id, item);
    setInputs("");
    setValue("");
    setAnchorEl(null);
    setOpen(false);
  };

  const suppressComment = () => {
    deleteComment(item._id);
    getCommentsByParentId(item.parent_id)
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValue(target.value);
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;

  return (
    <div style={{ marginTop: -8 }}>
      <IconButton
        aria-label="edit"
        style={{
          color: "black",
        }}
        onClick={handleClickPop}
      >
        <MoreVertIcon sx={{ fontSize: "22px" }} />
      </IconButton>
      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuList
          dense
          sx={{ width: 100, bgcolor: "background.paper", textAlign: "center" }}
        >
          <MenuItem>
            <ListItemText onClick={handleOpenDialog}>Edit</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText onClick={suppressComment}>Delete</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Report</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth={mobile}
        sx={{ ml: -4, mr: -4 }}
      >
        <DialogContent sx={{ mt: 1 }}>
          <CommentForm
            style={{
              color: "black",
              width: mobile ? 305 : 500,
              borderRadius: "3px",
            }}
          >
            <StyledInputComment
              style={{ width: mobile ? 305 : 500, fontSize: 14 }}
              value={value}
              type="text"
              name="description"
              inputProps={{ "aria-label": "comment" }}
              onChange={handleInput}
            />
          </CommentForm>
          <IconButton
            aria-label="settings"
            style={{
              color: "black",
            }}
            onClick={editComment}
          >
            <Typography
              sx={{ fontSize: 14, textTransform: "capitalize" }}
              variant="subtitle2"
            >
              Post
            </Typography>
          </IconButton>
          <IconButton
            aria-label="settings"
            style={{
              color: "black",
            }}
            onClick={handleCloseDialog}
          >
            <Typography
              sx={{ fontSize: 14, textTransform: "capitalize" }}
              variant="subtitle2"
            >
              Cancel
            </Typography>
          </IconButton>
        </DialogContent>
      </Dialog>
    </div>
  );
};
