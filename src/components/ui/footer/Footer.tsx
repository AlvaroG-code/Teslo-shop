import { titleFonts } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link href="/">
                <span
                    className={`${titleFonts.className} antialiased font-bold`}
                >
                    Teslo
                </span>
                <span>| shop</span>
                <span>©{new Date().getFullYear()}</span>
            </Link>
            <Link
                target="_blank"
                href="https://github.com/AlvaroG-code"
                className={`${titleFonts.className} antialiased mx-1 `}
            >
                | GitHub
            </Link>
            <Link
                target="_blank"
                href="https://www.linkedin.com/in/alvaro-garcia-sanchez/"
                className={`${titleFonts.className} antialiased mx-1 `}
            >
                | Linkedin
            </Link>
        </div>
    );
};
