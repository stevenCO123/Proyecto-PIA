import { db } from "$lib/database";
import { Usuarios } from "$lib/database/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";


export const load = async () => {
    const result = await db
        .select({
            id: Usuarios.id,
            codigo: Usuarios.codigo,
            documento: Usuarios.documento,
            clave: Usuarios.clave
        })
        .from(Usuarios)

    return { result };
}

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


        for (const item of result) {
            if (
                codi_form === item.codigo &&
                docu_form === item.documento &&
                clav_form === item.clave
            ) {

                cookies.set('ident', item.id, { path: '/'});
                window.location.assign("/pagina/inicio");

            }
        }
    }
}