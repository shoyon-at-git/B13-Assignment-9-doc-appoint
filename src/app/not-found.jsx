import Link from "next/link";
import { FaHome, FaCalendarCheck, FaStethoscope } from "react-icons/fa";

export default function NotFound() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-default-200 bg-default-100/70 px-4 py-2 backdrop-blur">
                    <FaStethoscope className="text-sm text-primary" />

                    <span className="text-xs font-medium text-default-600 sm:text-sm">
                        DocAppoint Emergency Route Unit
                    </span>
                </div>

                <h1 className="mt-6 text-7xl font-black leading-none tracking-tight text-primary sm:text-8xl md:text-[10rem]">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-5xl">
                    This page skipped its appointment.
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-default-600 sm:text-base md:text-lg">
                    The page you are looking for does not exist, moved somewhere else, or disappeared into the hospital
                    void.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="group flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-primary/40 sm:w-auto"
                    >
                        <FaHome className="text-base text-black transition-transform duration-300 group-hover:scale-110" />

                        <span className="text-black">Back Home</span>
                    </Link>

                    <Link
                        href="/appointments"
                        className="group flex w-full max-w-xs items-center justify-center gap-3 rounded-full border-2 border-primary/20 bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-cyan-400 hover:to-blue-400 hover:shadow-cyan-500/30 sm:w-auto"
                    >
                        <FaCalendarCheck className="text-base transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />

                        <span>Browse Doctors</span>
                    </Link>
                </div>

                <div className="mt-12 sm:mt-16">
                    <div className="relative mx-auto w-full max-w-2xl rounded-[2rem] bg-content1/80 p-6 shadow-2xl backdrop-blur-md sm:p-8 md:p-10">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                                <FaStethoscope className="text-2xl text-black" />
                            </div>
                        </div>

                        <div className="pt-6 sm:pt-8">
                            <h3 className="text-xl font-bold text-foreground sm:text-2xl">Doctor Not Available</h3>

                            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-default-600 sm:text-base">
                                We searched every chamber, hallway, and API route. This page vanished faster than a
                                doctor during tea break.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-600 sm:text-sm">
                                    Secure Booking
                                </span>

                                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-600 sm:text-sm">
                                    Trusted Doctors
                                </span>

                                <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-medium text-purple-600 sm:text-sm">
                                    24/7 Care
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
