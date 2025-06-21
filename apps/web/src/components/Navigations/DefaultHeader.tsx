"use client";
import { Button } from "@mantine/core";
import Image from "next/image";

export const DefaultHeader = (): React.ReactNode => {
	return (
		<header className="flex justify-between items-center px-[10px] shadow-md h-[50px]">
			<Image src="/images/logo.png" alt="gemba" width={130} height={50} />
			<div className="flex gap-2">
				<Button variant="transparent" color="var(--color-text-black)">
					ログイン
				</Button>
			</div>
		</header>
	);
};
