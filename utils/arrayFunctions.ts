import { Clinic } from "../interfaces";

export const getPrincipalClinics = (clinic: Clinic[]) => {
  
  const clinics = clinic.map((i) => i.qualification.map((i) => i.average)[0]);
  const principal = clinic
    .map((i) => i.qualification.map((i) => i.average)[0])
    .sort((a: any, b: any) => b - a);
  const array = new Array();
  const principalClinics = new Array();
  for (let i = 0; i < 5; i++) {
    for (let n = 0; n < clinic.length; n++) {
      if (clinics[n] == principal[i]) {
        array.push(n);
      }
    }
    principalClinics.push(clinic[array[i]]);
  }
  return principalClinics;
};
