import { db } from "$lib/database";
import { docentes, estados, inventario, lugares, encargados, prestamos } from '$lib/database/schema'
import { eq, and, like } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { LibsqlError } from '@libsql/client';

let docente: any
export const load = async () => {
    const result = await db
        .select({
            lugar_des: lugares.descripcion,
            lugar_id: lugares.id,
        })
        .from(lugares)

    console.log(result);
    const LI_unico = {
        lugar: result.filter((item, index, self) => index === self.findIndex((t) => (t.lugar_id === item.lugar_id && t.lugar_des === item.lugar_des))),

    }
    return { LI_unico, result };
}

export const actions = {
    selecion_docente: async ({ request }) => {
        const data = await request.formData();
        const salon_sele = data.get('Lugar');

        console.log(salon_sele)

        const selecion = await db
            .select({
                encargados_lugar: encargados.idLugares,
                encargados_docentes: encargados.idDocentes,
                docente_nom: docentes.nombre,
                docente_ape: docentes.apellido,
                inventario_des: inventario.nombreArt,
                inventario_id: inventario.id,
                inventario_lugar: inventario.idLugar,
                inventario_can: inventario.cantidad
            })
            .from(encargados)
            .leftJoin(inventario, eq(encargados.idLugares, inventario.idLugar))
            .leftJoin(docentes, eq(docentes.id, encargados.idDocentes))
            .where(and(like(encargados.idLugares, salon_sele), like(inventario.idLugar, salon_sele)))

        if (selecion && selecion.length > 0) {
            console.log(selecion)
            return { selecion, docente_sele: true }
        }

        docente = salon_sele

    },

    crear: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        const usuario = locals.user?.id as string
        const fechaActual = new Date();
        try {
            await db.insert(prestamos).values({
                idPrestador: docente,
                idRecibe: usuario,
                idArticulo: data.inventario,
                cantidad: data.sele_can,
                descripcion: data.mensaje,
                fechaSolicitud: fechaActual,
                fechaDevueltaPropuesta: data.fechadev,
                
            });
        } catch (error) {
            if (error instanceof LibsqlError) {
                console.log(error);
            }

            return fail(500, { error });
        }

        return { success: true };
    }
}
