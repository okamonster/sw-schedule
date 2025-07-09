import { Button } from '@mantine/core';

interface ArtistFilterButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ArtistFilterButton = ({
  label,
  isActive = false,
  onClick,
}: ArtistFilterButtonProps) => {
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
