"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/firebaseConfig";

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function validatePassword() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-login-credentials":
            setError("The email address or password is invalid.");
            break;
          default:
            setError("An unknown error occurred.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/");
    } else {
      redirect("/login");
    }
  });

  return (
    <section className="h-[90vh] grid place-content-center">
      <form className="max-w-3xl px-6 py-16 mx-auto text-center">
        <h1 className="text-3xl font-semibold text-gray-100">
          Welcome to your portfolio dashboard
        </h1>
        <p className="max-w-md mx-auto mt-5 text-gray-400">
          Please log in to continue.
        </p>

        <div className="flex flex-col mt-8 space-y-4 sm:-mx-2">
          <input
            id="email"
            type="email"
            className="px-4 py-2 border rounded-md sm:mx-2 bg-gray-200 border-gray-600  focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="password"
            type="password"
            className="px-4 py-2 border rounded-md sm:mx-2 bg-gray-200 border-gray-600  focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={async (e) => {
              e.preventDefault();
              await validatePassword();
            }}
          >
            Get Started
          </button>
          <span className="text-sm text-red-500">{error}</span>
        </div>
      </form>
    </section>
  );
}
