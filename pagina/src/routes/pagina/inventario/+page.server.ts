import { db } from "$lib/database";
import { condicion, estados, inventario, lugares, tipos } from '$lib/database/schema'
import { eq, and, like } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

export const load = async () => {
    const result = await db
        .select({
            id: inventario.id,
            nombre_art: inventario.nombreArt,
            cantidad: inventario.cantidad,
            id_lugar: inventario.idLugar,
            id_tipo: inventario.idTipo,
            id_condicion: inventario.idCondicion,
            id_estado: inventario.idEstado,
            lugar_des: lugares.descripcion,
            tipo_des: tipos.descripcion,
            condicion_des: condicion.descripcion,
            estado_des: estados.descripcion
        })
        .from(inventario)
        .leftJoin(lugares, eq(lugares.id, inventario.idLugar))
        .leftJoin(tipos, eq(tipos.id, inventario.idTipo))
        .leftJoin(condicion, eq(condicion.id, inventario.idCondicion))
        .leftJoin(estados, eq(estados.id, inventario.idEstado))

    return { result };
}

export const actions = {
    filtrar: async ({ request }) => {
        const data = await request.formData();

        let sele_lugar = data.get('Lugar');
        let sele_tipo = data.get('Tipo');
        let sele_condicion = data.get('Condicion');
        let sele_estado = data.get('Estado');

        const filtro = await db
            .select({
                id: inventario.id,
                nombre_art: inventario.nombreArt,
                cantidad: inventario.cantidad,
                id_lugar: inventario.idLugar,
                id_tipo: inventario.idTipo,
                id_condicion: inventario.idCondicion,
                id_estado: inventario.idEstado,
                lugar_des: lugares.descripcion,
                tipo_des: tipos.descripcion,
                condicion_des: condicion.descripcion,
                estado_des: estados.descripcion
            })
            .from(inventario)
            .leftJoin(lugares, eq(lugares.id, inventario.idLugar))
            .leftJoin(tipos, eq(tipos.id, inventario.idTipo))
            .leftJoin(condicion, eq(condicion.id, inventario.idCondicion))
            .leftJoin(estados, eq(estados.id, inventario.idEstado))

            .where(and(
                like(inventario.idLugar, sele_lugar),
                like(inventario.idTipo, sele_tipo),
                like(inventario.idCondicion, sele_condicion),
                like(inventario.idEstado, sele_estado)

            ))

        if (filtro && filtro.length !== 0) {
            return { filtro, filtracion: true }
        }
        else {
            return fail(402, {
                no_found: true
            });
        }
    },
    quitar: async () => {
        return {filtracion: false}
    }
}