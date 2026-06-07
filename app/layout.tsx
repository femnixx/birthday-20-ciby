import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ciby's Birthday Arcade",
  description: "An elegant interactive space tailored perfectly for Ciby.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}