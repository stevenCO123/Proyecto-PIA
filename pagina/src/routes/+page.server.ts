import { lucia } from "$lib/database/lucia";
import { redirect } from "@sveltejs/kit";
export const load = (async ({locals}) => {
    if (!locals.user){
        return redirect(302,'/inicio')
    }
    return redirect(302,'/pagina/inicio')
});