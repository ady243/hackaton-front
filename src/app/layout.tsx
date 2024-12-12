import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: "Hackathon",
  description: "welcome to the hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}