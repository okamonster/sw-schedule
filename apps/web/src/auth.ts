import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

// biome-ignore lint/suspicious/noExplicitAny: <signIn>
export const { handlers, signIn, signOut, auth }: any = NextAuth({
	providers: [
		Google,
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				const { email, password } = credentials;
				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
						{
							method: "POST",
							body: JSON.stringify({ email, password }),
						},
					);
					if (!response.ok) {
						return null;
					}
					const data = await response.json();

					return {
						id: data.userId,
						email: email as string,
						token: data.token,
					};
				} catch (error) {
					console.error("Credentials authorize error:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			// Googleログインの場合、バックエンドでユーザー作成/取得
			if (account?.provider === "google" && user.email) {
				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								email: user.email,
								googleToken: account.access_token,
							}),
						},
					);

					if (response.ok) {
						const data = await response.json();
						user.id = data.userId;
						return true;
					} else {
						console.error("Backend auth failed:", response.status);
					}
				} catch (error) {
					console.error("Google auth error:", error);
				}
			}
			return true;
		},
		async jwt({ token, user, account }) {
			// 初回ログイン時またはユーザー情報が更新された時
			if (user) {
				token.id = user.id;
				token.email = user.email;
			}

			// Googleログインの場合、account情報からemailを取得
			if (account?.provider === "google" && account.providerAccountId) {
				token.email = user?.email || token.email;
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.AUTH_SECRET,
	basePath: "/api/auth",
});
