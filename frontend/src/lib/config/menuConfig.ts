import { MenuItem, MenuSection } from "../types/sidebar.types";
import { 
  MdDashboard, 
  MdPerson, 
  MdSettings, 
  MdShoppingCart,
  MdBarChart,
  MdEmail,
  MdCalendarToday,
  MdBusinessCenter,
  MdLibraryBooks,
  MdWork,
  MdPeople
} from "react-icons/md";

export const menuItems: MenuSection[] = [
  {
    sectionTitle: "Quản lý hệ thống",
    items: [
      {
        title: "Bảng điều khiển",
        path: "/admin/dashboard",
        icon: MdDashboard,
      },
      {
        title: "Quản lý nhà tuyển dụng",
        path: "/admin/employers",
        icon: MdBusinessCenter,
        submenu: [
          {
            title: "Danh sách nhà tuyển dụng",
            path: "/admin/employers/list",
          },
          {
            title: "Thêm nhà tuyển dụng",
            path: "/admin/employers/add",
          },
          {
            title: "Cài đặt",
            path: "/admin/employers/settings",
          }
        ]
      },
      {
        title: "Quản lý việc làm",
        path: "/admin/jobs",
        icon: MdWork,
        submenu: [
          {
            title: "Danh sách việc làm",
            path: "/admin/jobs/list",
          },
          {
            title: "Thêm việc làm",
            path: "/admin/jobs/add",
          },
          {
            title: "Danh mục",
            path: "/admin/jobs/categories",
          }
        ]
      },
      {
        title: "Quản lý người dùng",
        path: "/admin/users",
        icon: MdPeople,
        submenu: [
          {
            title: "Danh sách người dùng",
            path: "/admin/users/list",
          },
          {
            title: "Thêm người dùng",
            path: "/admin/users/add",
          },
          {
            title: "Phân quyền",
            path: "/admin/users/roles",
          }
        ]
      }
    ]
  },
  {
    sectionTitle: "Applications",
    items: [
      {
        title: "E-commerce",
        icon: MdShoppingCart,
        submenu: [
          {
            title: "Products",
            path: "/admin/product",
          },
          {
            title: "Orders",
            path: "/admin/orders",
            badge: "New",
          },
          {
            title: "Customers",
            path: "/admin/customers",
          },
        ],
      },
      {
        title: "Analytics",
        icon: MdBarChart,
        submenu: [
          {
            title: "Reports",
            path: "/admin/reports",
          },
          {
            title: "Statistics",
            path: "/admin/statistics",
          },
        ],
      },
      {
        title: "Calendar",
        path: "/admin/calendar",
        icon: MdCalendarToday,
      },
      {
        title: "Email",
        path: "/admin/email",
        icon: MdEmail,
        badge: 4,
      },
    ]
  },
  {
    sectionTitle: "Business",
    items: [
      {
        title: "Projects",
        icon: MdBusinessCenter,
        submenu: [
          {
            title: "All Projects",
            path: "/admin/projects",
          },
          {
            title: "Tasks",
            path: "/admin/tasks",
          }
        ]
      },
      {
        title: "Documents",
        icon: MdLibraryBooks,
        path: "/admin/documents",
      }
    ]
  },
  {
    sectionTitle: "Administration",
    items: [
      {
        title: "User Management",
        icon: MdPerson,
        roles: ["admin"],
        submenu: [
          {
            title: "Users",
            path: "/admin/users",
          },
          {
            title: "Roles",
            path: "/admin/roles",
          },
          {
            title: "Permissions",
            path: "/admin/permissions",
          },
        ],
      },
      {
        title: "Settings",
        path: "/admin/settings",
        icon: MdSettings,
      },
    ]
  }
]; 