import { db } from "$lib/server/database";
import { condicion, encargados, estados, inventario, lugares, tipos, usuarios } from '$lib/server/database/schema'
import { eq, and, like } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

let salon_usuario: any;

export const load = async ({locals }) => {
    const usuario = locals.user?.id;
    const asig = await db
      .select({lugar_des: lugares.descripcion})
      .from(encargados)
      .leftJoin(lugares, eq(lugares.id, encargados.idLugares))
      .where(eq(encargados.idDocentes,usuario));

    salon_usuario = asig[0].lugar_des;

    const result = await db
        .select({
            id_tipo: inventario.idTipo,
            id_condicion: inventario.idCondicion,
            id_estado: inventario.idEstado,
            tipo_des: tipos.descripcion,
            condicion_des: condicion.descripcion,
            estado_des: estados.descripcion,
        })
        .from(inventario)
        .leftJoin(tipos, eq(tipos.id, inventario.idTipo))
        .leftJoin(condicion, eq(condicion.id, inventario.idCondicion))
        .leftJoin(estados, eq(estados.id, inventario.idEstado))

        const LTCE_unico = {
            tipo: result.filter((item, index, self) => index === self.findIndex((t) => (t.id_tipo === item.id_tipo && t.tipo_des === item.tipo_des))),
            condicion: result.filter((item, index, self) => index === self.findIndex((t) => (t.id_condicion === item.id_condicion && t.condicion_des === item.condicion_des))),
            estado: result.filter((item, index, self) => index === self.findIndex((t) => (t.id_estado === item.id_estado && t.estado_des === item.estado_des)))
        }

    return {salon_usuario, LTCE_unico};
}

export const actions = {
    filtrar: async ({ request}) => {
        const data = await request.formData();

        const bar_search = '%' + data.get('bar_search') + '%';
        const sele_tipo = data.get('Tipo');
        const sele_condicion = data.get('Condicion');
        const sele_estado = data.get('Estado');

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
            .leftJoin(lugares, eq(lugares.id, inventario.idLugar))
            .leftJoin(tipos, eq(tipos.id, inventario.idTipo))
            .leftJoin(condicion, eq(condicion.id, inventario.idCondicion))
            .leftJoin(estados, eq(estados.id, inventario.idEstado))
            .where(and(
                like(inventario.nombreArt, bar_search),
                like(lugares.descripcion, salon_usuario),
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