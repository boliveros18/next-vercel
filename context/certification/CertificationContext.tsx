import { createContext, Dispatch, SetStateAction } from "react";
import { Certification } from "../../interfaces";

interface ContextProps {
  certifications: Certification[];
  certification: Certification;
  setCertifications: Dispatch<SetStateAction<Certification[]>>;
  updateCertification: (id: string, payload: Certification) => Promise<void>;
}

export const CertificationContext = createContext({} as ContextProps);
