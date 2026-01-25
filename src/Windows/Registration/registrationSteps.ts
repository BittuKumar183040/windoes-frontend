export enum RegistrationStep {
  COUNTRY = 0,
  TERMS = 1,
  USERNAME = 2,
  CREDENTIALS = 3,
  PROFILEIMAGE = 4,
  // PIN = 5,
  ADDONS = 5,
  COMPLETE = 6,
}

export interface RegistrationStepProps {
  onClose?: () => void;
  onNext: () => void;
  onPrev?: () => void;
}