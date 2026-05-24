"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { toast } from "react-toastify";
import { FaUserMd} from "react-icons/fa";

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);

    const { data: session } = authClient.useSession();

    // console.log(session);

    const user = session?.user;

    // console.log(user);

    const handleLogOut = async () => {
        try {
            await authClient.signOut();

            toast.success("Logged out successfully");

            router.push("/");
        } catch (err) {
            console.log(err);

            toast.error("Logout failed");
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "All Appointments", path: "/all-appointments" },
        { name: "Dashboard", path: "/dashboard" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-xl font-bold text-white shadow-md">
                        <FaUserMd></FaUserMd>
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

                <ul className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                href={link.path}
                                className={`relative font-medium transition hover:text-sky-500 ${
                                    pathname === link.path
                                        ? "font-semibold text-sky-600"
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
                            <div className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-2">
                                <Image
                                    src={user.image}
                                    referrerPolicy="no-referrer"
                                    width={48}
                                    height={48}
                                    alt="user"
                                    className="h-11 w-11 rounded-full border-2 border-sky-500 object-cover"
                                />

                                <div className="hidden xl:block">
                                    <h3 className="text-sm font-semibold text-slate-800">
                                        {user.name}
                                    </h3>

                                    <p className="max-w-[180px] truncate text-xs text-slate-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogOut}
                                className="cursor-pointer rounded-full border border-red-200 px-5 py-2 font-medium text-red-500 transition hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-3xl text-slate-700 lg:hidden"
                >
                    {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                </button>
            </nav>

            <div
                className={`overflow-hidden transition-all duration-300 lg:hidden ${
                    menuOpen
                        ? "max-h-[500px] border-t opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="space-y-4 bg-white px-4 py-6">
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
                                    className="rounded-full border px-5 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-100"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="rounded-full bg-sky-500 px-5 py-3 text-center font-medium text-white transition hover:bg-sky-600"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 rounded-2xl bg-slate-100 p-3">
                                    <Image
                                        src={
                                            user.image ||
                                            "/default-user.png"
                                        }
                                        width={48}
                                        height={48}
                                        alt="user"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />

                                    <div className="min-w-0">
                                        <h3 className="truncate font-semibold text-slate-800">
                                            {user.name}
                                        </h3>

                                        <p className="truncate text-sm text-slate-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogOut}
                                    className="w-full rounded-full border border-red-200 px-5 py-3 font-medium text-red-500 transition hover:bg-red-50"
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