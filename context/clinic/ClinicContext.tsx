import { createContext, Dispatch, SetStateAction } from "react";
import { Clinic } from "../../interfaces";

interface ContextProps {
  clinics: Clinic[];
  clinic: Clinic;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  principal: Clinic[];
  setPrincipal: Dispatch<SetStateAction<Clinic[]>>;
  principals: Clinic[];
  setPrincipals: Dispatch<SetStateAction<Clinic[]>>;
  getClinic: (id: string) => Promise<void>;
  updateClinic: (id: string, payload: Clinic) => Promise<void>;
}

export const ClinicContext = createContext({} as ContextProps);

