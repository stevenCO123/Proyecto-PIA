import { lucia } from "$lib/database/lucia";
import { fail, redirect } from "@sveltejs/kit";

export const load = (async ({locals}) => {
    if (!locals.user) {
		return redirect(302, "/inicio");
	}
	return {
		user: locals.user
	};
});