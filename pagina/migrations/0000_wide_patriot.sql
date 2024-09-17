-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Lugares` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`descripcion` text(100)
);
--> statement-breakpoint
CREATE TABLE `TIpos` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`descripcion` text(50)
);
--> statement-breakpoint
CREATE TABLE `Estados` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`descripcion` text(50)
);
--> statement-breakpoint
CREATE TABLE `Condicion` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`descripcion` text(50)
);
--> statement-breakpoint
CREATE TABLE `inventario` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`nombre_art` text(12),
	`cantidad` integer,
	`id_lugar` integer,
	`id_tipo` integer,
	`id_condicion` integer,
	`id_estado` integer,
	FOREIGN KEY (`id_estado`) REFERENCES `Estados`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_condicion`) REFERENCES `Condicion`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_tipo`) REFERENCES `TIpos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_lugar`) REFERENCES `Lugares`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Prestamos` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`id_prestador` integer,
	`id_recibe` integer,
	`id_articulo` integer,
	`cantidad` integer,
	`id_estado` integer,
	`descripcion` text(100),
	`fecha_prestado` integer,
	`fecha_devuelta_propuesta` integer,
	`fecha_devuelta_real` integer,
	FOREIGN KEY (`id_estado`) REFERENCES `Estados`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_articulo`) REFERENCES `inventario`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_recibe`) REFERENCES `docentes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_prestador`) REFERENCES `docentes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `encargados` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`id_docentes` integer,
	`id_lugares` integer,
	FOREIGN KEY (`id_lugares`) REFERENCES `Lugares`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_docentes`) REFERENCES `docentes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Usuarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`documento` integer,
	`codigo` integer,
	`clave` integer
);
--> statement-breakpoint
CREATE TABLE `docentes` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`imagen` text,
	`nombre` text,
	`apellido` text,
	`id_usuario` integer,
	FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id`) ON UPDATE no action ON DELETE no action
);

*/