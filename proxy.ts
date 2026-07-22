import {
	createProxy
} from "next-i18next/proxy"
import i18nConfig from "./next-i18next.config";

export const proxy = createProxy(i18nConfig);

// Ensure the proxy is only called for relevant paths.
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)",
		"/auth/login",
		"/auth/register",
		"/api/auth/callback",
		"/reset-password",
		"/profile",
		"/prueba2",
	],
};
