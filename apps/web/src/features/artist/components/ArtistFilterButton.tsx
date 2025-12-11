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
    <button
      onClick={onClick}
      type="button"
      className="bg-background-light/50 border border-white text-text-gray font-bold rounded-full py-1 px-4"
      style={
        isActive
          ? { backgroundColor: 'var(--color-button-red)', color: 'var(--color-text-white)' }
          : {
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              color: 'var(--color-text-gray)',
            }
      }
    >
      {label}
    </button>
  );
};
