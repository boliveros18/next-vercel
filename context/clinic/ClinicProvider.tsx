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
}

const INITIAL_STATE: State = {
  clinics: [],
  clinic: {} as Clinic,
};

export const ClinicProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(clinicsReducer, INITIAL_STATE);

  const [clinics, setClinics] = useState<Clinic[]>([]);
  useMemo(() => ({ clinics, setClinics }), [clinics]);

  const updateClinic = async (id: string, payload: Clinic) => {
    const { status, data } = await ClinicService.updateOne(id, payload);
    if (status) dispatch({ type: "CLINIC_UPDATED", payload: data });
    return data;
  };

  return (
    <ClinicContext.Provider
      value={{ ...state, clinics, setClinics, updateClinic }}
    >
      {children}
    </ClinicContext.Provider>
  );
};
