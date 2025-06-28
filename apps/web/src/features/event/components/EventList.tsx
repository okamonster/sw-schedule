import type { Event } from "@/entities/event";
import { EventListCard } from "./EventListCard";

type Props = {
	events: Event[];
};

export const EventList = ({ events }: Props) => {
	return (
		<div className="grid gap-2">
			{events.map((event) => (
				<EventListCard key={event.id} event={event} />
			))}
		</div>
	);
};
