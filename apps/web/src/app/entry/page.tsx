"use client";

import { EditProfileForm } from "@/features/profile/components/EditProfileForm";

export default function EntryPage() {
	return (
		<EditProfileForm
			defaultValues={{
				userName: "",
				userDescription: "",
				mainActivityRegion: "",
				userImageUrl: "",
			}}
		/>
	);
}
