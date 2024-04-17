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
		<div class="grid place-items-center h-dvh">
			<div class="bg-white grid place-items-center relative w-80 h-80 rounded-2xl shadow-2xl overflow-hidden">
				<div class="bg-[url('/sashimi.jpg')] bg-cover bg-center absolute top-0 w-full h-40">
				</div>
				<div class="w-full h-32 px-6 absolute bottom-4">
					<p class="text-xl">Welcome!!</p>
					<p class="text-sm text-slate-500">
						Sebelum masuk, verifikasi akun dulu ya! :3
					</p>
					<form>
						<div class="w-full h-16 grid place-items-center">
							<input
								name="code"
								value={code}
								type="text"
								placeholder="XYZXYZ"
								class="text-center h-10 w-60 bg-gray-200 rounded-lg"
							>
							</input>
						</div>
					</form>
					<div class="w-full h-6 grid place-items-center relative bottom-0">
						<p class="text-xs text-gray-400 absolute bottom-2">
							Tekan "Enter" untuk submit
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
