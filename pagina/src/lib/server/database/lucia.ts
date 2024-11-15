import { Lucia, TimeSpan } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./index";
import { usuarios, session } from "./schema";
import { dev } from "$app/environment";

const db_adaptador = new DrizzleSQLiteAdapter(db, session, usuarios);

export const lucia = new Lucia(db_adaptador,{
    sessionCookie:{
        name:"sesion AUDM",
        attributes:{
            secure: !dev
        }
    },
    sessionExpiresIn: new TimeSpan(2, "d"),

    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
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
    id: string;
}

