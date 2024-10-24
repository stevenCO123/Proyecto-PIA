import { relations } from "drizzle-orm/relations";
import { estados, inventario, condicion, tipos, lugares, prestamos, docentes, encargados, usuarios, sesion } from "./schema";

export const inventarioRelations = relations(inventario, ({one, many}) => ({
	estado: one(estados, {
		fields: [inventario.idEstado],
		references: [estados.id]
	}),
	condicion: one(condicion, {
		fields: [inventario.idCondicion],
		references: [condicion.id]
	}),
	tipo: one(tipos, {
		fields: [inventario.idTipo],
		references: [tipos.id]
	}),
	lugare: one(lugares, {
		fields: [inventario.idLugar],
		references: [lugares.id]
	}),
	prestamos: many(prestamos),
}));

export const estadosRelations = relations(estados, ({many}) => ({
	inventarios: many(inventario),
	prestamos: many(prestamos),
}));

export const condicionRelations = relations(condicion, ({many}) => ({
	inventarios: many(inventario),
}));

export const tiposRelations = relations(tipos, ({many}) => ({
	inventarios: many(inventario),
}));

export const lugaresRelations = relations(lugares, ({many}) => ({
	inventarios: many(inventario),
	encargados: many(encargados),
}));

export const prestamosRelations = relations(prestamos, ({one}) => ({
	estado: one(estados, {
		fields: [prestamos.idEstado],
		references: [estados.id]
	}),
	inventario: one(inventario, {
		fields: [prestamos.idArticulo],
		references: [inventario.id]
	}),
	docente_idRecibe: one(docentes, {
		fields: [prestamos.idRecibe],
		references: [docentes.id],
		relationName: "prestamos_idRecibe_docentes_id"
	}),
	docente_idPrestador: one(docentes, {
		fields: [prestamos.idPrestador],
		references: [docentes.id],
		relationName: "prestamos_idPrestador_docentes_id"
	}),
}));

export const docentesRelations = relations(docentes, ({one, many}) => ({
	prestamos_idRecibe: many(prestamos, {
		relationName: "prestamos_idRecibe_docentes_id"
	}),
	prestamos_idPrestador: many(prestamos, {
		relationName: "prestamos_idPrestador_docentes_id"
	}),
	encargados: many(encargados),
	usuario: one(usuarios, {
		fields: [docentes.idUsuario],
		references: [usuarios.id]
	}),
}));

export const encargadosRelations = relations(encargados, ({one}) => ({
	lugare: one(lugares, {
		fields: [encargados.idLugares],
		references: [lugares.id]
	}),
	docente: one(docentes, {
		fields: [encargados.idDocentes],
		references: [docentes.id]
	}),
}));

export const usuariosRelations = relations(usuarios, ({many}) => ({
	docentes: many(docentes),
	sesions: many(sesion),
}));

export const sesionRelations = relations(sesion, ({one}) => ({
	usuario: one(usuarios, {
		fields: [sesion.usuarioId],
		references: [usuarios.id]
	}),
}));