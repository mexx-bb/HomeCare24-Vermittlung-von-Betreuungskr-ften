export interface FormData {
  // Step 1
  address: string;
  street: string;
  cityRegion: string;
  zipCountry: string;
  startDateOption: "Sobald wie möglich" | "Anderes" | "";
  startDateCustom: string;
  numberOfPersons: "Einzelperson" | "Paar" | "";

  // Step 2: Person 1
  p1_firstName: string;
  p1_lastName: string;
  p1_gender: "Weiblich" | "Männlich" | "";
  p1_weight: string;
  p1_height: string;
  p1_age: string;
  p1_birthDate: string;
  p1_hourlyCare: "Ja" | "Nein" | "";
  p1_careLevel: "1" | "2" | "3" | "4" | "5" | "";
  p1_mobility: string[];
  p1_diagnoses: string[];
  p1_otherDiagnoses: string;
  p1_urineControl: "Inkontinenz" | "gelegentlich" | "ständig" | "";
  p1_stoolControl: "Inkontinenz" | "gelegentlich" | "ständig" | "";
  p1_dressing: "Unfähig" | "Braucht Hilfe (50%)" | "Selbstständig" | "";
  p1_dailyCare: string[];
  p1_nightShifts: "Nein" | "max. 1x Nacht" | "mehrmals Nacht" | "";
  p1_nightShiftsReason: string;
  p1_bodyCare: "Abhängig" | "Selbstständig" | "";
  p1_toilet: "Abhängig" | "Selbstständig" | "";
  p1_bathing: "Abhängig" | "Selbstständig" | "";
  p1_otherCareNeeds: string;
  p1_transferNeeded: "Ja" | "Nein" | "";
  p1_bedChairTransfer: string;
  p1_eating: "Unfähig" | "Braucht Hilfe" | "Selbstständig" | "";
  p1_diet: "Traditionell" | "Vegetarisch" | "Sonstiges" | "";
  p1_otherDiets: string;
  p1_dailyRoutine: string;
  p1_equipment: string[];
  p1_otherEquipment: string;

  // Step 3: Person 2
  hasSecondPerson: "Ja" | "Nein";
  p2_firstName: string;
  p2_lastName: string;
  p2_gender: "Weiblich" | "Männlich" | "";
  p2_weight: string;
  p2_height: string;
  p2_age: string;
  p2_birthDate: string;
  p2_hourlyCare: "Ja" | "Nein" | "";
  p2_careLevel: "1" | "2" | "3" | "4" | "5" | "";
  p2_mobility: string[];
  p2_diagnoses: string[];
  p2_otherDiagnoses: string;
  p2_urineControl: "Inkontinenz" | "gelegentlich" | "ständig" | "";
  p2_stoolControl: "Inkontinenz" | "gelegentlich" | "ständig" | "";
  p2_dressing: "Unfähig" | "Braucht Hilfe (50%)" | "Selbstständig" | "";
  p2_dailyCare: string[];
  p2_nightShifts: "Nein" | "max. 1x Nacht" | "mehrmals Nacht" | "";
  p2_nightShiftsReason: string;
  p2_bodyCare: "Abhängig" | "Selbstständig" | "";
  p2_toilet: "Abhängig" | "Selbstständig" | "";
  p2_bathing: "Abhängig" | "Selbstständig" | "";
  p2_otherCareNeeds: string;
  p2_transferNeeded: "Ja" | "Nein" | "";
  p2_bedChairTransfer: string;
  p2_eating: "Unfähig" | "Braucht Hilfe" | "Selbstständig" | "";
  p2_diet: "Traditionell" | "Vegetarisch" | "Sonstiges" | "";
  p2_otherDiets: string;
  p2_dailyRoutine: string;
  p2_equipment: string[];
  p2_otherEquipment: string;

  // Step 4: Unterkunft
  accommodationType: "Haus" | "Wohnung" | "Stadt" | "Land" | "";
  shoppingWalkable: boolean;
  internetWifi: "Ja" | "Nein" | "";
  tvAvailable: boolean;
  caregiverBedroom: "Eigenes Zimmer" | "Zimmer mit Bad" | "Sonstiges" | "";
  pets: "Ja" | "Nein" | "";
  otherPersonsInHousehold: "Ja" | "Nein" | "";
  otherPersonsDetails: string;
  relationshipToPatient: string;

  // Step 5: Anforderungen
  req_gender: string[];
  req_german: string[];
  req_age: string[];
  req_driversLicense: "Ja" | "Nein" | "";
  req_experience: string[];
  req_smoking: "Ja" | "Nein" | "Nicht wichtig" | "Nur draußen" | "";
  req_otherRequirements: string;
  req_weeklyBudget: string;

  // Step 6: Kontaktdaten
  contact_title: string;
  contact_firstName: string;
  contact_lastName: string;
  contact_relationship: string;
  contact_address: string;
  contact_street: string;
  contact_city: string;
  contact_zipCountry: string;
  contact_email: string;
  contact_phone: string;
  contact_howFound: string;
  contact_otherPersonFirstName: string;
  contact_otherPersonLastName: string;
  contact_otherPersonPhone: string;
}

