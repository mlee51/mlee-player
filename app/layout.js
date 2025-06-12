import { Geist, Geist_Mono, Doto, Roboto } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["400"], // Or 'variable' if using the variable font
});

const roboto = Roboto({
  variable: '--font-roboto',
  weight: '500',
  subsets: ['latin'],
});

export const metadata = {
  title: "radio.mlee.live",
  description: "the vault",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
