interface Data {
	code: string | null;
}

export default function Home({ code }: Data) {
	return (
		<div class="font-indieflower grid place-items-center h-dvh select-none">
			<div class="bg-white grid place-items-center relative w-80 h-[345px] rounded-2xl shadow-2xl overflow-hidden">
				<div class="bg-[url('/sashimi.jpg')] bg-cover bg-center absolute top-0 w-full h-40">
				</div>
				<div class="w-full h-32 px-6 absolute bottom-10">
					<p class="font-semibold text-xl">
						{(code === null) ? "Welcome!!" : "Invalid Code!"}
					</p>
					<p class="text-sm text-slate-500">
						{(code === null)
							? "Sebelum masuk, verifikasi akun dulu ya! :3"
							: "Kode ini tidak valid atau sudah kedaluarsa"}
					</p>
					<form>
						<div class="font-sans italic w-full h-16 grid place-items-center">
							<input
								name="code"
								value={code ?? ""}
								type="text"
								placeholder="######"
								class="text-center h-10 w-60 bg-gray-200 rounded-lg"
							>
							</input>
						</div>
					</form>
					<div class="w-full h-6 grid place-items-center font-semibold relative bottom-0">
						<p class="text-xs text-gray-400 absolute bottom-1">
							Tekan "Enter" untuk submit
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
