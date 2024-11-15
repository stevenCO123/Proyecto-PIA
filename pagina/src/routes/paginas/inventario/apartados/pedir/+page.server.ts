import { db } from "$lib/server/database";
import { docentes, inventario, lugares, encargados, prestamos } from '$lib/server/database/schema'
import { eq, and, like } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { LibsqlError } from '@libsql/client';
import { format } from 'date-fns';

let docente_prestador: any;

export const load = async () => {
    const result = await db
        .select({
            lugar_des: lugares.descripcion,
            lugar_id: lugares.id,
        })
        .from(lugares)
    return { result };
}

export const actions = {
    selecion_docente: async ({ request }) => {
        const data = await request.formData();
        const salon_sele = data.get('Lugar');

        const selecion = await db
            .select({
                encargados_lugar: encargados.idLugares,
                encargados_docentes: encargados.idDocentes,
                docente_id: docentes.id,
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
            .where(and(
                like(encargados.idLugares, salon_sele),
                like(inventario.idLugar, salon_sele),
                like(inventario.idEstado, "1")
            ));

        if (selecion && selecion.length > 0) {
            docente_prestador = selecion[0].docente_id;
            const docente_nombre = selecion[0].docente_nom + " " + selecion[0].docente_ape;
            return { selecion, docente_nombre, docente_sele: true, salon: salon_sele }
        }
    },

    crear: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        const usuario = parseInt(locals.user?.id as string)
        const fechaActual = format(new Date(), 'yyyyMMdd');
        const fechaDevueltaP = format(data.fechadev as string, 'yyyyMMdd');
        try {
            await db.insert(prestamos).values({
                idPrestador: docente_prestador,
                idRecibe: usuario,
                idArticulo: parseInt(data.inventario as string),
                cantidad: parseInt(data.sele_can as string),
                idEstado: 3,
                descripcion: data.mensaje as string,
                fechaSolicitud: parseInt(fechaActual),
                fechaDevueltaPropuesta: parseInt(fechaDevueltaP)
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
