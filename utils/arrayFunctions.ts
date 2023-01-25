import { Clinic, Qualification, Certification } from "../interfaces";

export const getPrincipalClinics = (
  clinic: Clinic[],
  qualification: Qualification[]
) => {
  const arrayQualifications = new Array();
  qualification
    .flat() 
    .map((i) => i.parent_id)
    .filter((valor, indice) => {
      qualification
        .flat()
        .map((i) => i.parent_id)
        .indexOf(valor) == indice
        ? arrayQualifications.push(qualification.flat()[indice])
        : null;
    });
  const principal = arrayQualifications
    .map((i) => i.average)
    .sort((a: any, b: any) => b - a);

  const principalClinics = new Array(); 
  const array = new Array();  
  for (let i = 0; i < 4 ; i++) { 
    for (let n = 0; n < clinic.flat().length; n++) {
      if ( principal[i] === arrayQualifications[n].average) {
        array.push(arrayQualifications[n].parent_id); 
      }
    }
  }
  for (let i = 0; i < 5 ; i++) { 
    for (let n = 0; n < 6; n++) {
      if ( clinic.flat()[n]?._id == array[i]) {
        principalClinics.push(clinic.flat()[n]); 
      }
    }
  }
  return principalClinics;
};

export const getPrincipalClinicsCertifications = (principalClinics: Clinic[], certifications: Certification[]) => {

  const principalClinicsCertifications = new Array(); 
  for (let i = 0; i < certifications.length ; i++) { 
    for (let n = 0; n < 6; n++) {
      if ( principalClinics.flat()[n]?._id == certifications[i].parent_id) {
        principalClinicsCertifications.push(certifications.flat()[n]); 
      }
    }
  }
  return principalClinicsCertifications
}

export const getPrincipalClinicQualifications = (parent_id: string, qualifications: Qualification[]) => {

  const principalClinicQualifications = new Array(); 
  for (let i = 0; i < qualifications.length ; i++) { 
      if ( parent_id == qualifications[i].parent_id) {
        principalClinicQualifications.push(qualifications.flat()[i]); 
      }
  }
  return principalClinicQualifications
}