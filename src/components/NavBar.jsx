"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    HiOutlineMenu,
    HiOutlineX,
} from "react-icons/hi";

import { toast } from "react-toastify";

import {
    FaUserMd,
    FaClipboardList,
    FaUserCircle,
} from "react-icons/fa";

export default function NavBar() {
    const pathname = usePathname();

    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);

    const [dashboardOpen, setDashboardOpen] =
        useState(false);

    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const handleLogOut = async () => {
        try {
            await authClient.signOut();

            toast.success(
                "Logged out successfully"
            );

            router.push("/");
        } catch (err) {
            console.log(err);

            toast.error("Logout failed");
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },

        {
            name: "All Appointments",
            path: "/all-appointments",
        },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-xl font-bold text-white shadow-md">
                            <FaUserMd />
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

                    {/* Desktop Nav */}
                    <div className="hidden items-center gap-8 lg:flex">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        href={
                                            link.path
                                        }
                                        className={`relative font-medium transition hover:text-sky-500 ${
                                            pathname ===
                                            link.path
                                                ? "font-semibold text-sky-600"
                                                : "text-slate-700"
                                        }`}
                                    >
                                        {link.name}

                                        {pathname ===
                                            link.path && (
                                            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-sky-500"></span>
                                        )}
                                    </Link>
                                </li>
                            ))}

                            {/* Dashboard Button */}
                            {user && (
                                <button
                                    onClick={() =>
                                        setDashboardOpen(
                                            true
                                        )
                                    }
                                    className="cursor-pointer font-medium text-slate-700 transition hover:text-sky-500"
                                >
                                    Dashboard
                                </button>
                            )}
                        </ul>
                    </div>

                    {/* Desktop Right */}
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
                                        src={
                                            user.image ||
                                            "/default-user.png"
                                        }
                                        referrerPolicy="no-referrer"
                                        width={48}
                                        height={48}
                                        alt="user"
                                        className="h-11 w-11 rounded-full border-2 border-sky-500 object-cover"
                                    />

                                    <div className="hidden xl:block">
                                        <h3 className="text-sm font-semibold text-slate-800">
                                            {
                                                user.name
                                            }
                                        </h3>

                                        <p className="max-w-[180px] truncate text-xs text-slate-500">
                                            {
                                                user.email
                                            }
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={
                                        handleLogOut
                                    }
                                    className="cursor-pointer rounded-full border border-red-200 px-5 py-2 font-medium text-red-500 transition hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        className="text-3xl text-slate-700 lg:hidden"
                    >
                        {menuOpen ? (
                            <HiOutlineX />
                        ) : (
                            <HiOutlineMenu />
                        )}
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
                    <div className="space-y-4 bg-white px-4 py-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className={`block rounded-xl px-4 py-3 font-medium transition ${
                                    pathname ===
                                    link.path
                                        ? "bg-sky-100 text-sky-600"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Mobile Dashboard */}
                        {user && (
                            <button
                                onClick={() => {
                                    setDashboardOpen(
                                        true
                                    );

                                    setMenuOpen(
                                        false
                                    );
                                }}
                                className="block w-full rounded-xl px-4 py-3 text-left font-medium text-slate-700 transition hover:bg-slate-100"
                            >
                                Dashboard
                            </button>
                        )}

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
                                                {
                                                    user.name
                                                }
                                            </h3>

                                            <p className="truncate text-sm text-slate-500">
                                                {
                                                    user.email
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={
                                            handleLogOut
                                        }
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

            {/* Overlay */}
            <div
                onClick={() =>
                    setDashboardOpen(false)
                }
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                    dashboardOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                }`}
            />

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 z-50 h-screen w-80 bg-white shadow-2xl transition-transform duration-300 ${
                    dashboardOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between border-b p-5">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Dashboard
                        </h2>

                        <p className="text-sm text-slate-500">
                            Welcome back 👋
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setDashboardOpen(
                                false
                            )
                        }
                        className="rounded-full p-2 text-2xl text-slate-600 transition hover:bg-slate-100"
                    >
                        <HiOutlineX />
                    </button>
                </div>

                {/* User Info */}
                {user && (
                    <div className="border-b p-5">
                        <div className="flex items-center gap-4 rounded-2xl bg-slate-100 p-4">
                            <Image
                                src={
                                    user.image ||
                                    "/default-user.png"
                                }
                                width={60}
                                height={60}
                                alt="user"
                                className="h-14 w-14 rounded-full border-2 border-sky-500 object-cover"
                            />

                            <div className="min-w-0">
                                <h3 className="truncate text-lg font-semibold text-slate-800">
                                    {user.name}
                                </h3>

                                <p className="truncate text-sm text-slate-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sidebar Links */}
                <div className="space-y-3 p-5">
                    <Link
                        href="/my-bookings"
                        onClick={() =>
                            setDashboardOpen(
                                false
                            )
                        }
                        className="flex items-center gap-3 rounded-2xl px-4 py-4 font-medium text-slate-700 transition hover:bg-sky-100 hover:text-sky-600"
                    >
                        <FaClipboardList className="text-lg" />

                        My Bookings
                    </Link>

                    <Link
                        href="/my-profile"
                        onClick={() =>
                            setDashboardOpen(
                                false
                            )
                        }
                        className="flex items-center gap-3 rounded-2xl px-4 py-4 font-medium text-slate-700 transition hover:bg-sky-100 hover:text-sky-600"
                    >
                        <FaUserCircle className="text-lg" />

                        My Profile
                    </Link>
                </div>
            </div>
        </>
    );
}