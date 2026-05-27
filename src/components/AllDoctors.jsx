"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DoctorCard from "@/components/DoctorCard";
import { authClient } from "@/lib/auth-client";

export default function AllDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
          const {data:token} = await authClient.token();
          // console.log(token.token);
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors`,
              {
              headers:{
                authorization: `Bearer ${token.token}`
              }
            }
            )
            
            const data = await res.json();
            setDoctors(data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-20 flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading doctors...</p>
      </div>
    );
  }

  return (
    <section className="w-11/12 mx-auto py-14">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          All Doctors
        </h1>
        <p className="text-gray-500 mt-2">
          Browse all available specialists and book your appointment
        </p>
      </div>

      {doctors.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No doctors available 😶
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="hover:-translate-y-1 transition duration-300"
            >
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-14 gap-4">
        <Link href="/">
          <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer">
            Back Home
          </button>
        </Link>

        <Link href="/my-bookings">
          <button className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer">
            See your Bookings
          </button>
        </Link>
      </div>
    </section>
  );
}