import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
    FaHospital,
    FaLocationDot,
    FaClock,
    FaMoneyBillWave,
    FaStar,
} from "react-icons/fa6";

const DoctorDetailsPage = async ({ params }) => {
    const { id } = await params;

    const {token} =await auth.api.getToken({
        headers : await headers(),
    })
    // console.log(token);
    const res = await fetch(`http://localhost:4000/view-doctor/${id}`, {
        cache: "no-store",
        headers:{
            authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch doctor details");
    }

    const doctor = await res.json();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-95"></div>

                <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <div className="text-white space-y-6">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                                <FaStar className="text-yellow-300" />
                                <span className="font-medium">
                                    Top Rated Specialist
                                </span>
                            </div>

                            <div>
                                <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                                    {doctor.name}
                                </h1>

                                <p className="text-2xl text-blue-100 mt-4 font-medium">
                                    {doctor.specialty}
                                </p>
                            </div>

                            <p className="text-lg text-blue-50 leading-8 max-w-xl">
                                {doctor.description}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-2xl">
                                    <p className="text-blue-100 text-sm">
                                        Experience
                                    </p>

                                    <h3 className="text-3xl font-bold mt-1">
                                        {doctor.experience}
                                    </h3>
                                </div>

                                <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-2xl">
                                    <p className="text-blue-100 text-sm">
                                        Consultation Fee
                                    </p>

                                    <h3 className="text-3xl font-bold mt-1">
                                        ৳ {doctor.fee}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Doctor Image */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="absolute w-[350px] h-[350px] bg-white/20 rounded-full blur-3xl"></div>

                            <div className="relative w-[320px] h-[420px] lg:w-[380px] lg:h-[500px] rounded-[40px] overflow-hidden border border-white/20 shadow-2xl">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Side */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-5">
                                About Doctor
                            </h2>

                            <p className="text-gray-600 leading-8 text-lg">
                                {doctor.description}
                            </p>
                        </div>

                        {/* Availability */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                                    <FaClock className="text-blue-600 text-xl" />
                                </div>

                                <h2 className="text-3xl font-bold text-gray-800">
                                    Available Time Slots
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {doctor.availability?.map((time, index) => (
                                    <div
                                        key={index}
                                        className="px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 hover:scale-105 transition-all duration-300"
                                    >
                                        <p className="font-semibold text-blue-700">
                                            {time}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6">

                        {/* Info Card */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                                Appointment Details
                            </h2>

                            <div className="space-y-6">

                                {/* Hospital */}
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                                        <FaHospital className="text-blue-600 text-xl" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Hospital
                                        </p>

                                        <h3 className="font-bold text-lg text-gray-800">
                                            {doctor.hospital}
                                        </h3>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                                        <FaLocationDot className="text-red-500 text-xl" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Location
                                        </p>

                                        <h3 className="font-bold text-lg text-gray-800">
                                            {doctor.location}
                                        </h3>
                                    </div>
                                </div>

                                {/* Fee */}
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center shrink-0">
                                        <FaMoneyBillWave className="text-green-600 text-xl" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Consultation Fee
                                        </p>

                                        <h3 className="font-bold text-lg text-gray-800">
                                            ৳ {doctor.fee}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <Link href={`/book-doctor/${doctor._id}`}>
                            <button className="w-full mt-10 cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 text-white py-4 rounded-2xl text-lg font-bold">
                                Book Appointment
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailsPage;