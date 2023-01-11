import { createContext, Dispatch, SetStateAction } from "react";
import { Qualification } from "../../interfaces";

interface ContextProps {
  qualifications: Qualification[];
  qualification: Qualification;
  setQualifications: Dispatch<SetStateAction<Qualification[]>>;
  updateQualification: (id: string, payload: Qualification) => Promise<void>;
}

export const QualificationContext = createContext({} as ContextProps);
