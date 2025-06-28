"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import {
	ThirdEditEventSchema,
	type ThirdEditEventSchemaType,
} from "@/entities/event";
import { EventArtistInput } from "./EventArtistInput";

type Props = {
	onPrev: () => void;
	onSubmit: () => void;
};

export const ThirdEditEventForm = ({ onPrev, onSubmit }: Props) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ThirdEditEventSchemaType>({
		mode: "all",
		resolver: zodResolver(ThirdEditEventSchema),
		defaultValues: {
			eventArtists: [],
		},
	});

	return (
		<form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
			<Paper className="p-4 grid gap-4" shadow="md" radius="md" withBorder>
				<h2 className="text-lg font-bold text-text-black">出演者情報</h2>

				<div className="grid gap-2">
					<Controller
						control={control}
						name="eventArtists"
						render={({ field }) => (
							<EventArtistInput
								onChange={field.onChange}
								value={field.value}
								error={errors.eventArtists?.message}
							/>
						)}
					/>
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
				<Button
					color="var(--color-text-primary)"
					radius="lg"
					type="submit"
					disabled={!isValid}
				>
					作成する
				</Button>
			</div>
		</form>
	);
};
