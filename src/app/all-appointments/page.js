"use client";

import AllDoctorsPage from "@/components/AllDoctors";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            const result = await authClient.token();
            setToken(result.data.token);
        };

        getToken();
    }, []);
    // console.log(token);

    useEffect(() => {

    if (!token) return;

    const fetchAppointments = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            setAppointments(Array.isArray(data) ? data : []);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    fetchAppointments();

}, [token]);

    const filteredAppointments = appointments.filter((app) =>
        app.doctorName?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <section className="w-11/12 mx-auto py-12">

                {/* Header */}
                <h1 className="text-3xl font-bold text-center mb-8">
                    All Appointments
                </h1>

                {/* 🔎 Search Box */}
                <div className="flex justify-center mb-10">
                    <input
                        type="text"
                        placeholder="Search by doctor name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md px-5 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Results */}
                {filteredAppointments.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No appointments found 😶
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAppointments.map((app) => (
                            <div
                                key={app._id}
                                className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                {/* Doctor */}
                                <h2 className="text-xl font-semibold text-blue-600">
                                    {app.doctorName}
                                </h2>

                                {/* Patient */}
                                <p className="text-gray-600 mt-2">
                                    👤 Patient: {app.patientName}
                                </p>

                                {/* Gender */}
                                <p className="text-gray-600">
                                    ⚧ Gender: {app.gender}
                                </p>

                                {/* Contact */}
                                <p className="text-gray-600">
                                    📞 {app.phone}
                                </p>

                                {/* Date & Time */}
                                <p className="text-gray-600">
                                    📅 {app.appointmentDate}
                                </p>

                                <p className="text-gray-600">
                                    ⏰ {app.appointmentTime}
                                </p>

                                {/* Symptoms */}
                                <p className="text-gray-600">
                                    🧾 Symptoms: {app.symptoms}
                                </p>

                                {/* Email */}
                                <p className="text-gray-400 text-sm mt-2">
                                    {app.userEmail}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <section>
                <AllDoctorsPage></AllDoctorsPage>
            </section>
        </div>
    );
}