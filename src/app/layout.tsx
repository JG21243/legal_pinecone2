import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata for the Pinecone Legal semantic search sample app.
 * 
 * @constant
 * @type {Metadata}
 * @property {string} title - The title of the application.
 * @property {string} description - A brief description of the application, 
 * explaining its purpose and functionality.
 */
export const metadata: Metadata = {
  title: "Pinecone Legal semantic search sample app",
  description: "A sample app demonstrating how to use Pinecone and Langchain to build a knowledge base of landmark legal cases and run semantic search over them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
