import { createContext, Dispatch, SetStateAction } from "react";
import { Answer } from "../../interfaces";

interface ContextProps {
  answers: Answer[];
  answer: Answer;
  setAnswers: Dispatch<SetStateAction<Answer[]>>;
  updateAnswer: (id: string, payload: Answer) => Promise<void>;
}

export const AnswerContext = createContext({} as ContextProps);
