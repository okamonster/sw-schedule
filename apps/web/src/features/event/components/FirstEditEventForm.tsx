"use client";
import {
	Button,
	Checkbox,
	NumberInput,
	Paper,
	Textarea,
	TextInput,
} from "@mantine/core";
import { DateInput, DateTimePicker, TimeInput } from "@mantine/dates";
import { ImageInput } from "@/components/Inputs/ImageInput";
import { SUPABASE_BUCKETS, SUPABASE_UPLOAD_PATHS } from "@/constants";

type Props = {
	onNext: () => void;
};

export const FirstEditEventForm = ({ onNext }: Props) => {
	const handleNext = () => {
		onNext();
	};

	return (
		<form className="grid gap-4" onSubmit={handleNext}>
			<Paper className="grid p-4" shadow="md" radius="md" withBorder>
				<h2 className="text-lg font-bold text-text-black mb-4">イベント情報</h2>
				<div className="grid gap-1">
					<ImageInput
						buketName={SUPABASE_BUCKETS.IMAGES}
						uploadPath={SUPABASE_UPLOAD_PATHS.EVENTS}
						value={""}
						onChange={() => {}}
					/>
					<p className="text-sm text-text-gray">
						イベントの画像をアップロードしてください
					</p>
				</div>

				<div className="grid gap-2">
					<TextInput label="イベント名" />

					<Textarea label="イベントの説明" />

					<DateInput label="開催日" />

					<TimeInput label="開場時間" />

					<TimeInput label="開演時間" />

					<TextInput label="チケット購入リンク" />

					<DateTimePicker label="チケット発売日時" />

					<div className="grid gap-2">
						<div className="flex gap-4">
							<NumberInput label="チケット料金" min={0} max={100000} />
							<NumberInput label="当日チケット料金" min={0} max={100000} />
						</div>
						<Checkbox label="+1ドリンク必須" />
					</div>
				</div>
			</Paper>
			<div className="flex justify-between">
				<Button
					variant="subtle"
					color="var(--color-text-black)"
					disabled
					radius="lg"
				>
					戻る
				</Button>
				<Button color="var(--color-text-primary)" radius="lg" type="submit">
					次へ
				</Button>
			</div>
		</form>
	);
};
