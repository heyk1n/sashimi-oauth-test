import { deleteCookie, STATUS_CODE } from "$std/http/mod.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
	GET(_req, _ctx) {
		const headers = new Headers();
		headers.set("Location", "/");

		deleteCookie(headers, "access_token", { path: "/" });
		deleteCookie(headers, "refresh_token", { path: "/" });

		return new Response(null, {
			headers,
			status: STATUS_CODE.Found,
		});
	},
};
