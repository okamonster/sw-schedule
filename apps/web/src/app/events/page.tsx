import { EditEventForm } from "@/features/event/components/EditEventForm";

type Props = {
	searchParams: Promise<{
		keyword: string;
		sort: string;
	}>;
};

export default async function EventsPage({ searchParams }: Props) {
	const { keyword, sort } = await searchParams;

	return <EditEventForm keyword={keyword} sort={sort} />;
}
