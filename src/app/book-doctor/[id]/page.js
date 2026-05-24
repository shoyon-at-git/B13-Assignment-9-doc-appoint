import AddBookingForm from "@/components/AddBookingForm";
import React from "react";

const AddDoctorBookingPage = async ({ params }) => {

    const { id } = await params;

    // Fetch doctor data
    const res = await fetch(`http://localhost:4000/view-doctor/${id}`, {
        cache: "no-store",
    });

    const doctor = await res.json();

    return (
        <div>
        
        <AddBookingForm doctor={doctor}></AddBookingForm>
        </div>
    );
};

export default AddDoctorBookingPage;