import { ActionIcon, Badge, Button, Divider, Image } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { FaCalendarAlt, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getGenreLabel, getRegionLabel } from "@/constants";
import { ArtistCard } from "@/features/top/components/ArtistCard";
import { getArtistById } from "@/service/artist";

// 出演イベントのモックデータ
const mockEvents = [
	{ date: new Date(2025, 6, 10), name: "ライブA" },
	{ date: new Date(2025, 6, 15), name: "ライブB" },
	{ date: new Date(2025, 6, 25), name: "ライブC" },
];

type Props = {
	params: {
		id: string;
	};
};

export default async function ArtistDetailPage({ params }: Props) {
	const { id } = await params;
	const artist = await getArtistById(id);

	return (
		artist && (
			<div className="grid gap-2">
				<div className="bg-theme h-[200px] w-full">
					<Image
						src={artist.artistImageUrl}
						alt={artist.artistName}
						h="100%"
						fit="contain"
					/>
				</div>

				<div className="grid gap-2 px-4 pb-4">
					<div className="flex gap-2">
						<Badge color="var(--color-button-primary)">
							{getGenreLabel(artist.genre)}
						</Badge>
						<Badge
							leftSection={<FaMapMarkerAlt />}
							color="var(--color-button-primary)"
						>
							{getRegionLabel(artist.region)}
						</Badge>
					</div>
					<section className="flex items-center justify-between gap-2">
						<div className="grid gap-2">
							<p className="text-lg font-bold">{artist.artistName}</p>
							<p className="text-sm text-text-gray">100人が推しに登録中</p>
						</div>
						<Button color="var(--color-button-primary)" radius="lg">
							推しに登録
						</Button>
					</section>

					<section className="grid gap-2">
						<p className="text-sm font-bold">シェア</p>
						<div className="flex gap-2">
							<ActionIcon
								color="var(--color-text-black)"
								variant="light"
								radius="lg"
								size="lg"
							>
								<FaXTwitter size={20} />
							</ActionIcon>
							<ActionIcon
								color="var(--color-text-black)"
								variant="light"
								radius="lg"
								size="lg"
							>
								<FaInstagram size={20} />
							</ActionIcon>
						</div>
					</section>
					<Divider />

					<section className="grid gap-2">
						<p className="text-sm font-bold">直近のイベント</p>
					</section>
					<Divider />
					<section className="grid gap-2">
						<div className="flex justify-between">
							<p className="text-sm font-bold ">出演予定</p>
							<Button
								color="var(--color-button-primary)"
								variant="outline"
								leftSection={<FaCalendarAlt />}
								radius="lg"
								size="xs"
							>
								カレンダーに同期
							</Button>
						</div>
						<div className="flex justify-center">
							<Calendar size="lg" monthLabelFormat={"MM月"} />
						</div>
						<div className="grid overflow-y-auto"></div>
					</section>
					<Divider />
					<section className="grid gap-2">
						<p className="text-sm font-bold">おすすめのアーティスト</p>

						<div className="flex gap-2 overflow-x-auto">
							<ArtistCard artist={artist} />
						</div>
					</section>
				</div>
			</div>
		)
	);
}
