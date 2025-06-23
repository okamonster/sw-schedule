import type { User } from "@prisma/client";
import { prismaClient } from "~/libs/prisma.js";

export const getUserByEmailAndPasswordOperation = async (
	email: string,
	password: string,
): Promise<User | null> => {
	const user = await prismaClient.user.findUnique({
		where: {
			email: email,
			password: password,
		},
	});

	if (!user) {
		return null;
	}

	return user;
};

export const createUserOperation = async (
	email: string,
	password: string,
): Promise<User> => {
	const user = await prismaClient.user.create({
		data: {
			email,
			password,
		},
	});

	return user;
};
