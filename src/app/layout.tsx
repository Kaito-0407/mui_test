import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.scss";
import MuiProvider from "@/components/MuiProvider";
import Header from "@/components/Header";
import { currentUser } from "@/data/mockData";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BOARD - 会員制掲示板",
  description: "高級感のあるモノクロデザインの会員制掲示板",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={playfairDisplay.variable}>
      <body>
        <MuiProvider>
          <Header username={currentUser.username} />
          {children}
        </MuiProvider>
      </body>
    </html>
  );
}
