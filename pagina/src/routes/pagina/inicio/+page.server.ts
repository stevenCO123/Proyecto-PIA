import { db } from "$lib/database";
import { docentes} from "$lib/database/schema";
import { eq, like } from "../../../../node_modules/drizzle-orm/expressions";

export const load = async ({cookies}) => {
    const usuario = cookies.get('ident');
    if (!usuario) {
      return { asig: [] };
    }
  
    const asig = await db
      .select({
        img: docentes.imagen,
        nombre: docentes.nombre,
        apellido: docentes.apellido
      })
      .from(docentes)
      .where(eq(docentes.idUsuario,parseInt(usuario)))
  
    return { asig };
  }
  
  