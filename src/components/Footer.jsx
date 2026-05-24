import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaUserMd,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        
        {/* Logo / Brand */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <FaUserMd className="text-blue-400" />
            <span>DocAppoint</span>
          </div>

          <p className="text-gray-400 mt-3 leading-relaxed">
            Care. Book. Heal.
            <br />
            Your health, one appointment away.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>

          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>

            <li>
              <Link href={"/all-appointments"} className="hover:text-white transition">
                Doctors
              </Link>
            </li>

            <li>
              <Link
                href={"/my-bookings"}
                className="hover:text-white transition"
              >
                My Bookings
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>

          <div className="flex gap-4 text-xl text-gray-400">
            <Link href="https://facebook.com" target="_blank">
              <FaFacebookF className="hover:text-white transition cursor-pointer" />
            </Link>

            <Link href="https://x.com" target="_blank">
              <FaXTwitter className="hover:text-white transition cursor-pointer" />
            </Link>

            <Link href="https://instagram.com" target="_blank">
              <FaInstagram className="hover:text-white transition cursor-pointer" />
            </Link>

            <Link href="https://linkedin.com" target="_blank">
              <FaLinkedinIn className="hover:text-white transition cursor-pointer" />
            </Link>
          </div>

          <p className="text-gray-500 mt-4 text-sm">
            Stay connected for updates & health tips.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} DocAppoint. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;