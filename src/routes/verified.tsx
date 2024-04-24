export default function () {
	return (
		<div class="grid place-items-center h-dvh">
			<div class="bg-white rounded-lg shadow-2xl w-72 font-babydoll space-y-3 pb-3">
				<div class="w-full h-32 bg-[url('/sashimi.jpg')] bg-cover bg-center">
				</div>
				<div class="grid place-items-center">
					<p class="font-bold">You're verified!!</p>
					<p class="text-xs text-gray-500">
						Thank you for joining and happy chatting~!!
					</p>
				</div>
				<a href="https://discord.gg/sashimi">
					<div class="grid place-items-center h-7 relative">
						<p class="text-sm text-fuchsia-900 absolute bottom-0">
							Back to Sashimi
						</p>
					</div>
				</a>
			</div>
		</div>
	);
}
