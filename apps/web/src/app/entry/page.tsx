"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { EditProfileForm } from "@/features/profile/components/EditProfileForm";
import { useSteps } from "@/features/profile/hooks/useSteps";

interface ProfileForm {
	userName: string;
	userDescription: string;
	mainActivityRegion: string;
	userImageFile: File | null;
	userImageUrl: string | null;
}

export default function EntryPage() {
	const { data: session } = useSession();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState<ProfileForm>({
		userName: "",
		userDescription: "",
		mainActivityRegion: "",
		userImageFile: null,
		userImageUrl: null,
	});

	const { currentStep, steps, handleNext, handleBack } = useSteps();

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			// TODO: プロフィール作成APIを呼び出し
			await new Promise((resolve) => setTimeout(resolve, 1000)); // 仮の処理
			router.push("/dashboard");
		} catch (error) {
			console.error("Profile creation failed:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return <EditProfileForm defaultValues={form} />;
}
