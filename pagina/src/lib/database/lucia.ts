import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./index";
import { usuarios, session } from "./schema";
import { dev } from "$app/environment";

const db_adaptador = new DrizzleSQLiteAdapter(db, session, usuarios);

export const lucia = new Lucia(db_adaptador,{
    sessionCookie:{
        attributes:{
            secure: !dev
        }
    },

    getUserAttributes: (attributes) => {
        return {
            codigo: attributes.codigo,
            documento: attributes.documento
        }
    }
});

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

type DatabaseUserAttributes = {
    codigo: string;
    documento: string;
}

