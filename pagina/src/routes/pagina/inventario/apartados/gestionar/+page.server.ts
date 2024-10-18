import { db } from "$lib/database";
import { docentes, condicion, encargados, estados, inventario, lugares, tipos, usuarios } from '$lib/database/schema'
import { eq, and, like } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
    const usuario = cookies.get('ident');

    const asig = await db
        .select({
            id: docentes.id
        })
        .from(docentes)
        .where(eq(docentes.idUsuario, parseInt(usuario!)))

    const result = await db
        .select({
            id_lugar: inventario.idLugar,
            id_tipo: inventario.idTipo,
            id_condicion: inventario.idCondicion,
            id_estado: inventario.idEstado,
            lugar_des: lugares.descripcion,
            tipo_des: tipos.descripcion,
            condicion_des: condicion.descripcion,
            estado_des: estados.descripcion,
            lugar_encar: encargados.idLugares
        })
        .from(inventario)
        .leftJoin(encargados, eq(encargados.idLugares, lugares.id))
        .leftJoin(lugares, eq(lugares.id, inventario.idLugar))
        .leftJoin(tipos, eq(tipos.id, inventario.idTipo))
        .leftJoin(condicion, eq(condicion.id, inventario.idCondicion))
        .leftJoin(estados, eq(estados.id, inventario.idEstado))
        .where(eq(encargados.idDocentes, asig[0].id))

        const LTCE_unico = {
            tipo: result.filter((item, index, self) => index === self.findIndex((t) => (t.id_tipo === item.id_tipo && t.tipo_des === item.tipo_des))),
            condicion: result.filter((item, index, self) => index === self.findIndex((t) => (t.id_condicion === item.id_condicion && t.condicion_des === item.condicion_des))),
            estado: result.filter((item, index, self) => index === self.findIndex((t) => (t.id_estado === item.id_estado && t.estado_des === item.estado_des)))
        }

    return { result, LTCE_unico};
}

export const actions = {
    filtrar: async ({ request, cookies }) => {
        const data = await request.formData();

        const bar_search = '%' + data.get('bar_search') + '%';
        const sele_tipo = data.get('Tipo');
        const sele_condicion = data.get('Condicion');
        const sele_estado = data.get('Estado');

        const usuario = cookies.get('ident');
        if (!usuario) {
            return fail(402, {
                no_found_usu: true
            });
        }
    
        const asig = await db
            .select({
                id: docentes.id
            })
            .from(docentes)
            .where(eq(docentes.idUsuario, parseInt(usuario)))


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
                estado_des: estados.descripcion,
            })
            .from(inventario)
            .leftJoin(encargados, eq(encargados.idLugares, lugares.id))
            .leftJoin(lugares, eq(lugares.id, inventario.idLugar))
            .leftJoin(tipos, eq(tipos.id, inventario.idTipo))
            .leftJoin(condicion, eq(condicion.id, inventario.idCondicion))
            .leftJoin(estados, eq(estados.id, inventario.idEstado))
            .where(and(
                eq(encargados.idDocentes, asig[0].id),
                like(inventario.nombreArt, bar_search),
                like(inventario.idTipo, sele_tipo),
                like(inventario.idCondicion, sele_condicion),
                like(inventario.idEstado, sele_estado)

            ))

        if (filtro && filtro.length > 0) {
            return { filtro, filtracion: true }
        }
        else {
            return fail(402, {
                no_found: true
            });
        }
    },
    quitar: async () => {
        return { filtracion: false }
    }
}