"use client";

import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {

    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        const fetchBooking = async () => {
            const res = await fetch(
                `http://localhost:4000/bookings/${id}`
            );
            const data = await res.json();
            setBooking(data);
        };
        fetchBooking();
    }, [id]);

    const editBooking =async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedBooking = Object.fromEntries(formData.entries());
        // console.log(updatedBooking);
        const res = await fetch(
            `http://localhost:4000/edit-booking/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBooking),
            }
        );
        const data = await res.json();
        console.log(data);
        toast.success('Appointment updated successfully');
        redirect("/my-bookings");
    }

    if (!booking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <form onSubmit={editBooking} className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">

                <h1 className="text-xl font-bold text-center mb-6">
                    Update Appointment
                </h1>

                {/* Doctor */}
                <div className="mb-3">
                    <label className="text-sm text-gray-600">
                        Doctor Name
                    </label>

                    <input
                        type="text"
                        name="doctorName"
                        defaultValue={booking?.doctorName}
                        readOnly
                        className="w-full mt-1 border p-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="text-sm text-gray-600">
                        Email
                    </label>

                    <input
                        type="email"
                        name="userEmail"
                        defaultValue={booking?.userEmail}
                        readOnly
                        className="w-full mt-1 border p-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                </div>

                {/* Patient Name */}
                <div className="mb-3">
                    <label className="text-sm text-gray-600">
                        Patient Name
                    </label>

                    <input
                        type="text"
                        name="patientName"
                        defaultValue={booking?.patientName}
                        className="w-full mt-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Phone */}
                <div className="mb-3">
                    <label className="text-sm text-gray-600">
                        Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        defaultValue={booking?.phone}
                        className="w-full mt-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Date */}
                <div className="mb-3">
                    <label className="text-sm text-gray-600">
                        Appointment Date
                    </label>

                    <input
                        type="date"
                        name="appointmentDate"
                        defaultValue={booking?.appointmentDate}
                        className="w-full mt-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Time */}
                <div className="mb-3">
                    <label className="text-sm text-gray-600">
                        Appointment Time
                    </label>

                    <input
                        type="time"
                        name="appointmentTime"
                        defaultValue={booking?.appointmentTime}
                        className="w-full mt-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Symptoms */}
                <div className="mb-5">
                    <label className="text-sm text-gray-600">
                        Symptoms
                    </label>

                    <textarea
                        rows="3"
                        name="symptoms"
                        defaultValue={booking?.symptoms}
                        className="w-full mt-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <Link href={"/my-bookings"}>
                    <button className="px-4 py-2 cursor-pointer bg-gray-300 rounded-md hover:bg-gray-400">
                        Cancel
                    </button>
                    </Link>

                    <button type="submit" className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded-md hover:bg-green-600">
                        Save Changes
                    </button>
                </div>

            </div>
        </form>
    );
};

export default Page;