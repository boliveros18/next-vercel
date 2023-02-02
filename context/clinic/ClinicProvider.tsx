import { FC, ReactNode, useReducer, useState } from "react";
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
  principals: [],
};

export const ClinicProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(clinicsReducer, INITIAL_STATE);

  const [principal, setPrincipal] = useState<Clinic[]>([]);
  const [principals, setPrincipals] = useState<Clinic[]>([]);
  const [index, setIndex] = useState<number>(0);

  const updateClinic = async (id: string, payload: Clinic) => {
    const data = await ClinicService.updateOne(id, payload);
    dispatch({ type: "CLINIC_UPDATED", payload: data });
    return data;
  };

  const getClinic = async (id: string) => {
    const data = await ClinicService.getClinic(id);
    dispatch({ type: "CLINIC_GET", payload: data });
    return data;
  };

  return (
    <ClinicContext.Provider
      value={{
        ...state,
        principal, 
        setPrincipal,
        principals,
        setPrincipals,
        updateClinic,
        index,
        setIndex,
        getClinic,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};
