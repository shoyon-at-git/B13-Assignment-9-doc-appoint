import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TopDoctors from "@/components/TopDoctors";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <TopDoctors></TopDoctors>
      <ServicesSection></ServicesSection>
      <TestimonialsSection></TestimonialsSection>
    </div>
  );
}
