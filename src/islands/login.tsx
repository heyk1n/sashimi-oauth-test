const authorizeUrl =
	"https://discord.com/oauth2/authorize?client_id=1229336138473537596&response_type=code&redirect_uri=https%3A%2F%2Fanimated-zebra-pvpwg476rq5f6rxx-8000.app.github.dev%2Fauth&scope=identify+guilds.members.read";

export default function Login() {
	return (
		<div class="font-indieflower touch-none grid place-items-center h-dvh">
			<div class="bg-white w-64 h-24 rounded-lg shadow-lg">
				<div class="w-full h-full grid place-items-center relative">
					<p class="absolute font-extrabold">Login to verify your account!</p>
					<a class="absolute bottom-0" href={authorizeUrl}>
						<div class="bg-purple-400 text-xs px-2 py-1 rounded-lg">
							Login with Discord
						</div>
					</a>
				</div>
			</div>
		</div>
	);
}
