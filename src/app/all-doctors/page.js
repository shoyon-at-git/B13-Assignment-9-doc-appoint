export const metadata = {
  title: "All Doctors | Find & Book Trusted Specialists",
  description:
    "Browse all available doctors, compare specialties, and book appointments with trusted medical professionals easily and quickly.",
  keywords: [
    "all doctors",
    "find doctors",
    "doctor list",
    "book doctor appointment",
    "specialist doctors",
    "healthcare providers",
  ],
  openGraph: {
    title: "All Doctors | Find & Book Trusted Specialists",
    description:
      "Explore a complete list of experienced doctors and book appointments seamlessly.",
    url: "/doctors",
    siteName: "DocAppoint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Doctors | Find & Book Trusted Specialists",
    description:
      "Find the right doctor and book appointments instantly.",
  },
};

import AllDoctorsPage from '@/components/AllDoctors';
import React from 'react';

const page = () => {
  return (
    <div>
      <AllDoctorsPage></AllDoctorsPage>
    </div>
  );
};

export default page;