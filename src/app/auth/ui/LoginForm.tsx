"use client";

import { useState } from "react";
import { loginAction } from "@/actions/auth/login";
import Link from "next/link";

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await loginAction(formData);
        if (res?.error) setError(res.error);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="email">Correo electrónico</label>
            <input
                id="email"
                name="email" // 👈 IMPORTANTE para que FormData lo recoja
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                required
            />

            <label htmlFor="password">Contraseña</label>
            <input
                id="password"
                name="password" // 👈 IMPORTANTE
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                required
            />

            <button type="submit" className="btn-primary">
                Ingresar
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* divisor line */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center"
            >
                Crear una nueva cuenta
            </Link>
        </form>
    );
}
