import { API, type APIUser } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { Handlers } from "$fresh/server.ts";
import { setCookie, STATUS_CODE } from "$std/http/mod.ts";

const api = new API(new REST().setToken(Deno.env.get("DISCORD_TOKEN")!));

export const handler: Handlers = {
	async GET(req, _ctx) {
		const url = new URL(req.url);
		const code = url.searchParams.get("code")!;

		const { access_token } = await api.oauth2
			.tokenExchange({
				client_id: Deno.env.get("DISCORD_ID")!,
				client_secret: Deno.env.get("DISCORD_SECRET")!,
				code,
				grant_type: "authorization_code",
				redirect_uri: `${Deno.env.get("REDIRECT_URL")}/api/auth`,
			});

		const userClient = new API(
			new REST({ authPrefix: "Bearer" }).setToken(access_token),
		);
		const member = await userClient.users.getGuildMember(
			Deno.env.get("DISCORD_GUILD_ID")!,
		);
		const isVerified = member.roles.includes(
			Deno.env.get("DISCORD_MEMBER_ROLE_ID")!,
		);

		const token = `sashimi_${crypto.randomUUID()}`;

		const kv = await Deno.openKv();
		const atomic = kv.atomic();
		const kvKey = ["users", token];

		atomic.set(
			[...kvKey, "user"],
			{
				id: member.user!.id,
				avatar: member.user!.avatar,
			} satisfies Pick<APIUser, "id" | "avatar">,
		);
		atomic.set([...kvKey, "isVerified"], isVerified);

		const headers = new Headers();
		headers.set("Location", "/v2");

		setCookie(headers, {
			name: "token",
			value: token,
			maxAge: 86400,
			path: "/",
		});

		await atomic.commit();

		return new Response(null, {
			headers,
			status: STATUS_CODE.Found,
		});
	},
};
