import { ClinicState } from "./";
import { Clinic } from "../../interfaces";

type ClinicsActionType = { type: "[Clinic] Clinic-Updated"; payload: Clinic };

export const clinicsReducer = (
  state: ClinicState,
  action: ClinicsActionType
): ClinicState => {
  switch (action.type) {

    case "[Clinic] Clinic-Updated":
        return {
          ...state,
          clinics: state.clinics.map((clinic) => {
            if (clinic._id === action.payload._id) {
              clinic.category = action.payload.category;
              clinic.certified = action.payload.certified;
              clinic.finantial = action.payload.finantial;
              clinic.speciality = action.payload.speciality;
              clinic.technology = action.payload.technology;
              clinic.avatar = action.payload.avatar;
              clinic.photo = action.payload.photo;
              clinic.name = action.payload.name;
              clinic.city = action.payload.city;
              clinic.country = action.payload.country;
              clinic.instagram.link = action.payload.instagram.link;
              clinic.instagram.name = action.payload.instagram.name;
            }
            return clinic;
          }),
        };

    default:
      return state;
  }
};
