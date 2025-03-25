import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <GridShape />
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 font-bold text-gray-800 text-title-md xl:text-title-2xl">
          ERROR
        </h1>

        <Image
          src="/img/error/404.svg"
          alt="404"
          className=""
          width={472}
          height={152}
        />
        <Image
          src="/img/error/404-dark.svg"
          alt="404"
          className=""
          width={472}
          height={152}
        />

        <p className="mt-10 mb-6 text-base text-gray-700 sm:text-lg">
          We can't seem to find the page you are looking for!
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-gray-100 px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-800"
        >
          Back to Home Page
        </Link>
      </div>
      {/* <!-- Footer --> */}
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2">
        &copy; {new Date().getFullYear()} - TailAdmin
      </p>
    </div>
  );
}
