"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Checkbox,
	NumberInput,
	Paper,
	Textarea,
	TextInput,
} from "@mantine/core";
import { DateInput, DateTimePicker, TimeInput } from "@mantine/dates";
import { Controller, useForm } from "react-hook-form";
import { ImageInput } from "@/components/Inputs/ImageInput";
import { SUPABASE_BUCKETS, SUPABASE_UPLOAD_PATHS } from "@/constants";
import {
	FirstEditEventSchema,
	type FirstEditEventSchemaType,
} from "@/entities/event";

type Props = {
	firstStepValues: FirstEditEventSchemaType;
	onNext: () => void;
	onChangeFirstStep: (data: FirstEditEventSchemaType) => void;
};

export const FirstEditEventForm = ({
	firstStepValues,
	onNext,
	onChangeFirstStep,
}: Props) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FirstEditEventSchemaType>({
		mode: "all",
		defaultValues: {
			eventImageUrl: firstStepValues.eventImageUrl ?? "",
			eventName: firstStepValues.eventName ?? "",
			eventDescription: firstStepValues.eventDescription ?? "",
			eventDate: firstStepValues.eventDate ?? "",
			openTime: firstStepValues.openTime ?? "",
			startTime: firstStepValues.startTime ?? "",
			ticketLink: firstStepValues.ticketLink ?? "",
			ticketReleaseDateTime: firstStepValues.ticketReleaseDateTime ?? "",
			ticketPrice: firstStepValues.ticketPrice ?? 0,
			sameDayTicketPrice: firstStepValues.sameDayTicketPrice ?? 0,
			isNeedDrink: firstStepValues.isNeedDrink ?? "false",
		},
		resolver: zodResolver(FirstEditEventSchema),
	});

	const onSubmit = (data: FirstEditEventSchemaType) => {
		onChangeFirstStep({ ...data });
		onNext();
	};

	return (
		<form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
			<Paper className="grid p-4" shadow="md" radius="md" withBorder>
				<h2 className="text-lg font-bold text-text-black mb-4">イベント情報</h2>
				<div className="grid gap-1">
					<Controller
						control={control}
						name="eventImageUrl"
						render={({ field }) => (
							<ImageInput
								buketName={SUPABASE_BUCKETS.IMAGES}
								uploadPath={SUPABASE_UPLOAD_PATHS.EVENTS}
								value={field.value}
								onChange={field.onChange}
								error={errors.eventImageUrl?.message}
							/>
						)}
					/>

					<p className="text-sm text-text-gray">
						イベントの画像をアップロードしてください
					</p>
				</div>

				<div className="grid gap-2">
					<TextInput
						label="イベント名"
						required
						{...register("eventName")}
						error={errors.eventName?.message}
					/>

					<Textarea
						label="イベントの説明"
						{...register("eventDescription")}
						error={errors.eventDescription?.message}
					/>

					<Controller
						control={control}
						name="eventDate"
						render={({ field }) => (
							<DateInput
								label="開催日"
								value={field.value}
								onChange={field.onChange}
								error={errors.eventDate?.message}
								required
							/>
						)}
					/>

					<Controller
						control={control}
						name="openTime"
						render={({ field }) => (
							<TimeInput
								label="開場時間"
								value={field.value}
								onChange={field.onChange}
								error={errors.openTime?.message}
								required
							/>
						)}
					/>

					<Controller
						control={control}
						name="startTime"
						render={({ field }) => (
							<TimeInput
								label="開演時間"
								value={field.value}
								onChange={field.onChange}
								error={errors.startTime?.message}
								required
							/>
						)}
					/>

					<TextInput
						label="チケット購入リンク"
						required
						{...register("ticketLink")}
					/>

					<Controller
						control={control}
						name="ticketReleaseDateTime"
						render={({ field }) => (
							<DateTimePicker
								label="チケット発売日時"
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>

					<div className="grid gap-2">
						<div className="flex gap-4">
							<Controller
								control={control}
								name="ticketPrice"
								render={({ field }) => (
									<NumberInput
										label="チケット料金"
										min={0}
										max={100000}
										required
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
							<Controller
								control={control}
								name="sameDayTicketPrice"
								render={({ field }) => (
									<NumberInput
										label="当日チケット料金"
										min={0}
										max={100000}
										required
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
						</div>
						<Controller
							control={control}
							name="isNeedDrink"
							render={({ field }) => (
								<Checkbox
									label="+1ドリンク必須"
									checked={field.value === "true"}
									onChange={(event) =>
										field.onChange(
											event.currentTarget.checked ? "true" : "false",
										)
									}
									error={errors.isNeedDrink?.message}
								/>
							)}
						/>
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
				<Button
					color="var(--color-text-primary)"
					radius="lg"
					type="submit"
					disabled={!isValid}
				>
					次へ
				</Button>
			</div>
		</form>
	);
};
