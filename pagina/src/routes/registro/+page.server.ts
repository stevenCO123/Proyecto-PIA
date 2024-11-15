import { db } from "$lib/server/database/index";
import { usuarios,schema_registro } from "$lib/server/database/schema";
import { eq, and } from "drizzle-orm";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { lucia } from "$lib/server/database/lucia";
import { verify } from "@node-rs/argon2";
import { hash } from '@node-rs/argon2';

export const load = (async () => {
    const form = await superValidate(zod(schema_registro));
    return { form }
});

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const form = await superValidate(data, zod(schema_registro));
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

        if (result.length === 0) 
        {
            return message(form, 'No se ha encontrado su usuario porfavor verifique los valores introducidos',{ status: 402 })
        }

        const clave_hash = await hash(result[0].clave?.toString() as string, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        const verificacion_clave = await verify(clave_hash, clav_form as string);
        if (!verificacion_clave) 
        {
            return message(form, "a ocurrido un error porfavor verificar la clave", { status: 400 })
        }

        const session = await lucia.createSession(result[0].id?.toString() as string, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        return redirect(302, '/');
    }
}