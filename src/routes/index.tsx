import { REST } from "@discordjs/rest";
import { API, type APIGuildMember, type Snowflake } from "@discordjs/core";

import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

import Login from "../islands/login.tsx";
import Verify from "../islands/verify.tsx";
import Verified from "../islands/verified.tsx";

interface Data {
	code: string | null;
	member?: APIGuildMember;
}

export const handler: Handlers<Data> = {
	async POST(req, ctx) {
		const body = await req.formData();
		const code = body.get("code") as string;
		const cookies = getCookies(req.headers);
		const VALID_CODE = "kitsunee";

		const api = new API(
			new REST().setToken(Deno.env.get("DISCORD_TOKEN")!),
		);

		if (code === VALID_CODE) {
			await api.guilds.addRoleToMember(
				Deno.env.get("DISCORD_GUILD_ID")!,
				cookies["user_id"],
				Deno.env.get("DISCORD_MEMBER_ROLE_ID")!,
			);

			return ctx.render({
				code: null,
				member: await getMember(cookies["access_token"]),
			});
		} else {
			return ctx.render({
				code,
				member: await getMember(cookies["access_token"]),
			});
		}
	},
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		const accessToken = cookies["access_token"];

		return ctx.render({
			code: null,
			member: accessToken ? await getMember(accessToken) : undefined,
		});
	},
};

export default function Home({ data }: PageProps<Data>) {
	const { member, code } = data;

	if (!member) {
		return <Login />;
	} else {
		if (member.roles.includes(Deno.env.get("DISCORD_MEMBER_ROLE_ID")!)) {
			return <Verified />;
		} else {
			return <Verify code={code} />;
		}
	}
}

async function getMember(token: string): Promise<APIGuildMember> {
	const api = new API(new REST({ authPrefix: "Bearer" }).setToken(token));
	return await api.users.getGuildMember(Deno.env.get("DISCORD_GUILD_ID")!);
}
