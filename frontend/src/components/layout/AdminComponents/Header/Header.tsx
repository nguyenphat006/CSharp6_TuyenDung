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
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { UserAvatar } from "./UserAvatar";

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
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileSidebar}
            >
              <MdMenu className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:block"
              onClick={toggleSidebar}
            >
              <MdMenu className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h1>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
            </Button>
            <div className="relative" ref={dropdownRef}>
              <motion.div 
                className="flex items-center gap-2 md:gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <UserAvatar />
              </motion.div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => {
                        setIsProfileOpen(true);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <IoSettingsOutline className="w-4 h-4" />
                      Cài đặt
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <IoLogOutOutline className="w-4 h-4" />
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