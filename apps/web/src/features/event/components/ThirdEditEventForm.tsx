"use client";
import { Button, Paper } from "@mantine/core";
import { EventArtistInput } from "./EventArtistInput";

type Props = {
	onPrev: () => void;
	onSubmit: () => void;
};

export const ThirdEditEventForm = ({ onPrev, onSubmit }: Props) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<form className="grid gap-4" onSubmit={handleSubmit}>
			<Paper className="p-4 grid gap-4" shadow="md" radius="md" withBorder>
				<h2 className="text-lg font-bold text-text-black">出演者情報</h2>

				<div className="grid gap-2">
					<EventArtistInput value={[]} onChange={() => {}} error={undefined} />
				</div>
			</Paper>
			<div className="flex justify-between">
				<Button
					variant="subtle"
					color="var(--color-text-black)"
					radius="lg"
					onClick={onPrev}
				>
					戻る
				</Button>
				<Button color="var(--color-text-primary)" radius="lg" type="submit">
					作成する
				</Button>
			</div>
		</form>
	);
};
