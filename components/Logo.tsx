import Link from "next/link";
import Image from "next/image";

export const Logo = () => (
    <Link href="/" className="flex items-center">
        <Image src="https://firebasestorage.googleapis.com/v0/b/portfolio-f6166.appspot.com/o/logo%2Flogo.png?alt=media&token=cf592a9a-d132-4a4c-abd8-e0269d7bce6c" width={32} height={32} className="h-8 mr-3" alt="Armando's Logo" />
        <span className="self-center text-lg sm:text-2xl font-semibold whitespace-nowrap text-white">Portfolio Dashboard</span>
    </Link>
)