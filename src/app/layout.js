import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "DocAppoint | Doctor 24/7",
    template: "%s | DocAppoint",
  },
  description:
    "Book appointments with trusted doctors easily using DocAppoint.",
  keywords: [
    "doctor appointment",
    "medical booking",
    "healthcare",
    "doctors",
    "appointment app",
  ],
  authors: [{ name: "MD. Sanowar Hossain Shoyon" }],
  creator: "MD. Sanowar Hossain Shoyon",

  metadataBase: new URL("https://doc-appoint-shoyon-at-git.vercel.app/"),

  openGraph: {
    title: "DocAppoint",
    description:
      "Book appointments with trusted doctors easily using DocAppoint.",
    url: "https://doc-appoint-shoyon-at-git.vercel.app/",
    siteName: "DocAppoint",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DocAppoint",
    description:
      "Book appointments with trusted doctors easily using DocAppoint.",
    images: ["/banner.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar></NavBar>
        {children}
        <ToastContainer position="top-center" autoClose={3000} />
        <Footer></Footer>
      </body>
    </html>
  );
}
