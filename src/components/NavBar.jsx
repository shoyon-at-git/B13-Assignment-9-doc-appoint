"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState({
    name: "Sanowar",
    photo: "https://i.pravatar.cc/150?img=12",
  });

  const handleLogOut = () => {
    setUser(null);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Appointments", path: "/appointments" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">

        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-xl font-bold text-white shadow-md">
            +
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800">
              DocAppoint
            </h1>
            <p className="text-xs text-slate-500">
              Smart Healthcare
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`relative font-medium transition hover:text-sky-500 ${
                  pathname === link.path
                    ? "text-sky-600 font-semibold"
                    : "text-slate-700"
                }`}
              >
                {link.name}

                {pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-sky-500"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden items-center gap-4 lg:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-full border px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-sky-500 px-5 py-2 font-medium text-white transition hover:bg-sky-600"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Image
                src={user.photo}
                width={48}
                height={48}
                alt="user"
                className="h-11 w-11 rounded-full border-2 border-sky-500 object-cover"
              />

              <button
                onClick={handleLogOut}
                className="rounded-full border border-red-200 px-5 py-2 font-medium text-red-500 transition hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1 lg:hidden"
        >
          <span className="h-[3px] w-6 rounded bg-slate-700"></span>
          <span className="h-[3px] w-6 rounded bg-slate-700"></span>
          <span className="h-[3px] w-6 rounded bg-slate-700"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[500px] border-t opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 px-4 py-6 bg-white">

          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3 font-medium transition ${
                pathname === link.path
                  ? "bg-sky-100 text-sky-600"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4">
            {!user ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="rounded-full border px-5 py-3 text-center font-medium text-slate-700"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-sky-500 px-5 py-3 text-center font-medium text-white"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-100 p-3">
                  <Image
                    src={user.photo}
                    width={48}
                    height={48}
                    alt="user"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {user.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Logged In
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogOut}
                  className="w-full rounded-full border border-red-200 px-5 py-3 font-medium text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}