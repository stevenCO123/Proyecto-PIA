import { db } from "$lib/database";
import { usuarios } from "$lib/database/schema";
import { eq, and } from "drizzle-orm";
import {fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from "zod";

const schema_form = z.object({
    codigo: z.string().regex(/^[0-9]+$/, 'solo debe usar caracteres del 0-9'),
    documento: z.string().regex(/^[0-9]+$/, 'solo debe usar caracteres del 0-9'),
    clave: z.string().regex(/^[0-9]+$/, 'solo debe usar caracteres del 0-9')
})

export const load = (async () => {
    const form = await superValidate(zod(schema_form));
    console.log(form)
    return { form }
});

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const form = await superValidate(data, zod(schema_form));

        if (!form.valid) {
            return fail(400, { form });
        }

        const codi_form = data.get('codigo');
        const docu_form = data.get('documento');
        const clav_form = data.get('clave');

        const result = await db
            .select({
                id: usuarios.id,
                codigo: usuarios.codigo,
                documento: usuarios.documento,
                clave: usuarios.clave
            })
            .from(usuarios)
            .where(and(
                eq(usuarios.codigo, codi_form),
                eq(usuarios.documento, docu_form),
                eq(usuarios.clave, clav_form)
            ))

        if (result.length === 1) {
            const item = result[0];
            cookies.set('ident', item.id.toString(), { path: '/' });
            return redirect(302, '/pagina/inicio');
        }
        else {
            return message(form,'No se ha encontrado su usuario porfavor verifique los valores introducidos',
                {status: 402})
        }
    }
}