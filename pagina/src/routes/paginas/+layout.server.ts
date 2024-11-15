import {redirect } from "@sveltejs/kit";

export const load = (async ({locals}) => {
    if (!locals.user) 
	{
		return redirect(302, "/registro");
	}
	return {user: locals.user};
});

