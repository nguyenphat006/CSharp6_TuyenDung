"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { RootState } from "@/redux/store";
import { IoSettingsOutline, IoLogOutOutline, IoHomeOutline } from "react-icons/io5";

export function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
    router.push("/login");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-all duration-200">
          <div className="relative">
            <Avatar className="w-10 h-10 ring-2 ring-white shadow-lg">
              <AvatarImage src="/img/logo/logo-avat.png" alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white group-hover:text-gray-900">{user?.name}</p>
            <p className="text-xs text-white/70 group-hover:text-gray-500">{user?.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
        <DropdownMenuLabel className="px-4 py-2.5 text-sm font-medium text-gray-900">
          Tài khoản của tôi
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem 
          onClick={() => router.push("/profile")}
          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
        >
          <IoSettingsOutline className="w-5 h-5" />
          Cài đặt tài khoản
        </DropdownMenuItem>
        {user?.role === "Admin" && (
          <DropdownMenuItem 
            onClick={() => router.push("/admin")}
            className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
          >
            <IoHomeOutline className="w-5 h-5" />
            Trang quản trị
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
        >
          <IoLogOutOutline className="w-5 h-5" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
 
 
 
 
 