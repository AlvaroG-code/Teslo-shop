/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // App Router
        "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router (opcional, por si lo usas)
        "./components/**/*.{js,ts,jsx,tsx}", // Componentes personalizados
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
