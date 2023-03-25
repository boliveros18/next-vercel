export interface Procedure {
    _id: string;
    medic_id: string;
    product_id: string;
    client_id: string;
    recovery_days: number;
    hours: number;
    contract_signature: string;
    surgical_facility: boolean;
    facility_care: boolean;
    medical_care: boolean;
    anesthesia_fees: boolean;
    medical_tests: boolean;
    post_surgery_garments: boolean;
    prescription_medication: boolean;
    surgeon_fee: boolean;
    surgeon_insurance: boolean;
    date: number;
    createdAt: number;
    updatedAt: number;
  }
  