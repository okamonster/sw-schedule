import { serve } from "@hono/node-server";
import { Hono } from "hono";
import auth from "./routes/auth.js";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/auth", auth);

serve({
	fetch: app.fetch,
	port: 8787,
});
