import { db } from "$lib/database";
import { Condicion, Estados, Inventario, Lugares, Tipos } from '$lib/database/schema'
import { eq, and, like } from "drizzle-orm";
import { fail} from "@sveltejs/kit";

export const load = async () => {
    const result = await db
        .select({
            id: Inventario.id,
            nombre_art: Inventario.nombre_art,
            cantidad: Inventario.cantidad,
            id_lugar: Inventario.id_lugar,
            id_tipo: Inventario.id_tipo,
            id_condicion: Inventario.id_condicion,
            id_estado: Inventario.id_estado,
            lugar_des: Lugares.descripcion,
            tipo_des: Tipos.descripcion,
            condicion_des: Condicion.descripcion,
            estado_des: Estados.descripcion
        })
        .from(Inventario)
        .fullJoin(Lugares, eq(Lugares.id, Inventario.id))
        .fullJoin(Tipos, eq(Tipos.id, Inventario.id))
        .fullJoin(Condicion, eq(Condicion.id, Inventario.id))
        .fullJoin(Estados, eq(Estados.id, Inventario.id))

    return { result };
}

export const actions = {
    filtrar: async ({ request }) => {
        const data = await request.formData();

        let sele_lugar = data.get("lugares");
        let sele_tipo = data.get("tipos");
        let sele_condicion = data.get("condiciones");
        let sele_estado = data.get("estados");

        if (!sele_lugar) {
            sele_lugar = '%%'
        }

        if (!sele_tipo) {
            sele_tipo = '%%'
        }

        if (!sele_condicion) {
            sele_condicion = '%%'
        }

        if (!sele_estado) {
            sele_estado = '%%'
        }

        const result = await db
            .select({
                id: Inventario.id,
                nombre_art: Inventario.nombre_art,
                cantidad: Inventario.cantidad,
                id_lugar: Inventario.id_lugar,
                id_tipo: Inventario.id_tipo,
                id_condicion: Inventario.id_condicion,
                id_estado: Inventario.id_estado,
                lugar_des: Lugares.descripcion,
                tipo_des: Tipos.descripcion,
                condicion_des: Condicion.descripcion,
                estado_des: Estados.descripcion
            })
            .from(Inventario)
            .fullJoin(Lugares, eq(Lugares.id, Inventario.id))
            .fullJoin(Tipos, eq(Tipos.id, Inventario.id))
            .fullJoin(Condicion, eq(Condicion.id, Inventario.id))
            .fullJoin(Estados, eq(Estados.id, Inventario.id))

            .where(and(
                like(Inventario.id_lugar, sele_lugar),
                like(Inventario.id_tipo, sele_tipo),
                like(Inventario.id_condicion, sele_condicion),
                like(Inventario.id_estado, sele_estado)
            ))

            if(result && result.length !== 0){
                return {filtracion : true}
            }
            else{
                return fail(402, {
                    no_found: true
                });
            }
    }
}