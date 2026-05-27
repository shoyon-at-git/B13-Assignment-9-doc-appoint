"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DoctorCard from "./DoctorCard";
import { authClient } from "@/lib/auth-client";

export default function TopDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      const {data:token} = await authClient.token();
      // console.log(token.token);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/top-doctors`)
        
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
      <div className="w-11/12 mx-auto py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm tracking-wide">
          Fetching top doctors...
        </p>
      </div>
    );
  }

  return (
    <section className="w-11/12 mx-auto py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-800">
          Top Doctors
        </h2>
        <p className="text-gray-500 mt-2">
          Trusted professionals ready to care for you
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="w-full transform hover:-translate-y-1 transition duration-300"
          >
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <Link href="/all-doctors">
          <button className="relative overflow-hidden cursor-pointer px-10 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <span className="relative z-10">See More Doctors →</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>
          </button>
        </Link>
      </div>
    </section>
  );
}