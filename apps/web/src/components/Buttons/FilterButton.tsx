import { Button } from '@mantine/core';

interface FilterButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const FilterButton = ({ label, isActive = false, onClick }: FilterButtonProps) => {
  return (
    <Button
      onClick={onClick}
      radius="lg"
      color="var(--color-button-primary)"
      variant={isActive ? 'filled' : 'outline'}
      className="shrink-0"
    >
      {label}
    </Button>
  );
};
