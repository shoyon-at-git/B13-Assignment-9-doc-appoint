import Image from "next/image";
import Link from "next/link";

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative w-full h-100">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className=" object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{doctor.name}</h3>

        <p className="text-sm text-gray-500">
          {doctor.specialty}
        </p>

        <p className="text-sm mt-2">
          <span className="font-medium">Experience:</span>{" "}
          {doctor.experience}
        </p>

        <p className="text-sm">
          <span className="font-medium">Fee:</span> {doctor.fee}৳
        </p>

        <Link href={`/view-doctor/${doctor._id}`}>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}