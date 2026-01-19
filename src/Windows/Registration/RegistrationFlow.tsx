import { useEffect, useState, type ComponentType } from 'react';
import { RegistrationStep, type RegistrationStepProps } from './registrationSteps';

import Country from './Setps/Country';
import Terms from './Setps/Terms';
import Username from './Setps/Username';
import Pin from './Setps/Pin';
import Credentials from './Setps/Credentials';
import ProfileImage from './Setps/ProfileImage';
import Addons from './Setps/Addons';
import { useNavigate } from 'react-router-dom';

const stepMap: Record<RegistrationStep, ComponentType<RegistrationStepProps> | null> = {
  [RegistrationStep.COUNTRY]: Country,
  [RegistrationStep.TERMS]: Terms,
  [RegistrationStep.USERNAME]: Username,
  [RegistrationStep.CREDENTIALS]: Credentials,
  [RegistrationStep.PROFILEIMAGE]: ProfileImage,
  [RegistrationStep.PIN]: Pin,
  [RegistrationStep.ADDONS]: Addons,
  [RegistrationStep.COMPLETE]: null,
};

const RegistrationFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegistrationStep>(RegistrationStep.COUNTRY);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  useEffect(()=>{
    localStorage.removeItem('register_username');
  },[])

  const StepComponent = stepMap[step];
  if (!StepComponent) {
    navigate('/signup');
    return null;
  };
  return <StepComponent onNext={next} onPrev={prev} />;
};

export default RegistrationFlow;
