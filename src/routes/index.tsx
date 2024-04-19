import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

import Login from "../islands/login.tsx";
import Verify from "../islands/verify.tsx";

interface Data {
	accessToken: string | null;
	code: string | null;
}

export const handler: Handlers<Data> = {
	GET(req, ctx) {
		const url = new URL(req.url);
		const code = url.searchParams.get("code");
		const cookies = getCookies(req.headers);

		return ctx.render({
			code: url.searchParams.get("code"),
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
