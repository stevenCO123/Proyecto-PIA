import { db } from "$lib/database";
import { docentes} from "$lib/database/schema";
import { eq} from "../../../../node_modules/drizzle-orm/expressions";

export const load = async ({locals}) => {
	const usuario = locals.user?.id;

  const asig = await db
    .select()
    .from(docentes)
    .where(eq(docentes.idUsuario,usuario));

  const img_usuario = asig[0].imagen;
  const nom_usuario = asig[0].nombre;
  const ape_usuario = asig[0].apellido;
    
  
  return {img_usuario, nom_usuario, ape_usuario};   
}
  
  