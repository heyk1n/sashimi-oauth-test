import { API } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { Handlers } from "$fresh/server.ts";
import { setCookie, STATUS_CODE } from "$std/http/mod.ts";

const api = new API(new REST().setToken(Deno.env.get("DISCORD_TOKEN")!));

export const handler: Handlers = {
	async GET(req, _ctx) {
		const url = new URL(req.url);
		const code = url.searchParams.get("code")!;

		const { access_token, expires_in, refresh_token } = await api.oauth2
			.tokenExchange({
				client_id: Deno.env.get("DISCORD_ID")!,
				client_secret: Deno.env.get("DISCORD_SECRET")!,
				code,
				grant_type: "authorization_code",
				redirect_uri: url.origin + url.pathname,
			});

		const headers = new Headers();
		headers.set("Location", "/");

		setCookie(headers, {
			name: "access_token",
			value: access_token,
			httpOnly: true,
			expires: expires_in * 1000,
		});
		setCookie(headers, {
			name: "refresh_token",
			value: refresh_token,
			httpOnly: true,
		});

		return new Response(null, {
			headers,
			status: STATUS_CODE.PermanentRedirect,
		});
	},
};
