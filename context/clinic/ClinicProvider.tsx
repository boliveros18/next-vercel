import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { entriesApi } from "../../apis";
import { ClinicContext, clinicsReducer } from "./";
import { Clinic } from "../../interfaces";

interface ProviderProps {
  children: ReactNode;
}

export interface ClinicState {
  clinics: Clinic[];
}

const Clinics_INITIAL_STATE: ClinicState = {
  clinics: [],
};

export const ClinicProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(clinicsReducer, Clinics_INITIAL_STATE);
  
  const [clinics, setClinics] = useState<Clinic[]>([]);
  useMemo(() => ({ clinics, setClinics }), [clinics]);
  
  const updateClinic = async ({
    _id,
    category,
    certified,
    finantial,
    speciality,
    technology,
    avatar,
    photo,
    name,
    city,
    country,
    instagram,
  }: Clinic) => {
    try {
      const { data } = await entriesApi.put<Clinic>(
        `/clinic/63aa11440fffc0374b6cb10a`,
        {
          category,
          certified,
          finantial,
          speciality,
          technology,
          avatar,
          photo,
          name,
          city,
          country,
          instagram,
        }
      );
      dispatch({ type: "[Clinic] Clinic-Updated", payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <ClinicContext.Provider value={{...state, clinics, setClinics, updateClinic}}>
      {children}
    </ClinicContext.Provider>
  );
};
