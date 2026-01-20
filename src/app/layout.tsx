import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers";

export const metadata: Metadata = {
  title: "Invoicely - Invoice & Subscription Management",
  description: "Complete SaaS platform for invoice and subscription management with professional dashboard and full-featured billing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
