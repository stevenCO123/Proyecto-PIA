import { db } from "$lib/database";
import { Usuarios } from "$lib/database/schema";

export const load = async () => {
    const result = await db
    .select({
        id: Usuarios.id,
        codigo:Usuarios.codigo,
        documento: Usuarios.documento,
        clave: Usuarios.clave
    })
    .from(Usuarios)
    
    return { result };
}