import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

import Login from "../islands/login.tsx";
import Verify from "../islands/verify.tsx";

interface Data {
	accessToken: string | null;
	code: string | null;
}

export const handler: Handlers<Data> = {
	async POST(req, ctx) {
		const body = await req.formData();
		const code = body.get("code") as string;
		const cookies = getCookies(req.headers);

		return ctx.render({
			code,
			accessToken: cookies["access_token"] ?? null,
		});
	},
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);

		return ctx.render({
			code: null,
			accessToken: cookies["access_token"] ?? null,
		});
	},
};

export default function Home({ data }: PageProps<Data>) {
	const { accessToken, code } = data;

	if (!accessToken) {
		return <Login />;
	} else {
		return <Verify code={code} />;
	}
}
