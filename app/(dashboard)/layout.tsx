import "../globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Armando's Portfolio Dashboard",
  description: "Start now to add your personal information and your projects to your portfolio.",
};

function validateCookie() {
  const token = cookies().get("auth")
  if (token) {
    return;
  }
  redirect("/login")
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  validateCookie()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
