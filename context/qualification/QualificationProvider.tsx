import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { QualificationContext, qualificationsReducer } from "./";
import { Qualification } from "../../interfaces";
import { QualificationService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  qualifications: Qualification[];
  qualification: Qualification;
}

const INITIAL_STATE: State = {
  qualifications: [],
  qualification: {} as Qualification,
};

export const QualificationProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(qualificationsReducer, INITIAL_STATE);

  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  useMemo(() => ({ qualifications, setQualifications }), [qualifications]);

  const updateQualification = async (id: string, payload: Qualification) => {
    const { status, data } = await QualificationService.updateOne(id, payload);
    if (status) dispatch({ type: "QUALIFICATION_UPDATED", payload: data });
    return data;
  };

  return (
    <QualificationContext.Provider
      value={{ ...state, qualifications, setQualifications, updateQualification }}
    >
      {children}
    </QualificationContext.Provider>
  );
};
