import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { mysql2 } from "@lucia-auth/adapter-mysql";
import mysql from "mysql2/promise";
import { github } from "@lucia-auth/oauth/providers";

// expect error (see next section)
/* export const auth = lucia({
	env: import.meta.env.DEV ? "DEV" : "PROD",
	middleware: astro()
});

export type Auth = typeof auth; */

const connectionPool = mysql.createPool({
	host: import.meta.env.DB_HOST, 
    user: import.meta.env.DB_USER, 
    database: import.meta.env.DB_DATABASE,
    password: import.meta.env.DB_PASSWORD,
    connectionLimit: import.meta.env.DB_CONNECTIONLIMIT,
});

export const auth = lucia({
	adapter: mysql2(connectionPool, {
		user: "auth_user",
		key: "user_key",
		session: "user_session"
	}),
	env: import.meta.env.DEV ? "DEV" : "PROD",
	middleware: astro(),

	getUserAttributes: (data) => {
		return {
			githubUsername: data.github_username
		};
	}
});

export const githubAuth = github(auth, {
	clientId: import.meta.env.GITHUB_CLIENT_ID,
	clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;

/* const auth = lucia({
	env: import.meta.env.DEV ? "DEV" : "PROD",
	middleware: astro(),
	adapter: mysql2(connectionPool, {
		user: "auth_user",
		key: "user_key",
		session: "user_session"
	})
}); */