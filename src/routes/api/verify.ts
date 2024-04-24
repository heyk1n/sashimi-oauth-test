import type { Handlers } from "$fresh/server.ts";
import { STATUS_CODE } from "$std/http/status.ts";

export const handler: Handlers = {
	POST(req, _ctx) {
		const url = new URL(req.url);
		const code = url.searchParams.get("code");

		const headers = new Headers();
		headers.set("Location", "/");
		headers.set("x-valid", String(code === "kitsu"));

		return new Response(null, {
			headers,
			status: STATUS_CODE.Found,
		});
	},
};
