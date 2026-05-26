import AddBookingForm from "@/components/AddBookingForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const AddDoctorBookingPage = async ({ params }) => {

    const { id } = await params;
    const {token}=await auth.api.getToken({
        headers: await headers()
    })

    // Fetch doctor data
    const res = await fetch(`http://localhost:4000/view-doctor/${id}`, {
        cache: "no-store",
        headers:{
            authorization: `Bearer ${token}`
        }
    });

    const doctor = await res.json();

    return (
        <div>
        
        <AddBookingForm doctor={doctor}></AddBookingForm>
        </div>
    );
};

export default AddDoctorBookingPage;