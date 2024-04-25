import { deleteCookie, getCookies, STATUS_CODE } from "$std/http/mod.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
	async GET(req, _ctx) {
		const headers = new Headers();
		headers.set("Location", "/");

		const cookies = getCookies(req.headers);
		const token = cookies["token"];

		const kv = await Deno.openKv();
		await kv.delete(["users", token]);

		deleteCookie(headers, "token", {
			path: "/",
		});

		return new Response(null, {
			headers,
			status: STATUS_CODE.Found,
		});
	},
};
