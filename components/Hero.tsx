"use client";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Hero() {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });
  }, [router])
  return (
    <section className="text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[100%] lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Armando&apos;s Portfolio
            <span className="sm:block">  Dashboard </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Start now to add your personal information and your projects to your portfolio.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/projects"
            >
              Add a new project
            </Link>

            <Link
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/skills"
            >
              Add a new skill
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
