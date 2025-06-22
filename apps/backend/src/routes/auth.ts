import { Hono } from "hono";
import {
	createUserRequestSchema,
	getUserByEmailAndPasswordRequestSchema,
	type ResponseUserDto,
} from "~/entities/user.js";
import {
	createUserOperation,
	getUserByEmailAndPasswordOperation,
} from "~/infrastructures/userOperations.js";

const app = new Hono();

app.post("/login", async (c) => {
	const result = getUserByEmailAndPasswordRequestSchema.safeParse(
		await c.req.json(),
	);

	try {
		if (!result.success) {
			return c.json({ error: "Invalid email format" }, 400);
		}
		const { email, password } = result.data;

		const user = await getUserByEmailAndPasswordOperation(email, password);

		if (!user) {
			return c.json({ error: "User not found" }, 404);
		}

		const responseUser: ResponseUserDto = {
			...user,
		};

		return c.json(responseUser, 200);
	} catch (e) {
		console.error(e);
		return c.json({ error: "Internal server error" }, 500);
	}
});

app.post("/signup", async (c) => {
	const result = createUserRequestSchema.safeParse(await c.req.json());

	try {
		if (!result.success) {
			return c.json({ error: "Invalid request body" }, 400);
		}

		const { email, password } = result.data;

		const user = await createUserOperation(email, password);

		const responseUser: ResponseUserDto = {
			...user,
		};

		return c.json(responseUser, 201);
	} catch (e) {
		console.error(e);
		return c.json({ error: "Internal server error" }, 500);
	}
});

export default app;
