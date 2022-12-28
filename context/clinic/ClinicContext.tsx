import { createContext, Dispatch, SetStateAction } from "react";
import { Clinic } from "../../interfaces";


interface ContextProps {
  clinics: Clinic[];
  setClinics: Dispatch<SetStateAction<Clinic[]>>;
  updateClinic: (clinic: Clinic ) => void;
}

export const ClinicContext = createContext({} as ContextProps);
