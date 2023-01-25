import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { ClinicContext, clinicsReducer } from "./";
import { Clinic } from "../../interfaces";
import { ClinicService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  clinics: Clinic[];
  clinic: Clinic;
  principals: Clinic[];
}

const INITIAL_STATE: State = {
  clinics: [],
  clinic: {} as Clinic,
  principals: []
};

export const ClinicProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(clinicsReducer, INITIAL_STATE);

  const [principals, setPrincipals] = useState<Clinic[]>([]);

  const updateClinic = async (id: string, payload: Clinic) => {
    const { status, data } = await ClinicService.updateOne(id, payload);
    if (status) dispatch({ type: "CLINIC_UPDATED", payload: data });
    return data;
  };

  return (
    <ClinicContext.Provider
      value={{ ...state, principals, setPrincipals, updateClinic }}
    >
      {children}
    </ClinicContext.Provider>
  );
};
