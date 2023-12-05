import "../globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Armando's Portfolio Dashboard",
  description:
    "Start now to add your personal information and your projects to your portfolio.",
};

onAuthStateChanged(auth, (user) => {
  if (!user) {
    redirect("/login");
  }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
