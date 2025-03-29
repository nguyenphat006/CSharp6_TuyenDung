import { MenuItem, MenuSection } from "../types/sidebar.types";
import { 
  MdDashboard, 
  MdPerson, 
  MdSettings,
  MdBusinessCenter,
  MdWork,
  MdPeople
} from "react-icons/md";

export const menuItems: MenuSection[] = [
  {
    sectionTitle: "Tổng Quan",
    items: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: MdDashboard,
      },
    ]
  },
  {
    sectionTitle: "Quản lý hệ thống",
    items: [
      {
        title: "Quản lý nhà tuyển dụng",
        path: "/admin/employer",
        icon: MdBusinessCenter,
      },
      {
        title: "Quản lý việc làm",
        path: "/admin/jobs",
        icon: MdWork,
      },
      {
        title: "Quản lý người dùng",
        path: "/admin/users", 
        icon: MdPeople,
      }
    ]
  },
  {
    sectionTitle: "Administration",
    items: [
      {
        title: "Settings",
        path: "/admin/settings",
        icon: MdSettings,
      },
    ]
  }
];