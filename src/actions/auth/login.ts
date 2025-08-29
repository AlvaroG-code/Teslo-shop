"use server";

import { signIn } from "@/auth";
import { z } from "zod";
import { AuthError } from "next-auth";

// Definimos el esquema de validación con Zod
const credentialsSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function loginAction(formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    // Validación
    const parsed = credentialsSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    try {
        // NextAuth v5: signIn desde server actions
        await signIn("credentials", {
            ...parsed.data,
            redirectTo: "/", // redirige si login correcto
        });

        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credenciales incorrectas" };
                default:
                    return { error: "Error al iniciar sesión" };
            }
        }
        throw error;
    }
}
