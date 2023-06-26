"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function validatePassword() {
    const res = await fetch("api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const resJson = await res.json();
    if (!resJson.success) {
      setError("Incorrect password");
    } else {
        router.push("/");
    }
  }

  return (
    <section className="h-[90vh] grid place-content-center">
      <form className="max-w-3xl px-6 py-16 mx-auto text-center">
        <h1 className="text-3xl font-semibold text-gray-100">
          Welcome to your portfolio dashboard
        </h1>
        <p className="max-w-md mx-auto mt-5 text-gray-400">
          Please log in to continue.
        </p>

        <div className="flex flex-col mt-8 space-y-3 sm:-mx-2">
          <div className="flex space-y-3 sm:space-y-0 flex-col sm:flex-row sm:justify-center">
            <input
              id="password"
              type="password"
              className="px-4 py-2 border rounded-md sm:mx-2 bg-gray-200 border-gray-600  focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </div>
          <span className="text-sm text-red-500">{error}</span>
        </div>
      </form>
    </section>
  );
}
