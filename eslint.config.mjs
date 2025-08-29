import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ["next"],
        rules: {
            "react/no-unescaped-entities": "off",
            "@next/next/no-page-custom-font": "off",
        },
        overrides: [
            {
                files: ["src/app/**/*.tsx"], // todas las páginas del App Router
                rules: {
                    "import/no-anonymous-default-export": "off",
                    "react/display-name": "off",
                },
            },
        ],
    }),
];

export default eslintConfig;
