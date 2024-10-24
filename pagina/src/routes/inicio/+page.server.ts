import { db } from "$lib/database/index";
import { usuarios } from "$lib/database/schema";
import { eq, and } from "drizzle-orm";
import {fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from "zod";
import  {lucia}  from "$lib/database/lucia";

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
            .select()
            .from(usuarios)
            .where(and(
                eq(usuarios.codigo, codi_form),
                eq(usuarios.documento, docu_form),
            ));

            console.log(result)

        if (result.length === 0) {
            return message(form,'No se ha encontrado su usuario porfavor verifique los valores introducidos',
                {status: 402})
        }

        try {
            const prueba_1 = await lucia.verifyUserPassword(result[0].clave, clav_form);
            console.log(prueba_1)
        } catch (error) {
            return message(form, "a ocurrido un error porfavor verificar la clave",{status: 400}) 
        }

        const session = await lucia.createSession(result[0].id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		return redirect(302, '/');
        
        /*    default: async ({ cookies, request }) => {
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
        }*/
    }
}