"use client";
import { Card, Image, Skeleton } from "@mantine/core";
import dayjs from "dayjs";

type Props = {
	imageUrl: string;
	eventName: string;
	location: string;
	eventDate: Date;
};

export const EventCard = ({
	imageUrl,
	eventName,
	location,
	eventDate,
}: Props): React.ReactNode => {
	return (
		<Card
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
			w={280}
			className="shrink-0"
		>
			<Card.Section className="bg-theme h-[250px] bg-cover bg-center bg-opacity-10">
				{imageUrl ? (
					<Image
						src="https://d13rtcers002cb.cloudfront.net/images/80333ee9-f14f-4011-82fa-dbc7b5609455"
						h="100%"
						alt={eventName}
						fit="contain"
					/>
				) : (
					<Skeleton height="100%" />
				)}
			</Card.Section>

			<p className="text-md font-bold">{eventName}</p>

			<p className="text-sm text-text-gray">
				開催日:{dayjs(eventDate).format("YYYY/MM/DD")}
			</p>
			<p className="text-sm text-text-gray">会場:{location}</p>
		</Card>
	);
};