export const initialFormData: FormData = {
  address: "", street: "", cityRegion: "", zipCountry: "", startDateOption: "", startDateCustom: "", numberOfPersons: "",
  
  p1_firstName: "", p1_lastName: "", p1_gender: "", p1_weight: "", p1_height: "", p1_age: "", p1_birthDate: "",
  p1_hourlyCare: "", p1_careLevel: "", p1_mobility: [], p1_diagnoses: [], p1_otherDiagnoses: "", p1_urineControl: "",
  p1_stoolControl: "", p1_dressing: "", p1_dailyCare: [], p1_nightShifts: "", p1_nightShiftsReason: "", p1_bodyCare: "",
  p1_toilet: "", p1_bathing: "", p1_otherCareNeeds: "", p1_transferNeeded: "", p1_bedChairTransfer: "", p1_eating: "",
  p1_diet: "", p1_otherDiets: "", p1_dailyRoutine: "", p1_equipment: [], p1_otherEquipment: "",

  hasSecondPerson: "Nein",
  p2_firstName: "", p2_lastName: "", p2_gender: "", p2_weight: "", p2_height: "", p2_age: "", p2_birthDate: "",
  p2_hourlyCare: "", p2_careLevel: "", p2_mobility: [], p2_diagnoses: [], p2_otherDiagnoses: "", p2_urineControl: "",
  p2_stoolControl: "", p2_dressing: "", p2_dailyCare: [], p2_nightShifts: "", p2_nightShiftsReason: "", p2_bodyCare: "",
  p2_toilet: "", p2_bathing: "", p2_otherCareNeeds: "", p2_transferNeeded: "", p2_bedChairTransfer: "", p2_eating: "",
  p2_diet: "", p2_otherDiets: "", p2_dailyRoutine: "", p2_equipment: [], p2_otherEquipment: "",

  accommodationType: "", shoppingWalkable: false, internetWifi: "", tvAvailable: false, caregiverBedroom: "", pets: "",
  otherPersonsInHousehold: "", otherPersonsDetails: "", relationshipToPatient: "",

  req_gender: [], req_german: [], req_age: [], req_driversLicense: "", req_experience: [], req_smoking: "",
  req_otherRequirements: "", req_weeklyBudget: "",

  contact_title: "", contact_firstName: "", contact_lastName: "", contact_relationship: "", contact_address: "",
  contact_street: "", contact_city: "", contact_zipCountry: "", contact_email: "", contact_phone: "", contact_howFound: "",
  contact_otherPersonFirstName: "", contact_otherPersonLastName: "", contact_otherPersonPhone: "",
};
