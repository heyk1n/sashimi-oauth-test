import { Handlers, PageProps } from "$fresh/server.ts";
import Verify from "../islands/verify.tsx";

interface Data {
	code: string | null;
}

export const handler: Handlers<Data> = {
	GET(req, ctx) {
		const url = new URL(req.url);
		const code = url.searchParams.get("code");
		return ctx.render({ code });
	},
};

export default function Home({ data }: PageProps<Data>) {
	const { code } = data;

	return <Verify code={code} />;
}
