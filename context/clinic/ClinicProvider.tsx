import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { ClinicContext, clinicsReducer } from "./";
import { Clinic, Qualification} from "../../interfaces";
import { ClinicService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface ClinicState {
  clinics: Clinic[];
  clinic: Clinic;
  qualification: Qualification
}

const CLINICS_INITIAL_STATE: ClinicState = {
  clinics: [],
  clinic: {} as Clinic,
  qualification: {} as Qualification,
};

export const ClinicProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(clinicsReducer, CLINICS_INITIAL_STATE);

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
