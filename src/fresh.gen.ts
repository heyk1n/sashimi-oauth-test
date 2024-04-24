// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_auth from "./routes/api/auth.ts";
import * as $api_deauth from "./routes/api/deauth.ts";
import * as $index from "./routes/index.tsx";
import * as $v2 from "./routes/v2.tsx";
import * as $verified from "./routes/verified.tsx";
import * as $login from "./islands/login.tsx";
import * as $verify from "./islands/verify.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
	routes: {
		"./routes/_404.tsx": $_404,
		"./routes/_app.tsx": $_app,
		"./routes/api/auth.ts": $api_auth,
		"./routes/api/deauth.ts": $api_deauth,
		"./routes/index.tsx": $index,
		"./routes/v2.tsx": $v2,
		"./routes/verified.tsx": $verified,
	},
	islands: {
		"./islands/login.tsx": $login,
		"./islands/verify.tsx": $verify,
	},
	baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
