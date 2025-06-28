"use client";
import { Button, Paper, TextInput } from "@mantine/core";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { MapContent } from "@/features/map/components/MapContent";
import { VenueSearchInput } from "./VenueSearchInput";

type Props = {
	onPrev: () => void;
	onNext: () => void;
};

export const SecondEditEventForm = ({ onPrev, onNext }: Props) => {
	const [venueName, setVenueName] = useState("");
	const [venueAddress, setVenueAddress] = useState("");
	const [selectedLocation, setSelectedLocation] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const isLoaded = useApiIsLoaded();

	const handlePlaceSelect = (
		name: string,
		address: string,
		location: { lat: number; lng: number },
	) => {
		setVenueName(name);
		setVenueAddress(address);
		setSelectedLocation(location);
	};

	const handleVenueNameChange = (value: string) => {
		setVenueName(value);
		if (!value) {
			setVenueAddress("");
			setSelectedLocation(null);
		}
	};

	const handleVenueAddressChange = (value: string) => {
		setVenueAddress(value);
		if (!value) {
			setSelectedLocation(null);
			return;
		}
		if (
			isLoaded &&
			typeof window !== "undefined" &&
			window.google &&
			window.google.maps
		) {
			const geocoder = new window.google.maps.Geocoder();
			geocoder.geocode({ address: value }, (results, status) => {
				if (status === "OK" && results && results[0]) {
					setSelectedLocation({
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng(),
					});
				}
			});
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onNext();
	};

	return (
		<form className="grid gap-4" onSubmit={handleSubmit}>
			<Paper className="p-4 grid gap-4" shadow="md" radius="md" withBorder>
				<h2 className="text-lg font-bold text-text-black">会場情報</h2>

				<div className="grid gap-2">
					<VenueSearchInput
						value={venueName}
						onChange={handleVenueNameChange}
						onPlaceSelect={handlePlaceSelect}
						label="会場名"
						description="ライブハウス名など"
						placeholder="会場名を入力してください"
					/>

					<TextInput
						label="会場住所"
						value={venueAddress}
						onChange={(e) => handleVenueAddressChange(e.currentTarget.value)}
						placeholder="住所が自動入力されます"
					/>

					<div className="h-[200px]">
						<MapContent center={selectedLocation || undefined} />
					</div>
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
					次へ
				</Button>
			</div>
		</form>
	);
};
