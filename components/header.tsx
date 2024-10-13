"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { getUser, logout } from "@/lib/auth";

const Header = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = user
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/upload", label: "Upload" },
        { href: "/train", label: "Train" },
        { href: "/visualize", label: "Visualize" },
        { href: "/projects", label: "Projects" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/auth", label: "Login" },
      ];

  if (!mounted) {
    return null;
  }

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">ML Application</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`hover:text-primary ${
                    pathname === item.href ? "text-primary font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Button variant="ghost" onClick={handleLogout}>Logout</Button>
              </li>
            )}
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;