"use client";

import React, { useState, useRef, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { useSidebar } from "@/lib/context/SidebarContext";
import { usePageTitle } from "@/lib/context/PageTitleContext";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AdminProfileModal } from "./AdminProfileModal";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";

export const Header = () => {
  const { isExpanded, toggleSidebar, isMobileOpen, toggleMobileSidebar } = useSidebar();
  const { title, subtitle } = usePageTitle();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    router.push("/login");
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 z-40 h-20 bg-white/80 backdrop-blur-md border-b border-gray-200",
        "transition-all duration-300 ease-in-out",
        "right-0",
        {
          "lg:left-80": isExpanded && !isMobileOpen,
          "lg:left-24": !isExpanded && !isMobileOpen,
          "left-0 lg:left-24": !isMobileOpen && !isExpanded,
          "left-0 lg:left-80": isExpanded && !isMobileOpen,
          "left-80": isMobileOpen,
          "left-0": !isMobileOpen
        }
      )}>
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hidden lg:block"
              aria-label="Toggle Sidebar"
            >
              <MdMenu className="w-6 h-6 text-gray-500" />
            </button>
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 lg:hidden"
              aria-label="Toggle Mobile Sidebar"
            >
              <MdMenu className="w-6 h-6 text-gray-500" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h1>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative" ref={dropdownRef}>
              <motion.div 
                className="flex items-center gap-2 md:gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <Image
                    src="/img/logo/logo-avat.png"
                    alt="User"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-white shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500">
                    john@example.com
                  </p>
                </div>
              </motion.div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100"
                  >
                    <button
                      onClick={() => {
                        setIsProfileOpen(true);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <IoSettingsOutline className="w-5 h-5" />
                      Cài đặt tài khoản
                    </button>
                    <div className="h-px bg-gray-100 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                    >
                      <IoLogOutOutline className="w-5 h-5" />
                      Đăng xuất
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <AdminProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}; 