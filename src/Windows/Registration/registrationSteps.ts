export enum RegistrationStep {
  COUNTRY = 0,
  TERMS = 1,
  USERNAME = 2,
  CREDENTIALS = 3,
  PROFILEIMAGE = 4,
  PIN = 5,
  ADDONS = 6,
  COMPLETE = 7,
}

export interface RegistrationStepProps {
  onNext: () => void;
  onPrev?: () => void;
}