import { db } from "$lib/database/index";
import { usuarios } from "$lib/database/schema";
import { eq, and } from "drizzle-orm";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from "zod";
import { lucia } from "$lib/database/lucia";
import { verify } from "@node-rs/argon2";
import { hash } from '@node-rs/argon2';

const schema_form = z.object({
    codigo: z.string().regex(/^[0-9]+$/, 'solo debe usar caracteres del 0-9'),
    documento: z.string().regex(/^[0-9]+$/, 'solo debe usar caracteres del 0-9'),
    clave: z.string().regex(/^[0-9]+$/, 'solo debe usar caracteres del 0-9')
})

export const load = (async () => {
    const form = await superValidate(zod(schema_form));
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
        const clav_form = data.get('clave')?.toString() as string | Uint8Array;

        const result = await db
            .select()
            .from(usuarios)
            .where(and(
                eq(usuarios.codigo, codi_form),
                eq(usuarios.documento, docu_form),
            ));

        if (result.length === 0) {
            return message(form, 'No se ha encontrado su usuario porfavor verifique los valores introducidos',
                { status: 402 })
        }

        const result_clave = result[0].clave?.toString() as string;
        const result_id = result[0].id?.toString() as string;

        const clave_hash = await hash(result_clave, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

            const verificacion_clave = await verify(clave_hash, clav_form);
        if (!verificacion_clave) {
            return message(form, "a ocurrido un error porfavor verificar la clave", { status: 400 })
        }

        const session = await lucia.createSession(result_id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        return redirect(302, '/');
    }
}