"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { UserAvatar } from "@/components/layout/Header/UserAvatar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header 
      className="relative border-b border-white/10"
      style={{ background: 'linear-gradient(277.42deg, #54151C 0%, #121212 43.92%)' }}
    >
      <div className="max-w-[1920px] mx-auto px-2">
        <div className="flex items-center h-24">
          {/* Logo */}
          <Logo />
          <Logo isMobile />

          {/* Right Side Navigation */}
          <div className="flex items-center ml-auto mr-8 space-x-6">
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <UserAvatar />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
                  >
                    Đăng Nhập
                  </Link>
                  <span className="text-gray-400">/</span>
                  <Link
                    href="/register"
                    className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
                  >
                    Đăng Ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
