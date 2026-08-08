import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HASERA — A signature, not just perfume",
  description: "Discover HASERA signature fragrances: Cleopatra Noir, Georgia Flora and Croesus Gold.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
