import { MenuItem, MenuSection } from "../types/sidebar.types";
import { 
  MdDashboard, 
  MdPerson, 
  MdSettings,
  MdBusinessCenter,
  MdWork,
  MdPeople,
  MdSecurity,
  MdBusiness,
  MdAssignment
} from "react-icons/md";

export const menuItems: MenuSection[] = [
  {
    sectionTitle: "Tổng Quan",
    items: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: MdDashboard,
        roles: ["Admin", "HR"]
      },
    ]
  },
  {
    sectionTitle: "Danh mục tính năng",
    items: [
      {
        title: "Quản lý công ty",
        path: "/admin/companies",
        icon: MdBusiness,
        roles: ["Admin"]
      },
      {
        title: "Quản lý việc làm",
        path: "/admin/jobs",
        icon: MdWork,
        roles: ["Admin"]
      },
      {
        title: "Quản lý đơn xin việc",
        path: "/admin/applications",
        icon: MdAssignment,
        roles: ["Admin", "HR"]
      },
      {
        title: "Quản lý người dùng",
        path: "/admin/users", 
        icon: MdPeople,
        roles: ["Admin"]
      },
      {
        title: "Quản lý vai trò",
        path: "/admin/roles",
        icon: MdSecurity,
        roles: ["Admin"]
      }
    ]
  },
  {
    sectionTitle: "Quản lý hệ thống",
    items: [
      // {
      //   title: "Settings",
      //   path: "/admin/settings",
      //   icon: MdSettings,
      //   roles: ["Admin"]
      // },
      {
        title: "Activity Logs",
        path: "/admin/logs",
        icon: MdSettings,
        roles: ["Admin"]
      },
    ]
  }
];