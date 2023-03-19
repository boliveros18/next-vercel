import {
  FC,
  useContext,
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { CommentContext } from "../../../context/comment";
import { AuthContext } from "../../../context/auth";
import { UIContext } from "../../../context/ui";
import { Comment } from "../../../interfaces";
import { CommentDialogUi } from "../utils/CommentDialogUi";

interface Props {
  item: Comment;
  parent_id?: string;
  onCancel: boolean;
  setOnCancel: Dispatch<SetStateAction<boolean>>;
}

export const CommentPostUi: FC<Props> = ({
  item,
  parent_id,
  onCancel,
  setOnCancel,
}) => {
  const { createComment, getCommentsByParentId } = useContext(CommentContext);
  const { tag, value, setValue } = useContext(UIContext);
  const [inputs, setInputs] = useState({});
  const { user } = useContext(AuthContext);

  const handleClose = () => {
    setOnCancel(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createComment({
      ...inputs,
      parent_id: parent_id,
      user_photo: user?.avatar,
      user_name: user?.name,
      user_id: user?._id,
      user_tag_name: "@" + tag.user_name,
      user_tag_id: tag.user_id,
    } as Comment).then(() => {
      setInputs("");
      setValue("");
      setOnCancel(false);
      getCommentsByParentId(parent_id || "");
      getCommentsByParentId(item._id);
    });
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValue(target.value);
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({
      ...inputs,
      [target.name]: value.substring(tag.user_name.length + 3),
    });
  };
  return (
    <CommentDialogUi
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      onCancel={onCancel}
      value={value}
      handleClose={handleClose}
    />
  );
};
