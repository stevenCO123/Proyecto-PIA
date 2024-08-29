import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const Lugares = sqliteTable("Lugares",{
    id: integer ("id").primaryKey(),
    descripcion: text ("descripcion")
});

export const Tipos = sqliteTable("Tipos",{
    id: integer ("id").primaryKey(),
    descripcion: text ("descripcion")
});

export const Condicion = sqliteTable("Condicion",{
    id: integer ("id").primaryKey(),
    descripcion: text ("descripcion")
});

export const Estados = sqliteTable("Estados",{
    id: integer ("id").primaryKey(),
    descripcion: text ("descripcion")
});

export const Inventario = sqliteTable("inventario",{
    id: integer("id").primaryKey(),
    nombre_art: text ("nombre_art"),
    cantidad: integer ("cantidad"),
    id_lugar: integer ("id_lugar").references(() => Lugares.id),
    id_tipo: integer ("id_tipo").references(() => Tipos.id),
    id_condicion: integer ("id_conficion").references(() => Condicion.id),
    id_estado: integer ("id_estado").references(() => Estados.id)
});

export const docentes = sqliteTable("docentes",{
    id: integer("id").primaryKey(),
    imagen: text("imagen"),
    nombre: text("nombre"),
    apellido: text("apellido"),
    id_usuario: integer("id_usuario").references(() => Usuarios.id)
});

export const Usuarios = sqliteTable("Usuarios",{
    id: integer("id").primaryKey(),
    documento: integer("documento"),
    codigo: integer("codigo"),
    clave: integer("clave"),
});

export const encargados = sqliteTable("encargados",{
    id: integer("id").primaryKey(),
    id_docentes: integer("id_docentes").references(() => docentes.id),
    id_lugares: integer("id_lugares").references(() => Lugares.id)
});

export const Prestamos = sqliteTable("Prestamos", {
    id: integer("id").primaryKey(),
    id_prestador: integer("id_prestador").references(() => docentes.id),
    id_recibe: integer("id_recibe").references(() => docentes.id),
    id_articulo: integer("id_articulo").references(() => Inventario.id),
    cantidad: integer("cantidad"),
    descripcion: text("descripcion"),
    fecha_prestado: integer("fecha_prestado"),
    fecha_devuelta_propuesta: integer("fecha_devuelta_propuesta"),
    fecha_devuelta_real: integer("fecha_devuelta_real"),
    id_estado: integer("id_estado").references(() => Estados.id)
});