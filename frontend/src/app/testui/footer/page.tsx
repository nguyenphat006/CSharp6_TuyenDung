"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative text-gray-300" style={{ background: 'linear-gradient(277.42deg, #54151C 0%, #121212 43.92%)' }}>
      {/* Background Image - Now on the right */}
      <div className="absolute right-0 top-0 h-full w-1/3">
        <Image
          src="/img/user/footer-image.svg"
          alt="Footer background"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          {/* Logo and Social Media - Now as first column */}
          <div className="flex flex-col items-center">
            <Image
              src="/img/logo.png"
              alt="IT Work Force Logo"
              width={200}
              height={80}
              className="mb-4"
            />
            <div className="flex justify-center space-x-8">
              {[
                { icon: FaLinkedin, href: "#" },
                { icon: FaFacebookF, href: "#" },
                { icon: FaYoutube, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <social.icon size={28} />
                </Link>
              ))}
            </div>
          </div>

          {/* About Us Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">About Us</h3>
            <ul className="space-y-1">
              {["Home", "About Us", "AI Match Service", "Contact Us", "All Jobs", "FAQ"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campaign Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Campaign</h3>
            <ul className="space-y-1">
              {["IT Story", "Writing Contest", "Featured IT Jobs", "Annual Survey"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms & Conditions Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Terms & Conditions</h3>
            <ul className="space-y-1">
              {["Privacy Policy", "Operating Regulation", "Complaint Handling", "Terms & Conditions", "Press"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Want to post a job?</h3>
            <div className="space-y-2">
              <div>
                <p className="font-semibold">Hồ Chí Minh:</p>
                <p>(+84) 908 800 183</p>
              </div>
              <div>
                <p className="font-semibold">Hà Nội:</p>
                <p>(+84) 908 800 183</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <a href="mailto:lTWorkForce@gmail.com" className="hover:text-white transition-colors duration-300">
                  lTWorkForce@gmail.com
                </a>
              </div>
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Submit contact information
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Copyright © IT VIEC JSC | Tax code: 000000000
          </p>
        </div>
      </div>
    </footer>
  );
}
