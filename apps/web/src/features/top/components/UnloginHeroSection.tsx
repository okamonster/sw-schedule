import { Button, Input } from "@mantine/core";
import { FaSearch } from "react-icons/fa";

export const UnloginHeroSection = (): React.ReactNode => {
	return (
		<div className="bg-gradient-to-r mx-auto px-4 from-pink-500 to-purple-600 py-16 grid gap-4 text-center">
			<h1 className="text-4xl font-bold">
				推しの出演情報を
				<br />
				簡単チェック
			</h1>
			<p className="text-md">今すぐ確認！</p>

			<div className="flex items-center justify-center gap-2 w-full">
				<Input
					radius="lg"
					w="250px"
					placeholder="アーティスト名やイベント名で検索"
				/>
				<Button radius="lg" color="var(--color-background-dark)" w="50px">
					<FaSearch />
				</Button>
			</div>
		</div>
	);
};
