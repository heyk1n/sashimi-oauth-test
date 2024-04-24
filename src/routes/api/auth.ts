import { API } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { Handlers } from "$fresh/server.ts";
import { setCookie, STATUS_CODE } from "$std/http/mod.ts";

const api = new API(new REST().setToken(Deno.env.get("DISCORD_TOKEN")!));

export const handler: Handlers = {
	async GET(req, _ctx) {
		const url = new URL(req.url);
		const code = url.searchParams.get("code")!;

		const exchangeData = await api.oauth2
			.tokenExchange({
				client_id: Deno.env.get("DISCORD_ID")!,
				client_secret: Deno.env.get("DISCORD_SECRET")!,
				code,
				grant_type: "authorization_code",
				redirect_uri:
					"https://animated-zebra-pvpwg476rq5f6rxx-8000.app.github.dev/api/auth",
			});

		const headers = new Headers();
		headers.set("Location", "/");

		setCookie(headers, {
			name: "access_token",
			value: exchangeData.access_token,
			path: "/",
		});
		setCookie(headers, {
			name: "refresh_token",
			value: exchangeData.refresh_token,
			path: "/",
		});

		return new Response(null, {
			headers,
			status: STATUS_CODE.Found,
		});
	},
};
