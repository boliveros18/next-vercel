import { ClinicState } from "./";
import { Clinic} from "../../interfaces";

type ClinicsActionType =
  | { type: "CLINIC_UPDATED"; payload: Clinic }
  | { type: "REFRESH_DATA"; payload: Clinic[] };

export const clinicsReducer = (
  state: ClinicState,
  action: ClinicsActionType
): ClinicState => {
  switch (action.type) {
    case "CLINIC_UPDATED":
      return { ...state, clinic: action.payload };
    case "REFRESH_DATA":
      return { ...state, clinics: [...action.payload] };
    default:
      return state;
  }
};
