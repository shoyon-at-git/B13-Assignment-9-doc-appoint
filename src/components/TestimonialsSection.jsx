import Image from "next/image";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "The doctors were very professional and the appointment process was smooth.",
  },
  {
    id: 2,
    name: "Rahim Khan",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Excellent healthcare platform. I found the best cardiologist easily.",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Very user-friendly website and responsive doctors.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 mt-4">
            Trusted by thousands of patients across the country.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-5">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <div className="flex text-yellow-500 mt-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">
                {item.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;