import { createContext } from "react";
import { Clinic } from "../../interfaces";

interface ContextProps {
  clinics: Clinic[];
  clinic: Clinic;
  principal: Clinic;
  setPrincipal: (payload: Clinic) => void;
  getClinic: (id: string) => Promise<void>;
  updateClinic: (id: string, payload: Clinic) => Promise<void>;
}

export const ClinicContext = createContext({} as ContextProps);

