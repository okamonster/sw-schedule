import { Button, Paper } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
	return (
		<div className="grid gap-2 p-4">
			<div className="flex justify-center mb-4">
				<Image src="/images/logo.png" alt="gemba" width={130} height={50} />
			</div>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<Button leftSection={<FcGoogle />} variant="default" fullWidth>
					Googleでログイン
				</Button>

				<div className="flex items-center my-6">
					<div className="flex-grow border-t border-gray-300" />
					<span className="mx-4 text-gray-500 text-sm">または</span>
					<div className="flex-grow border-t border-gray-300" />
				</div>

				<LoginForm />
			</Paper>

			<p className="text-center text-sm text-text-gray">
				まだアカウントをお持ちでないですか？
				<Link href="/signup">
					<span className="text-blue-500">サインアップ</span>
				</Link>
			</p>
		</div>
	);
}
