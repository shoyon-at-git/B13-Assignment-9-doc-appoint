import { FaUserMd, FaAmbulance, FaHospital, FaHeartbeat } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Expert Doctors",
    description: "Consult experienced and verified specialist doctors.",
    icon: <FaUserMd size={35} />,
  },
  {
    id: 2,
    title: "Emergency Care",
    description: "24/7 emergency medical support for patients.",
    icon: <FaAmbulance size={35} />,
  },
  {
    id: 3,
    title: "Modern Hospitals",
    description: "Connected with top-rated hospitals and clinics.",
    icon: <FaHospital size={35} />,
  },
  {
    id: 4,
    title: "Health Monitoring",
    description: "Track your health records and appointments easily.",
    icon: <FaHeartbeat size={35} />,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Our Services
          </h2>
          <p className="text-gray-600 mt-4">
            We provide complete healthcare solutions for patients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300"
            >
              <div className="text-blue-600 flex justify-center mb-4">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;