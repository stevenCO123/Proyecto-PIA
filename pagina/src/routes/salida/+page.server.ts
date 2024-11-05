import { lucia } from "$lib/database/lucia";
import { redirect } from "@sveltejs/kit";
export const load = (async ({ locals , cookies}) => {
    if (!locals.session) 
    {
        return redirect(302, "../registro");
    };
    await lucia.invalidateSession(locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
    });
    return redirect(302, "../registro");
});
