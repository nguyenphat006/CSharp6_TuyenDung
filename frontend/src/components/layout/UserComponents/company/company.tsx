"use client";

import Image from "next/image";
import Link from "next/link";

interface CompanyProps {
  logo: string;
  name: string;
  skills: string[];
  locations: string[];
  jobCount: number;
  href: string;
}

const Company = ({ logo, name, skills, locations, jobCount, href }: CompanyProps) => {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 cursor-pointer group h-full flex flex-col relative">
        {/* Corner Decoration */}
        <div className="absolute top-0 left-0 w-40 h-40 z-30 pointer-events-none">
          <Image
            src="/img/card.svg"
            alt="corner decoration"
            width={160}
            height={160}
            className="object-contain opacity-100"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo Container */}
          <div className="relative w-40 h-40 mx-auto mb-4 flex-shrink-0">
            <div className="absolute inset-0 bg-gray-50 rounded-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className="object-contain p-3"
            />
          </div>

          {/* Company Name */}
          <h3 className="text-xl font-bold text-black text-center mb-4 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-4 flex-grow">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Location & Job Count */}
          <div className="space-y-2 mt-auto">
            <div className="flex items-center justify-center text-gray-600 text-sm">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {locations.join(" - ")}
            </div>
            <div className="flex items-center justify-center text-green-600 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              {jobCount} Việc làm
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Company;
