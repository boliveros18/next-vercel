import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { AnswerContext, answersReducer } from "./";
import { Answer } from "../../interfaces";
import { AnswerService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  answers: Answer[];
  answer: Answer;
}

const INITIAL_STATE: State = {
  answers: [],
  answer: {} as Answer,
};

export const AnswerProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(answersReducer, INITIAL_STATE);

  const [answers, setAnswers] = useState<Answer[]>([]);
  useMemo(() => ({ answers, setAnswers }), [answers]);

  const updateAnswer = async (id: string, payload: Answer) => {
    const { status, data } = await AnswerService.updateOne(id, payload);
    if (status) dispatch({ type: "ANSWER_UPDATED", payload: data });
    return data;
  };

  return (
    <AnswerContext.Provider
      value={{ ...state, answers, setAnswers, updateAnswer }}
    >
      {children}
    </AnswerContext.Provider>
  );
};
