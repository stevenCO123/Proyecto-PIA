import { db } from "$lib/database";
import {Condicion, Estados, Inventario, Lugares, Tipos} from '$lib/database/schema'
import { eq } from "drizzle-orm";

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
        tipos_des: Tipos.descripcion,
        condicion_des: Condicion.descripcion,
        estados_des: Estados.descripcion
    })
    .from(Inventario)
    .fullJoin(Lugares, eq(Lugares.id, Inventario.id))
    .fullJoin(Tipos, eq(Tipos.id, Inventario.id))
    .fullJoin(Condicion, eq(Condicion.id, Inventario.id))
    .fullJoin(Estados, eq(Estados.id, Inventario.id))

    return {result};
}