import type { Metadata } from "next";
import { Alfa_Slab_One, Poppins, Roboto } from "next/font/google";
import "./globals.css";

// 🪄 Load fonts via next/font/google
const alfa = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alfa",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Media Graphics",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alfa.variable} ${poppins.variable} ${roboto.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
