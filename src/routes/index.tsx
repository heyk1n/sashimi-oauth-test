import { REST } from "@discordjs/rest";
import { API, type APIGuildMember, type Snowflake } from "@discordjs/core";

import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

import Login from "../islands/login.tsx";
import Verify from "../islands/verify.tsx";
import Verified from "../islands/verified.tsx";

interface Data {
	code: string | null;
	isVerified: boolean;
	isLoggedIn: boolean;
}

export const handler: Handlers<Data> = {
	async POST(req, ctx) {
		const body = await req.formData();
		const code = body.get("code") as string;
		const VALID_CODE = "kitsunee";

		const cookies = getCookies(req.headers);
		const token = cookies["token"];

		if (token) {
			const kv = await Deno.openKv();
			const kvKey = ["users", token];

			const isVerified = await kv.get<boolean>([...kvKey, "isVerified"]);

			if (!isVerified.value) {
				const userId = await kv.get<Snowflake>([...kvKey, "userId"]);

				if (code === VALID_CODE) {
					const api = new API(
						new REST().setToken(Deno.env.get("DISCORD_TOKEN")!),
					);
					await api.guilds.addRoleToMember(
						Deno.env.get("DISCORD_GUILD_ID")!,
						userId.value!,
						Deno.env.get("DISCORD_MEMBER_ROLE_ID")!,
					);

					const updatedVerified = true;

					await kv.set([...kvKey, "isVerified"], updatedVerified);

					return ctx.render({
						isVerified: updatedVerified,
						isLoggedIn: true,
						code: null,
					});
				} else {
					return ctx.render({
						isVerified: false,
						isLoggedIn: true,
						code,
					});
				}
			} else {
				return ctx.render({
					isVerified: isVerified.value,
					isLoggedIn: true,
					code: null,
				});
			}
		} else {
			return ctx.render({
				isVerified: false,
				isLoggedIn: false,
				code: null,
			});
		}
	},
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		const token = cookies["token"];

		if (token) {
			const kv = await Deno.openKv();
			const isVerified = await kv.get<boolean>([
				"users",
				token,
				"isVerified",
			]);

			return ctx.render({
				isVerified: isVerified.value!,
				isLoggedIn: true,
				code: null,
			});
		} else {
			return ctx.render({
				isVerified: false,
				isLoggedIn: false,
				code: null,
			});
		}
	},
};

export default function Home({ data }: PageProps<Data>) {
	const { isVerified, isLoggedIn, code } = data;

	if (!isLoggedIn) {
		return <Login />;
	} else {
		if (isVerified) {
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
