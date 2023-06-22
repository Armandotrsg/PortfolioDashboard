import Link from "next/link";

export const Logo = () => (
    <Link href="/" className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
        <span className="self-center text-lg sm:text-2xl font-semibold whitespace-nowrap text-white">Portfolio Dashboard</span>
    </Link>
)