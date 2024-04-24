import { OAuth2Routes, OAuth2Scopes } from "@discordjs/core";

const legacyAuthorizeUrl = new URL(
	"https://discord.com/oauth2/authorize?client_id=1229336138473537596&response_type=code&scope=identify+guilds.members.read",
);
const authorizeUrl = new URL(OAuth2Routes.authorizationURL);
const scopes: OAuth2Scopes[] = [
	OAuth2Scopes.Identify,
	OAuth2Scopes.GuildsMembersRead,
];

authorizeUrl.searchParams.set("client_id", Deno.env.get("DISCORD_ID")!);
authorizeUrl.searchParams.set("response_type", "code");
authorizeUrl.searchParams.set("scope", scopes.join(" "));
authorizeUrl.searchParams.set(
	"redirect_uri",
	`${Deno.env.get("REDIRECT_URL")}/api/auth`,
);

export default function () {
	return (
		<div class="touch-none select-none font-babydoll grid place-items-center h-dvh">
			<div class="bg-white w-64 h-24 rounded-lg shadow-lg">
				<div class="w-full h-full grid place-items-center relative">
					<p class="absolute font-extrabold">
						Login to verify your account!
					</p>
					<a class="absolute bottom-0" href={authorizeUrl.toString()}>
						<div class="bg-purple-400 text-xs px-2 py-1 rounded-lg">
							Login with Discord
						</div>
					</a>
				</div>
			</div>
		</div>
	);
}
