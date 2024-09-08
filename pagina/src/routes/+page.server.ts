import { db } from "$lib/database";
import { Usuarios } from "$lib/database/schema";
import { eq, and} from "drizzle-orm";
import { fail, redirect } from "@sveltejs/kit";


export const actions = {
    conectar: async ({ cookies, request }) => {
        const data = await request.formData();
        let codi_form = data.get('codigo');
        let docu_form = data.get('documento');
        let clav_form = data.get('clave');

        const result = await db
            .select({
                id: Usuarios.id,
                codigo: Usuarios.codigo,
                documento: Usuarios.documento,
                clave: Usuarios.clave
            })
            .from(Usuarios)
            .where(and(
                eq(Usuarios.codigo, clav_form),
                eq(Usuarios.documento, codi_form),
                eq(Usuarios.clave, docu_form)
            ))

        if (result.length === 1) {
            const item = result[0];
            cookies.set('ident', item.id.toString(), { path: '/' });
            return redirect(302, '/pagina/inicio');
        }
        else {
            return fail(402, {
                no_found: true
            });
        }

    }
}