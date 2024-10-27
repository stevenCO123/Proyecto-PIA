import { db } from "$lib/database";
import { docentes, estados, inventario, lugares, tipos, encargados } from '$lib/database/schema'
import { eq, and, like } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { encargadosRelations } from "$lib/database/relations";

export const load = async () => {
    const result = await db
        .select({
            lugar_des: lugares.descripcion,
            lugar_id: lugares.id
        })
        .from(lugares)

    return { result };
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
                docente_ape: docentes.apellido
            })
            .from(encargados)
            .leftJoin(docentes, eq(docentes.id, encargados.idDocentes))
            .where(like(encargados.idLugares, salon_sele))

        if (selecion && selecion.length > 0) {
            console.log(selecion)
            return { selecion, docente_sele: true }
        }

    }
}

