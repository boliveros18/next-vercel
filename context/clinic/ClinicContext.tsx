import { createContext, Dispatch, SetStateAction } from "react";
import { Clinic} from "../../interfaces";

interface ContextProps {
  clinics: Clinic[];
  clinic: Clinic
  setClinics: Dispatch<SetStateAction<Clinic[]>>;
  updateClinic: (id: string, payload: Clinic) => Promise<void>;
}

export const ClinicContext = createContext({} as ContextProps);
