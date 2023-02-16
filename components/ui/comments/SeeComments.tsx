import { FC, useContext, ReactNode, useState, FormEvent, ChangeEvent } from "react";
import * as React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Toolbar,
  IconButton,
  Box
} from "@mui/material";
import { CommentForm, StyledInputComment } from "../styled/CommentForm";
import { AuthContext } from "../../../context/auth";
import { CommentContext } from "../../../context/comment";
import { UIContext } from "../../../context/ui";
import { WindowSize } from "../../../utils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { CommentUi } from './CommentUi';
import { Comment } from "../../../interfaces";

interface Props {
  children?: ReactNode;
  parent_id: string
}

export const SeeComments: FC<Props> = ({ children, parent_id }) => {
  const [value, setValue] = useState('')
  const { onFocus, setOnFocus } = useContext(UIContext);
  const { comments, createComment } = useContext(CommentContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const height = WindowSize().height;
  const [toogle, setToogle] = useState(true);
  const [inputs, setInputs] = useState({});
  const handleComments = () => {
    setToogle(!toogle);
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createComment({
      ...inputs, 
      parent_id : parent_id,
      user_photo : user?.avatar,
      user_name : user?.name,
      user_id : user?._id,
    } as Comment)
      .then(() => {
        setInputs("");
        setValue("")
      })
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValue(target.value)
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  return (
    <>
      {toogle && children}
      {comments?.length ? (<Accordion elevation={0} disableGutters={true} >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: "500",
              width: "100%",
              height: "100%",
              mt: -1.5
            }}
            onClick={handleComments}
          >
            {!toogle ? (
              <IconButton
                aria-label="back"
                sx={{
                  color: "black",
                  paddingLeft: 2,
                }}
                onClick={handleComments}
              >
                <ArrowBackIosIcon />
              </IconButton>
            ) : (
              "See the " + comments.filter(i=>i.parent_id === parent_id)?.length + " comments"
            )}
          </Typography>
        </AccordionSummary>
        <Box sx={{ height: height - 240, overflow: "auto" }}>
              <AccordionDetails
                sx={{ marginBottom: -8, marginTop: -2 }}
              >
               <CommentUi parent_id={parent_id}/>
              </AccordionDetails>        
        </Box>
      </Accordion>): (null)}
      {isLoggedIn && (
        <Toolbar>
          <Avatar
            alt="name"
            src={user?.avatar}
            sx={{ marginRight: 1 }}
          />
          <CommentForm style={{ color: "black" }}>
            <StyledInputComment
              value={value}
              type="text"
              name="description"
              placeholder="Add a comment…"
              inputProps={{ "aria-label": "comment" }}
              inputRef={(input) => onFocus && input?.focus()}
              onBlur={() => setOnFocus(false)}  
              onChange={handleInput} 
            />
          </CommentForm>
          <IconButton
            aria-label="settings"
            style={{
              color: "black",
              marginLeft: 8,
              marginRight: -6,
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
        </Toolbar>
      )}
    </>
  );
};
