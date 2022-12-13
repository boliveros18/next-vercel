import { createContext, Dispatch, SetStateAction } from "react";
import { Clinic } from "../../interfaces";

interface ContextProps {
  clinics: Clinic[];
  setClinics: Dispatch<SetStateAction<Clinic[]>>;
}

export const ClinicContext = createContext({} as ContextProps);
