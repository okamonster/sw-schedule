import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className="flex justify-center marble-bg">
				<div className="max-w-[500px] w-full h-full min-h-[100vh] bg-background-light">
					{children}
				</div>
			</body>
		</html>
	);
}
