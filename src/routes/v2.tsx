import { asset } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
	code: string;
}

export const handler: Handlers<Data> = {
	GET(req, ctx) {
		const url = new URL(req.url);
		const code = url.searchParams.get("code") ?? "";
		return ctx.render({ code });
	},
};

export default function Home({ data }: PageProps<Data>) {
	const { code } = data;

	return (
		<div class="bg-[#1e1e1e] grid place-items-center h-dvh touch-none p-6">
			<div class="w-72 rounded-xl overflow-hidden shadow-2xl absolute">
				<img src="/sashimi.jpg"></img>
				<div class="font-babydoll w-full p-6 bg-[#141414]">
					<div class="space-y-4">
						<div>
							<p class="font-bold text-2xl text-white">
								Welcome!!
							</p>
							<p class="text-xs text-[#888888]">
								Sebelum masuk, verifikasi akun kamu terlebih
								dahulu ya~ :3
							</p>
						</div>
						<form method="post">
							<div class="grid place-items-center space-y-4">
								<input
									class="bg-black w-full h-10 rounded-lg placeholder:text-white/25 text-center text-white"
									placeholder="xyzxyz"
								>
								</input>
								<p class="text-[10px] text-slate-500 text-center">
									Tekan 'Enter' di keyboard mu untuk submit.
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
