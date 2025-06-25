import { useState } from 'react';

export const useSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { title: '基本情報', description: 'あなたについて' },
    { title: 'よく行くGemba', description: '活動地域を教えて' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return { currentStep, steps, handleNext, handleBack };
};
