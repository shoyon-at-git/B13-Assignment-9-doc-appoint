'use client'
import { authClient } from '@/lib/auth-client';
import React from 'react';
import {
    FaUserMd,
    FaUser,
    FaPhoneAlt,
    FaVenusMars,
    FaCalendarAlt,
    FaClock,
    FaHospital,
    FaMoneyBillWave,
} from "react-icons/fa";
import { toast } from 'react-toastify';

const AddBookingForm = ({doctor}) => {
    const {data:session}= authClient.useSession();
    console.log(session?.user?.email);
    const addBooking = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const patientInfo = Object.fromEntries(formData);
        // console.log(patientInfo);
        const bookingInfo = {
            ...patientInfo,
            doctorName : doctor.name,
            userEmail : session?.user?.email,
        }
        // console.log(bookingInfo);
        const res = await fetch("http://localhost:4000/add-booking", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(bookingInfo),
    });

    const data = await res.json();

    // console.log(data);
    toast.success('Booking Added Successfully');
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">

            <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8">

                    <h1 className="text-4xl font-bold flex items-center gap-4">
                        <FaUserMd />
                        Add Booking for {doctor.name}
                    </h1>

                    <p className="mt-3 text-blue-100 text-lg">
                        Complete the appointment form to confirm the booking.
                    </p>

                </div>

                {/* Form Section */}
                <div className="p-8 md:p-10">

                    <form onSubmit={addBooking} className="space-y-8">

                        {/* Doctor Information */}
                        <div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                                Doctor Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">

                                {/* Doctor Name */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Doctor Name
                                    </label>

                                    <div className="relative">
                                        <FaUserMd className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                        <input
                                            type="text"
                                            value={doctor.name}
                                            disabled
                                            className="w-full bg-gray-100 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-700 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Specialty */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Specialty
                                    </label>

                                    <div className="relative">
                                        <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                        <input
                                            type="text"
                                            value={doctor.specialty}
                                            disabled
                                            className="w-full bg-gray-100 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-700 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Consultation Fee */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Consultation Fee
                                    </label>

                                    <div className="relative">
                                        <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                        <input
                                            type="text"
                                            value={`৳ ${doctor.fee}`}
                                            disabled
                                            className="w-full bg-gray-100 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-700 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Hospital */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Hospital
                                    </label>

                                    <div className="relative">
                                        <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                        <input
                                            type="text"
                                            value={doctor.hospital}
                                            disabled
                                            className="w-full bg-gray-100 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-700 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Patient Information */}
                        <div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                                Patient Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">

                                {/* Patient Name */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Patient Name
                                    </label>

                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                        <input
                                            type="text"
                                            name='patientName'
                                            placeholder="Enter patient name"
                                            className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Gender
                                    </label>

                                    <div className="relative">
                                        <FaVenusMars className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                        <select
                                            name='gender'
                                            defaultValue=""
                                            className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option>Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Phone Number
                                    </label>

                                    <div className="relative">
                                        <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                        <input
                                            type="text"
                                            name='phone'
                                            placeholder="01XXXXXXXXX"
                                            className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Appointment Date
                                    </label>

                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                        <input
                                            type="date"
                                            name='appointmentDate'
                                            className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Time */}
                                <div>

                                    <div className="flex items-center justify-between mb-2">

                                        <label className="text-sm font-medium text-gray-700 block">
                                            Appointment Time
                                        </label>

                                        <span className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-medium">
                                            Available: {doctor.availability?.join(", ")}
                                        </span>

                                    </div>

                                    <div className="relative">
                                        <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                        <input
                                            type="time"
                                            name='appointmentTime'
                                            className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                </div>

                            </div>

                            {/* Symptoms */}
                            <div className="mt-6">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Symptoms / Notes
                                </label>

                                <textarea
                                    rows={5}
                                    name='symptoms'
                                    placeholder="Describe symptoms..."
                                    className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl cursor-pointer font-bold text-lg hover:scale-[1.01] transition-all duration-300 shadow-lg"
                        >
                            Confirm Booking
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AddBookingForm;