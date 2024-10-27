import { db } from "$lib/database";
import { docentes} from "$lib/database/schema";
import { eq, like } from "../../../../node_modules/drizzle-orm/expressions";

export const load = async ({locals}) => {
		const usuario = locals.user?.id as string

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
  
  