import { sqliteTable, integer, foreignKey, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const lugares = sqliteTable("Lugares", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	descripcion: text("descripcion", { length: 100 }),
});

export const tipos = sqliteTable("TIpos", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	descripcion: text("descripcion", { length: 50 }),
});

export const estados = sqliteTable("Estados", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	descripcion: text("descripcion", { length: 50 }),
});

export const condicion = sqliteTable("Condicion", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	descripcion: text("descripcion", { length: 50 }),
});

export const inventario = sqliteTable("inventario", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	nombreArt: text("nombre_art", { length: 12 }),
	cantidad: integer("cantidad"),
	idLugar: integer("id_lugar").references(() => lugares.id),
	idTipo: integer("id_tipo").references(() => tipos.id),
	idCondicion: integer("id_condicion").references(() => condicion.id),
	idEstado: integer("id_estado").references(() => estados.id),
});

export const prestamos = sqliteTable("Prestamos", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	idPrestador: integer("id_prestador").references(() => docentes.id),
	idRecibe: integer("id_recibe").references(() => docentes.id),
	idArticulo: integer("id_articulo").references(() => inventario.id),
	cantidad: integer("cantidad"),
	idEstado: integer("id_estado").references(() => estados.id),
	descripcion: text("descripcion", { length: 100 }),
	fechaPrestado: integer("fecha_prestado"),
	fechaDevueltaPropuesta: integer("fecha_devuelta_propuesta"),
	fechaDevueltaReal: integer("fecha_devuelta_real"),
});

export const encargados = sqliteTable("encargados", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	idDocentes: integer("id_docentes").references(() => docentes.id),
	idLugares: integer("id_lugares").references(() => lugares.id),
});

export const usuarios = sqliteTable("Usuarios", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	documento: integer("documento"),
	codigo: integer("codigo"),
	clave: integer("clave"),
});

export const sesion = sqliteTable("sesion", {
	id: text("id").primaryKey(),
	expiresTime: integer("expires_time"),
	usuarioId: integer("usuario_id").references(() => usuarios.id),
});

export const docentes = sqliteTable("docentes", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	imagen: text("imagen"),
	nombre: text("nombre"),
	apellido: text("apellido"),
	idUsuario: integer("id_usuario").references(() => usuarios.id),
});