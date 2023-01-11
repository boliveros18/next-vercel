import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { CertificationContext, certificationsReducer } from ".";
import { Certification } from "../../interfaces";
import { CertificationService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  certifications: Certification[];
  certification: Certification;
}

const INITIAL_STATE: State = {
  certifications: [],
  certification: {} as Certification,
};

export const CertificationProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(certificationsReducer, INITIAL_STATE);

  const [certifications, setCertifications] = useState<Certification[]>([]);
  useMemo(() => ({ certifications, setCertifications }), [certifications]);

  const updateCertification = async (id: string, payload: Certification) => {
    const { status, data } = await CertificationService.updateOne(id, payload);
    if (status) dispatch({ type: "CERTIFICATION_UPDATED", payload: data });
    return data;
  };

  return (
    <CertificationContext.Provider
      value={{ ...state, certifications, setCertifications, updateCertification }}
    >
      {children}
    </CertificationContext.Provider>
  );
};
