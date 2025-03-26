"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaFacebookF, FaYoutube, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    about: false,
    campaign: false,
    terms: false,
    contact: false
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <footer className="relative text-gray-300" style={{ background: 'linear-gradient(277.42deg, #54151C 0%, #121212 43.92%)' }}>
      {/* Background Image - Hidden on mobile */}
      <div className="absolute right-0 top-0 h-full w-1/3 hidden md:block">
        <Image
          src="/img/user/footer-image.svg"
          alt="Footer background"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-6">
          {/* Logo and Social Media */}
          <div className="flex flex-col items-center sm:items-start">
            <Image
              src="/img/logo.png"
              alt="IT Work Force Logo"
              width={200}
              height={80}
              className="mb-4"
            />
            <div className="flex justify-center sm:justify-start space-x-6">
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
                  <social.icon size={24} />
                </Link>
              ))}
            </div>
          </div>

          {/* About Us Column */}
          <div className="text-center sm:text-left">
            <button 
              onClick={() => toggleMenu('about')}
              className="flex items-center justify-center sm:justify-start w-full sm:w-auto text-white font-bold text-lg mb-4"
            >
              About Us
              <span className="ml-2 sm:hidden">
                {openMenus.about ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openMenus.about ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 sm:max-h-96 sm:opacity-100'} overflow-hidden`}>
              <ul className="space-y-2">
                {["Home", "About Us", "AI Match Service", "Contact Us", "All Jobs", "FAQ"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Campaign Column */}
          <div className="text-center sm:text-left">
            <button 
              onClick={() => toggleMenu('campaign')}
              className="flex items-center justify-center sm:justify-start w-full sm:w-auto text-white font-bold text-lg mb-4"
            >
              Campaign
              <span className="ml-2 sm:hidden">
                {openMenus.campaign ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openMenus.campaign ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 sm:max-h-96 sm:opacity-100'} overflow-hidden`}>
              <ul className="space-y-2">
                {["IT Story", "Writing Contest", "Featured IT Jobs", "Annual Survey"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terms & Conditions Column */}
          <div className="text-center sm:text-left">
            <button 
              onClick={() => toggleMenu('terms')}
              className="flex items-center justify-center sm:justify-start w-full sm:w-auto text-white font-bold text-lg mb-4"
            >
              Terms & Conditions
              <span className="ml-2 sm:hidden">
                {openMenus.terms ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openMenus.terms ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 sm:max-h-96 sm:opacity-100'} overflow-hidden`}>
              <ul className="space-y-2">
                {["Privacy Policy", "Operating Regulation", "Complaint Handling", "Terms & Conditions", "Press"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="text-center sm:text-left">
            <button 
              onClick={() => toggleMenu('contact')}
              className="flex items-center justify-center sm:justify-start w-full sm:w-auto text-white font-bold text-lg mb-4"
            >
              Want to post a job?
              <span className="ml-2 sm:hidden">
                {openMenus.contact ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openMenus.contact ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 sm:max-h-96 sm:opacity-100'} overflow-hidden`}>
              <div className="space-y-3">
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
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300 mt-2"
                >
                  Submit contact information
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Copyright © Nguyen Dình Kien | Tax code: 000000000
          </p>
        </div>
      </div>
    </footer>
  );
}
