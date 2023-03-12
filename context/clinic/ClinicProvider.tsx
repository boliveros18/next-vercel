import { FC, ReactNode, useReducer, useCallback } from "react";
import { ClinicContext, clinicsReducer } from "./";
import { Clinic } from "../../interfaces";
import { ClinicService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  clinics: Clinic[];
  clinic: Clinic;
  principal: Clinic;
}

const INITIAL_STATE: State = {
  clinics: [],
  clinic: {} as Clinic,
  principal: {} as Clinic,
};

export const ClinicProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(clinicsReducer, INITIAL_STATE);

  const setPrincipal = useCallback((payload: Clinic) => {
    dispatch({ type: "SET_PRINCIPAL", payload });
  }, [])

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
        setPrincipal,
        updateClinic,
        getClinic,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};
