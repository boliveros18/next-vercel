import {
  FC,
  useState,
  MouseEvent,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Popover,
  IconButton,
  MenuList,
  MenuItem,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Comment } from "../../../interfaces";
import { CommentContext } from "../../../context/comment";

interface Props {
  item: Comment;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditCommentUi: FC<Props> = ({ item, setOpen }) => {
  const { deleteComment, getCommentsByParentId } = useContext(CommentContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickPop = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const suppressComment = () => {
    deleteComment(item._id);
    getCommentsByParentId(item.parent_id);
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
            <ListItemText
              onClick={() => {
                setOpen(true);
                setAnchorEl(null);
              }}
            >
              Edit
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText
              onClick={() => {
                suppressComment();
                setAnchorEl(null);
              }}
            >
              Delete
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Report</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
};
