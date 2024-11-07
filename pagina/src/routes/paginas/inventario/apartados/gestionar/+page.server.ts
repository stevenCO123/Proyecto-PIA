import { db } from "$lib/server/database";
import { condicion, docentes, encargados, estados, inventario, lugares, prestamos, tipos, usuarios } from '$lib/server/database/schema'
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

    const pedidos = await db
      .select({
        idPrestamo: prestamos.id,
        nombreRecibe: docentes.nombre,
        apellidoRecibe: docentes.apellido,
        articuloSolicitado: inventario.nombreArt,
        cantidad: prestamos.cantidad,
        descripcion: prestamos.descripcion,
        fechaSolicitud: prestamos.fechaSolicitud,
        fechaDevueltaPropuesta: prestamos.fechaDevueltaPropuesta
        
      })
      .from(prestamos)
      .leftJoin(docentes, eq(docentes.id , prestamos.idRecibe))
      .leftJoin(inventario, eq(inventario.id, prestamos.idArticulo))
      .where(eq(prestamos.idPrestador, usuario));
      
        let fecha_devuelta_propuesta = pedidos[0].fechaDevueltaPropuesta?.toString();
        
        let año = fecha_devuelta_propuesta?.substring(0, 4); //0123 mocha en: 4
        let mes = fecha_devuelta_propuesta?.substring(4, 6); //45 mocha en: 6
        let dia = fecha_devuelta_propuesta?.substring(6, 8); //67 mocha en: 8

        let fecha_Solicitud = pedidos[0].fechaSolicitud?.toString();

        let año_soli= fecha_Solicitud?.substring(0,4);
        let mes_soli= fecha_Solicitud?.substring(4,6);
        let dia_soli= fecha_Solicitud?.substring(6,8);

        console.log("Año:", año);  // Salida: "2024"
        console.log("Mes:", mes);   // Salida: "11"
        console.log("Día:", dia);    // Salida: "07"
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

    const LTCE_unico = 
    {
        tipo: result.filter((item, index, self) => index === self.findIndex((t) => (t.id_tipo === item.id_tipo && t.tipo_des === item.tipo_des))),
        condicion: result.filter((item, index, self) => index === self.findIndex((t) => (t.id_condicion === item.id_condicion && t.condicion_des === item.condicion_des))),
        estado: result.filter((item, index, self) => index === self.findIndex((t) => (t.id_estado === item.id_estado && t.estado_des === item.estado_des)))
    }

    salon_usuario = asig[0].lugar_des;

    return {salon_usuario, LTCE_unico, pedidos, fecha_devuelta_propuesta, año, mes, dia,año_soli,mes_soli,dia_soli};
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
    },
}