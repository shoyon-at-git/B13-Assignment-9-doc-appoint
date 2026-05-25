"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

import {
    FaEnvelope,
    FaUser,
    FaCalendarAlt,
    FaShieldAlt,
} from "react-icons/fa";

export default function MyProfilePage() {
    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    if (!user) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center px-4">
                <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800">
                        You are not logged in
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Please login to view your
                        profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800">
                        My Profile
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage your personal
                        information and account
                        details.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
                    {/* Top Banner */}
                    <div className="relative h-52 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500">
                        <div className="absolute -bottom-16 left-8">
                            <Image
                                src={
                                    user.image ||
                                    "/default-user.png"
                                }
                                width={140}
                                height={140}
                                alt="user"
                                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-8 pb-8 pt-20">
                        {/* Name + Button */}
                        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800">
                                    {user.name}
                                </h2>

                                <p className="mt-1 text-slate-500">
                                    Patient Account
                                </p>
                            </div>

                            <Link
                                href="/my-profile/update"
                                className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-sky-600"
                            >
                                Update Profile
                            </Link>
                        </div>

                        {/* Info Grid */}
                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Name */}
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="rounded-full bg-sky-100 p-3 text-sky-600">
                                        <FaUser />
                                    </div>

                                    <h3 className="font-semibold text-slate-700">
                                        Full Name
                                    </h3>
                                </div>

                                <p className="text-lg font-medium text-slate-800">
                                    {user.name}
                                </p>
                            </div>

                            {/* Email */}
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="rounded-full bg-cyan-100 p-3 text-cyan-600">
                                        <FaEnvelope />
                                    </div>

                                    <h3 className="font-semibold text-slate-700">
                                        Email Address
                                    </h3>
                                </div>

                                <p className="break-all text-lg font-medium text-slate-800">
                                    {user.email}
                                </p>
                            </div>

                            {/* User ID */}
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                                        <FaShieldAlt />
                                    </div>

                                    <h3 className="font-semibold text-slate-700">
                                        User ID
                                    </h3>
                                </div>

                                <p className="truncate text-lg font-medium text-slate-800">
                                    {user.id}
                                </p>
                            </div>

                            {/* Account Status */}
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="rounded-full bg-orange-100 p-3 text-orange-600">
                                        <FaCalendarAlt />
                                    </div>

                                    <h3 className="font-semibold text-slate-700">
                                        Account Status
                                    </h3>
                                </div>

                                <p className="text-lg font-medium text-green-600">
                                    Active
                                </p>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="mt-8 rounded-2xl bg-sky-50 p-6">
                            <h3 className="text-xl font-bold text-slate-800">
                                Healthcare Journey
                            </h3>

                            <p className="mt-2 leading-relaxed text-slate-600">
                                Your health data,
                                appointments, and
                                medical interactions
                                are securely managed
                                through DocAppoint.
                                Fast appointments.
                                Smarter healthcare.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}