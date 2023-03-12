import { State } from "./";

type Action =
  | "ADD_COMMENTS"
  | "CREATE_COMMENT"
  | "UPDATE_COMMENT"
  | "DELETE_COMMENT";
type ActionType = { type: Action; payload?: any };

export const commentsReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "ADD_COMMENTS":
      const attach = state.comments.concat(action.payload);
      const comments = attach.filter(
        (object, index) =>
          attach.findIndex((item) => item._id === object._id) === index
      );
      return { ...state, comments: comments };
    case "CREATE_COMMENT":
      return { ...state, comment: action.payload };
    case "UPDATE_COMMENT":
      return { ...state, comment: action.payload };
    case "DELETE_COMMENT":
      const filtered = state.comments.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, comments: filtered };
    default:
      return state;
  }
};
