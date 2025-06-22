import "@/styles/globals.css";
import "@/styles/variables.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" data-mantine-color-scheme="light">
			<head>
				<ColorSchemeScript />
			</head>
			<body className="flex justify-center bg-theme">
				<MantineProvider>
					<div className="max-w-[500px] w-full h-full min-h-[100vh] bg-background-light">
						{children}
					</div>
				</MantineProvider>
			</body>
		</html>
	);
}
