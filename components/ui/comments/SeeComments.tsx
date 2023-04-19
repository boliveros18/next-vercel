import {
  FC,
  useContext,
  ReactNode,
  useState,
  FormEvent,
  ChangeEvent,
  useEffect
} from "react";
import * as React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  IconButton,
  Box,
  Toolbar,
} from "@mui/material";
import { AuthContext } from "../../../context/auth";
import { CommentContext } from "../../../context/comment";
import { UIContext } from "../../../context/ui";
import { WindowSize } from "../../../utils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { CommentUi } from "./CommentUi";
import { Comment } from "../../../interfaces";
import { pluralize } from "../../../utils/strings";
import { CommentDialogUi } from "../utils/CommentDialogUi";
import { ImageContext } from "../../../context/image";
import { LikeContext } from "../../../context/like";

interface Props {
  children?: ReactNode;
  parent_id: string;
  type: string;
  initialAnswers: number;
}

export const SeeComments: FC<Props> = ({
  children,
  parent_id,
  type,
  initialAnswers,
}) => {
  const [value, setValue] = useState("");
  const { image } = useContext(ImageContext);
  const { onFocus, setOnFocus } = useContext(UIContext);
  const { createComment, getCommentsByParentId, commentsByParentId, comments } =
    useContext(CommentContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const height = WindowSize().height;
  const [toogle, setToogle] = useState(true);
  const [inputs, setInputs] = useState({});
  const {
    getLikesByParentId, likes
  } = useContext(LikeContext);

  const openComments = () => {
    setToogle(!toogle);
  };

  useEffect(() => {
    comments.map( (comment) => {
        getLikesByParentId(comment._id)
    })
  }, [comments, getLikesByParentId])
  

  const answers: any = (comments: Comment[], parent_id: string) => {
    return commentsByParentId(comments, parent_id).length === 0
      ? initialAnswers
      : commentsByParentId(comments, parent_id).length;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createComment({
      ...inputs,
      type: type,
      parent_id: parent_id,
      user_id: user?._id,
    } as Comment).then(() => {
      setInputs("");
      setValue("");
      getCommentsByParentId(parent_id);
    });
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValue(target.value);
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  const OnFocus = () => {
    setOnFocus(false);
  };

  return (
    <>
      {toogle && children}
      {answers(comments, parent_id) ? (
        <Accordion elevation={0} disableGutters={true}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => {
              getCommentsByParentId(parent_id);
            }}
          >
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: "500",
                width: "100%",
                height: "100%",
                mt: -1.5,
              }}
              onClick={openComments}
            >
              {!toogle ? (
                <IconButton
                  aria-label="back"
                  sx={{
                    color: "black",
                    paddingLeft: 2,
                  }}
                  onClick={openComments}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              ) : (
                "See " +
                answers(comments, parent_id) +
                pluralize(" comment", answers(comments, parent_id))
              )}
            </Typography>
          </AccordionSummary>
          <Box sx={{ height: height - 240, overflow: "auto" }}>
            <AccordionDetails sx={{ marginBottom: -8, marginTop: -2 }}>
              <CommentUi parent_id={parent_id} />
            </AccordionDetails>
          </Box>
        </Accordion>
      ) : null}
      {isLoggedIn && (
        <Toolbar>
          <CommentDialogUi
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            onCancel={onFocus}
            value={value}
            cancel={false}
            placeholder={"Add a comment…"}
            OnFocus={OnFocus}
          >
            <Avatar alt="name" src={ image.url } sx={{ marginRight: 1 }} />
          </CommentDialogUi>
        </Toolbar>
      )}
    </>
  );
};
