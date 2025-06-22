import "@mantine/core/styles.css";
import "@/styles/globals.css";
import "@/styles/variables.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
