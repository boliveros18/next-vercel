import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { ClinicContext } from "./";
import { Clinic } from "../../interfaces";

interface ProviderProps {
  children: ReactNode;
}

export const ClinicProvider: FC<ProviderProps> = ({ children }) => {
  const [clinics, setClinics] = useState<Clinic[]>([]);

  const values = useMemo(() => ({ clinics, setClinics }), [clinics]);

  return (
    <ClinicContext.Provider value={values}>{children}</ClinicContext.Provider>
  );
};
