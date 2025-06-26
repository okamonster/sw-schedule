import { Button, Input } from "@mantine/core";
import { FaSearch } from "react-icons/fa";

interface ArtistSearchInputProps {
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
}

export function ArtistSearchInput({
	placeholder,
	value,
	onChange,
}: ArtistSearchInputProps) {
	return (
		<div className="flex gap-2 w-full">
			<Input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				radius="lg"
				className="flex-1"
			/>
			<Button
				type="button"
				color="var(--color-button-primary)"
				onClick={() => {
					console.log("search");
				}}
				radius="lg"
				leftSection={<FaSearch size={12} />}
			>
				検索
			</Button>
		</div>
	);
}
