import { Metadata } from "next";
import { inter } from "@/libs/fonts";
import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "BVP Software Task",
};

const RootLayout = ({ children, }: Readonly<PropsWithChildren>) => {
    return (
        <html
            lang={'en'}
        >
            <body
                className={inter.className}
            >
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
