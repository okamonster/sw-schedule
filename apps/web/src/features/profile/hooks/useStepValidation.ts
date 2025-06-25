import { zodResolver } from '@hookform/resolvers/zod';
import { createStepSchema } from '@/entities/profile';

export const useStepValidation = (currentStep: number) => {
  const schema = createStepSchema(currentStep);
  const resolver = zodResolver(schema);

  return { resolver };
};
