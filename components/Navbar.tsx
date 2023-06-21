"use client";
import { Logo } from "./Logo";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const pathname = usePathname();
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const NavTabs = [
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/social-service", label: "Social Service" },
    { href: "/awards", label: "Awards" },
    { href: "/about-me", label: "About Me" },
  ];
  const ToggleButton = () => (
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
      onClick={toggleNavbar}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  );
  const NavItem = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <li>
      <Link
        href={href}
        className={`block py-2 pl-3 pr-4 rounded bg-transparent text-secondary-100 hover:bg-secondary-800 md:hover:bg-transparent md:hover:text-secondary-300 duration-300 md:p-0 ${pathname === href ? "md:text-primary-400 hover:bg-primary-500 md:hover:text-primary-500 md:hover:bg-transparent" : ""}`}
        aria-current="page"
      >
        {children}
      </Link>
    </li>
  );
  return (
    <nav className="bg-midnight-950">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <ToggleButton />
        <div
          className={`${!isNavbarOpen && "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {NavTabs.map(({ href, label }, index) => (
              <NavItem key={index} href={href}>
                {label}
              </NavItem>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
