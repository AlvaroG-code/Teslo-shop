// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            // Define qué campos esperas en el formulario
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            authorize: async (credentials) => {
                // Validar con Zod
                const parsed = credentialsSchema.safeParse(credentials);
                if (!parsed.success) {
                    console.error("Error de validación", parsed.error);
                    return null;
                }

                // Aquí termina authorize, los callbacks deben ir fuera de providers

                const { email, password } = parsed.data;

                // Aquí conectas con tu BD y verificas al usuario

                const user = await prisma.user.findUnique({
                    where: { email: email.toLocaleLowerCase() },
                });

                if (!user) {
                    console.error("Usuario no encontrado");
                    return null;
                }

                if (!bcryptjs.compareSync(password, user.password)) return null;

                //regresar al usuario sin el password
                const { password: _, ...rest } = user;

                console.log({ rest });

                // Si no coincide -> null si coincide va a pasar al usuario
                return rest;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
});
