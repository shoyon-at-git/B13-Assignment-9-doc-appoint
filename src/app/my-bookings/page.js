"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
    FaUserMd,
    FaUser,
    FaPhone,
    FaVenusMars,
    FaCalendarAlt,
    FaClock,
    FaTrash,
    FaEdit,
    FaCalendarTimes,
} from "react-icons/fa";

const MyBookings = () => {
    const { data: session } = authClient.useSession();
    const userEmail = session?.user?.email;

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmId, setConfirmId] = useState(null);


    useEffect(() => {
        if (!userEmail) return;

        (async () => {
            try {
                const res = await fetch(
                    `http://localhost:4000/my-bookings?email=${userEmail}`
                );

                const data = await res.json();
                setBookings(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [userEmail]);

    const handleDelete = async (id) => {

        const res = await fetch(`http://localhost:4000/delete-booking/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setBookings((prev) => prev.filter((b) => b._id !== id));
            setConfirmId(null);
        }
    };

    if (!userEmail) return <p className="p-6 min-h-screen">Loading user...</p>;
    if (loading) return <p className="p-6 min-h-screen">Loading bookings...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
                My Bookings{" "}
                <span className="text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded-full ml-2">
                    {bookings.length}
                </span>
            </h1>

            {bookings.length === 0 ? (
                <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">

                    {/* Icon */}
                    <FaCalendarTimes className="text-6xl text-gray-300 mb-4" />

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-700">
                        No bookings found
                    </h2>

                    {/* Subtitle */}
                    <p className="text-gray-500 mt-1">
                        You haven’t booked any appointments yet.
                    </p>

                    <p className="text-sm text-gray-400 mt-2 max-w-md">
                        Once you book an appointment with a doctor, it will appear here.
                    </p>

                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    {bookings.map((b) => (
                        <div
                            key={b._id}
                            className="w-full max-w-2xl mx-auto border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
                        >
                            {/* Doctor */}
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
                                <FaUserMd />
                                {b.doctorName}
                            </div>

                            {/* Patient */}
                            <div className="mt-3 text-sm flex items-center gap-2">
                                <FaUser />
                                {b.patientName}
                            </div>

                            {/* Gender */}
                            <div className="text-sm flex items-center gap-2">
                                <FaVenusMars />
                                {b.gender}
                            </div>

                            {/* Phone */}
                            <div className="text-sm flex items-center gap-2">
                                <FaPhone />
                                {b.phone}
                            </div>

                            {/* Date & Time */}
                            <div className="mt-3 flex flex-col gap-1 text-sm">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt />
                                    {b.appointmentDate}
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaClock />
                                    {b.appointmentTime}
                                </div>
                            </div>

                            {/* Symptoms */}
                            <p className="mt-3 text-sm text-gray-700">
                                <span className="font-semibold">
                                    Symptoms:
                                </span>{" "}
                                {b.symptoms}
                            </p>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 mt-4">
                                <Link href={`/my-bookings/edit/${b._id}`}>
                                    <button
                                        className="flex items-center gap-1 px-3 py-1 cursor-pointer text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                </Link>

                                <button
                                    onClick={() => setConfirmId(b._id)}
                                    className="flex items-center gap-1 px-3 cursor-pointer py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {confirmId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-md w-80">
                        <h2 className="text-lg font-semibold mb-3">
                            Confirm Delete?
                        </h2>

                        <p className="text-sm text-gray-600 mb-4">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmId(null)}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handleDelete(confirmId)}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;