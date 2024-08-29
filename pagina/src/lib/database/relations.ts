import { relations } from "drizzle-orm/relations";
import { Condicion, docentes, encargados, Estados, Inventario, Lugares, Prestamos, Tipos, Usuarios } from "./schema";

export const TiposRelations = relations(Tipos, ({many}) => ({
    Articulos: many(Inventario)
}));

export const CondicionRelations = relations(Condicion, ({many}) => ({
    Articulos: many(Inventario)
}));

export const LugaresRelations = relations(Lugares, ({many}) => ({
    Articulos: many(Inventario),
    encargados: many(encargados)
}));

export const EstadosRelations = relations(Estados, ({many}) => ({
    Articulos: many(Inventario),
    Prestamos: many(Prestamos)
}));

export const InventarioRelations = relations(Inventario, ({one}) => ({
    Tipos: one(Tipos),
    Condicion: one(Condicion),
    Estados: one(Estados),
    Lugares: one(Lugares)
}));

export const UsuariosRelations = relations(Usuarios, ({one}) => ({
    docentes: one(docentes)
}));

export const DocentesRelations = relations(docentes, ({one}) => ({
    Usuarios: one(Usuarios),
    Encargados: one(encargados)
}));

export const DocentesRelation = relations(docentes, ({many}) => ({
    Prestamos: many(Prestamos)
}));

export const EncargadosRelations = relations(encargados,({one}) => ({
    docentes: one(docentes),
    Lugares: one(Lugares)
}));

export const PrestamosRelation = relations(Prestamos,({one}) => ({
    Estados: one(Estados)
}));

export const PrestamosRelations = relations(Prestamos,({many}) => ({
    docentes: many(docentes)
}));