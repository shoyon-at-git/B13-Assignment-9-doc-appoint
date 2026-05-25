"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import {
    FaEnvelope,
    FaUser,
    FaCalendarAlt,
    FaShieldAlt,
    FaCamera,
} from "react-icons/fa";
import {
    useEffect,
    useState,
} from "react";
import { toast } from "react-toastify";
import { HiOutlineX } from "react-icons/hi";

export default function MyProfilePage() {
    const { data: session } =
        authClient.useSession();

    const user = session?.user;
    console.log(user);

    const [profile, setProfile] =
        useState(null);

    const [openModal, setOpenModal] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: "",
            image: "",
        });

    useEffect(() => {
        if (user) {
            setProfile(user);

            setFormData({
                name: user.name || "",
                image: user.image || "",
            });
        }
    }, [user]);

    if (!profile) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                Loading...
            </div>
        );
    }

    const handleOpenModal = () => {
        setFormData({
            name: profile.name || "",
            image: profile.image || "",
        });

        setOpenModal(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleUpdateProfile =
        async (e) => {
            e.preventDefault();

            try {
                setLoading(true);
                const res = await fetch(
                    "http://localhost:4000/update-user",
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            email:user.email,
                            name:formData.name,
                            image:formData.image,
                        }),
                    }
                );

                const data = await res.json();
                console.log(data);
                setProfile((prev) => ({
                    ...prev,
                    name: formData.name,
                    image:
                        formData.image,
                }));

                setOpenModal(false);

                toast.success(
                    "Profile updated successfully!"
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to update profile"
                );
            } finally {
                setLoading(false);
                // console.log(user.email, formData.name, formData.image);
            }
        };

    return (
        <>
            <div className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800">
                            My Profile
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Manage your
                            personal
                            information and
                            account details.
                        </p>
                    </div>

                    {/* Card */}
                    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
                        {/* Banner */}
                        <div className="relative h-52 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500">
                            <div className="absolute -bottom-16 left-8">
                                <Image
                                    src={
                                        profile.image ||
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
                            {/* Top */}
                            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-800">
                                        {
                                            profile.name
                                        }
                                    </h2>

                                    <p className="mt-1 text-slate-500">
                                        Patient
                                        Account
                                    </p>
                                </div>

                                <button
                                    onClick={
                                        handleOpenModal
                                    }
                                    className="cursor-pointer rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-sky-600"
                                >
                                    Update
                                    Profile
                                </button>
                            </div>

                            {/* Grid */}
                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Name */}
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="rounded-full bg-sky-100 p-3 text-sky-600">
                                            <FaUser />
                                        </div>

                                        <h3 className="font-semibold text-slate-700">
                                            Full
                                            Name
                                        </h3>
                                    </div>

                                    <p className="text-lg font-medium text-slate-800">
                                        {
                                            profile.name
                                        }
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="rounded-full bg-cyan-100 p-3 text-cyan-600">
                                            <FaEnvelope />
                                        </div>

                                        <h3 className="font-semibold text-slate-700">
                                            Email
                                            Address
                                        </h3>
                                    </div>

                                    <p className="break-all text-lg font-medium text-slate-800">
                                        {
                                            profile.email
                                        }
                                    </p>
                                </div>

                                {/* ID */}
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                                            <FaShieldAlt />
                                        </div>

                                        <h3 className="font-semibold text-slate-700">
                                            User
                                            ID
                                        </h3>
                                    </div>

                                    <p className="truncate text-lg font-medium text-slate-800">
                                        {
                                            profile.id
                                        }
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="rounded-full bg-orange-100 p-3 text-orange-600">
                                            <FaCalendarAlt />
                                        </div>

                                        <h3 className="font-semibold text-slate-700">
                                            Account
                                            Status
                                        </h3>
                                    </div>

                                    <p className="text-lg font-medium text-green-600">
                                        Active
                                    </p>
                                </div>
                            </div>

                            {/* Bottom */}
                            <div className="mt-8 rounded-2xl bg-sky-50 p-6">
                                <h3 className="text-xl font-bold text-slate-800">
                                    Healthcare
                                    Journey
                                </h3>

                                <p className="mt-2 leading-relaxed text-slate-600">
                                    Your health
                                    data,
                                    appointments,
                                    and medical
                                    interactions
                                    are securely
                                    managed
                                    through
                                    DocAppoint.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 transition ${openModal
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }`}
            >
                <div
                    className={`w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl transition duration-300 ${openModal
                            ? "translate-y-0 scale-100"
                            : "translate-y-10 scale-95"
                        }`}
                >
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Update Profile
                            </h2>

                            <p className="text-sm text-slate-500">
                                Edit your information
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                setOpenModal(false)
                            }
                            className="rounded-full p-2 text-2xl text-slate-500 transition hover:bg-slate-100"
                        ><HiOutlineX />
                        </button>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={
                            handleUpdateProfile
                        }
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div>
                            <label className="mb-2 block font-medium text-slate-700">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
                                required
                            />
                        </div>

                        {/* Photo */}
                        <div>
                            <label className="mb-2 block font-medium text-slate-700">
                                Photo URL
                            </label>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 pr-12 outline-none transition focus:border-sky-500"
                                />

                                <FaCamera className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>

                        {/* Preview */}
                        {formData.image && (
                            <div className="flex justify-center">
                                <Image
                                    src={formData.image}
                                    width={100}
                                    height={100}
                                    alt="preview"
                                    className="h-24 w-24 rounded-full border-4 border-sky-100 object-cover"
                                />
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenModal(false)
                                }
                                className="flex-1 rounded-2xl border border-slate-200 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                            >Cancel</button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 rounded-2xl bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading
                                    ? "Updating..."
                                    : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}