"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { UserAvatar } from "@/components/layout/Header/UserAvatar";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Hàm xử lý hover menu chính
  const handleMenuMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  // Hàm xử lý khi rời khỏi menu
  const handleMenuMouseLeave = () => {
    setActiveMenu(null);
    setActiveSubmenu(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

          {/* Desktop Navigation */}
          <DesktopNavigation
            activeMenu={activeMenu}
            handleMenuMouseEnter={handleMenuMouseEnter}
            handleMenuMouseLeave={handleMenuMouseLeave}
          />

          {/* Right Side Navigation - Ẩn trên mobile */}
          <div className="hidden lg:flex items-center ml-auto mr-8 space-x-6">
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

          {/* Mobile menu button */}
          <div className="lg:hidden absolute right-4">
            <button
              className="text-white hover:text-gray-300 p-2"
              onClick={toggleMobileMenu}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          isOpen={isMobileMenuOpen}
          activeMenu={activeMenu}
          activeSubmenu={activeSubmenu}
          setActiveMenu={setActiveMenu}
          setActiveSubmenu={setActiveSubmenu}
        />
      </div>
    </header>
  );
};

export default Header;
