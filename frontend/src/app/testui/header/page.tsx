"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Data cho các menu dropdown
const itJobsData = {
  skills: [
    "Java", "PHP", "JavaScript", "HTML5", "Manager", "SQL", "Android", "iOS",
    "MySQL", "Tester", "English", "Ruby", "Python", "Mobile Apps", "Ruby on Rails",
    "QA QC", "Database", ".NET", "Business Analyst", "Linux", "Team Leader",
    "NodeJS", "System Engineer", "Designer", "UI-UX", "Project Manager", "OOP",
    "Oracle", "MVC", "ReactJS", "Embedded", "J2EE"
  ],
  positions: [
    "Lập trình viên Java", "Lập trình viên PHP", "Lập trình viên JavaScript",
    "Lập trình viên HTML5", "Lập trình viên SQL", "Lập trình viên Android",
    "Lập trình viên iOS", "Tester", "Lập trình viên Ruby", "Lập trình viên Python",
    "Lập trình viên Ruby on Rails", "Lập trình viên .NET", "Lập trình viên NodeJS",
    "Lập trình viên Linux", "Lập trình viên OOP", "Lập trình viên Oracle",
    "Lập trình viên C++", "Lập trình viên Wordpress", "Nhân viên thiết kế",
    "Quản trị cơ sở dữ liệu", "Lập trình viên ứng dụng di động", "Quản lý dự án",
    "Quản lý sản phẩm", "Kỹ sư cầu nối"
  ],
  companies: [
    "MB Bank", "LG CNS Việt Nam", "MONEY FORWARD VIETNAM CO., LTD", "Crossian",
    "TymeX", "Trusting Social", "Motorola Solutions", "NAB Innovation Centre Vietnam",
    "Viettel Group", "Surbana Technologies Pte. Ltd.", "Global Fashion Group",
    "Saigon Technology", "Grab (Vietnam) Ltd.", "Hitachi Digital Services",
    "Techcombank", "Công ty TNHH Thankslab Việt Nam", "Katalon", "MSB",
    "Fullerton Health", "Live Payments", "HDBank", "SkyLab", "ATOMI DIGITAL",
    "PAL TECH"
  ],
  cities: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Khác"]
};

const topCompaniesData = {
  bestCompanies: [
    "Công ty IT Tốt Nhất 2025", "Công ty IT Tốt Nhất 2024", "Công ty IT Tốt Nhất 2023",
    "Công ty IT Tốt Nhất 2022", "Công ty IT Tốt Nhất 2021", "Công ty IT Tốt Nhất 2020",
    "Công ty IT Tốt Nhất 2019"
  ],
  reviews: ["Review Công Ty"]
};

const blogData = {
  salaryReports: [
    "Báo Cáo Lương IT 2024-2025", "Báo Cáo Lương IT 2023-2024",
    "Báo Cáo Lương IT 2022-2023"
  ],
  topics: ["Sự Nghiệp IT", "Ứng Tuyển & Thăng Tiến", "Chuyên Môn IT"]
};

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hàm xử lý hover menu chính
  const handleMenuMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  // Hàm xử lý hover menu con
  const handleSubmenuMouseEnter = (submenu: string) => {
    setActiveSubmenu(submenu);
  };

  // Hàm xử lý khi rời khỏi menu
  const handleMenuMouseLeave = () => {
    setActiveMenu(null);
    setActiveSubmenu(null);
  };

  return (
    <header 
      className="relative"
      style={{ background: 'linear-gradient(277.42deg, #54151C 0%, #121212 43.92%)' }}
    >
      <div className="max-w-[1920px] mx-auto px-2">
        <div className="flex items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 pl-4">
            <Image
              src="/img/logo.png"
              alt="IT Work Force Logo"
              width={280}
              height={100}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Main Navigation */}
          <nav className="hidden lg:flex space-x-6 ml-10">
            {/* Việc Làm IT Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMenuMouseEnter('jobs')}
              onMouseLeave={handleMenuMouseLeave}
            >
              <div className="py-10 -my-10">
                <button className="text-white hover:text-gray-300 transition-colors duration-200 text-base font-medium">
                  Việc Làm IT
                </button>
                {activeMenu === 'jobs' && (
                  <div 
                    className="absolute left-0 top-full pt-4 z-50"
                    onMouseEnter={() => setActiveMenu('jobs')}
                  >
                    <div className="w-64 bg-[#121212] rounded-md shadow-lg py-2">
                      {/* Menu cấp 1 */}
                      <div
                        className="relative group"
                        onMouseEnter={() => handleSubmenuMouseEnter('skills')}
                      >
                        <div className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                          Việc làm IT theo kỹ năng
                        </div>
                        {activeSubmenu === 'skills' && (
                          <div 
                            className="absolute left-full top-0 w-[800px] bg-[#121212] rounded-md shadow-lg p-4"
                            style={{ marginLeft: '1px', marginTop: '-8px' }}
                          >
                            <div className="grid grid-cols-4 gap-2">
                              {itJobsData.skills.map((skill, index) => (
                                <Link
                                  key={index}
                                  href="#"
                                  className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded"
                                >
                                  {skill}
                                </Link>
                              ))}
                              <Link
                                href="#"
                                className="px-3 py-2 text-blue-400 hover:text-blue-300"
                              >
                                Xem tất cả
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className="relative group"
                        onMouseEnter={() => handleSubmenuMouseEnter('positions')}
                      >
                        <div className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                          Việc làm IT theo cấp bậc
                        </div>
                        {activeSubmenu === 'positions' && (
                          <div 
                            className="absolute left-full top-0 w-[800px] bg-[#121212] rounded-md shadow-lg p-4"
                            style={{ marginLeft: '1px', marginTop: '-8px' }}
                          >
                            <div className="grid grid-cols-4 gap-2">
                              {itJobsData.positions.map((position, index) => (
                                <Link
                                  key={index}
                                  href="#"
                                  className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded"
                                >
                                  {position}
                                </Link>
                              ))}
                              <Link
                                href="#"
                                className="px-3 py-2 text-blue-400 hover:text-blue-300"
                              >
                                Xem tất cả
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className="relative group"
                        onMouseEnter={() => handleSubmenuMouseEnter('companies')}
                      >
                        <div className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                          Việc làm IT theo công ty
                        </div>
                        {activeSubmenu === 'companies' && (
                          <div 
                            className="absolute left-full top-0 w-[800px] bg-[#121212] rounded-md shadow-lg p-4"
                            style={{ marginLeft: '1px', marginTop: '-8px' }}
                          >
                            <div className="grid grid-cols-4 gap-2">
                              {itJobsData.companies.map((company, index) => (
                                <Link
                                  key={index}
                                  href="#"
                                  className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded"
                                >
                                  {company}
                                </Link>
                              ))}
                              <Link
                                href="#"
                                className="px-3 py-2 text-blue-400 hover:text-blue-300"
                              >
                                Xem tất cả
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className="relative group"
                        onMouseEnter={() => handleSubmenuMouseEnter('cities')}
                      >
                        <div className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                          Việc làm IT theo thành phố
                        </div>
                        {activeSubmenu === 'cities' && (
                          <div 
                            className="absolute left-full top-0 w-[800px] bg-[#121212] rounded-md shadow-lg p-4"
                            style={{ marginLeft: '1px', marginTop: '-8px' }}
                          >
                            <div className="grid grid-cols-4 gap-2">
                              {itJobsData.cities.map((city, index) => (
                                <Link
                                  key={index}
                                  href="#"
                                  className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded"
                                >
                                  {city}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Companies Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMenuMouseEnter('companies')}
              onMouseLeave={handleMenuMouseLeave}
            >
              <div className="py-10 -my-10">
                <button className="text-white hover:text-gray-300 transition-colors duration-200 text-base font-medium">
                  Top Công ty IT
                </button>
                {activeMenu === 'companies' && (
                  <div 
                    className="absolute left-0 top-full pt-4 z-50"
                    onMouseEnter={() => setActiveMenu('companies')}
                  >
                    <div className="w-64 bg-[#121212] rounded-md shadow-lg py-2">
                      <div className="px-4 py-2">
                        <h3 className="text-white font-medium mb-2">Công ty IT Tốt Nhất</h3>
                        {topCompaniesData.bestCompanies.map((company, index) => (
                          <Link
                            key={index}
                            href="#"
                            className="block py-1 text-gray-300 hover:text-white"
                          >
                            {company}
                          </Link>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-700">
                        <h3 className="text-white font-medium mb-2">Review Công Ty</h3>
                        {topCompaniesData.reviews.map((review, index) => (
                          <Link
                            key={index}
                            href="#"
                            className="block py-1 text-gray-300 hover:text-white"
                          >
                            {review}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Blog Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMenuMouseEnter('blog')}
              onMouseLeave={handleMenuMouseLeave}
            >
              <div className="py-10 -my-10">
                <button className="text-white hover:text-gray-300 transition-colors duration-200 text-base font-medium">
                  Blog
                </button>
                {activeMenu === 'blog' && (
                  <div 
                    className="absolute left-0 top-full pt-4 z-50"
                    onMouseEnter={() => setActiveMenu('blog')}
                  >
                    <div className="w-64 bg-[#121212] rounded-md shadow-lg py-2">
                      <div className="px-4 py-2">
                        <h3 className="text-white font-medium mb-2">Báo Cáo Lương IT</h3>
                        {blogData.salaryReports.map((report, index) => (
                          <Link
                            key={index}
                            href="#"
                            className="block py-1 text-gray-300 hover:text-white"
                          >
                            {report}
                          </Link>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-700">
                        <h3 className="text-white font-medium mb-2">Các chủ đề Blog khác</h3>
                        {blogData.topics.map((topic, index) => (
                          <Link
                            key={index}
                            href="#"
                            className="block py-1 text-gray-300 hover:text-white"
                          >
                            {topic}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Right Side Navigation */}
          <div className="hidden lg:flex items-center ml-auto mr-8 space-x-6">
            <Link
              href="/employer"
              className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
            >
              Nhà Tuyển Dụng
            </Link>
            <div className="flex items-center space-x-4">
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
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto">
            <button 
              className="text-white hover:text-gray-300 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#121212] py-4">
            <div className="px-4 space-y-4">
              <div className="space-y-2">
                <button className="w-full text-left text-white py-2">Việc Làm IT</button>
                <div className="pl-4 space-y-2">
                  <Link href="#" className="block text-gray-300 py-1">Việc làm IT theo kỹ năng</Link>
                  <Link href="#" className="block text-gray-300 py-1">Việc làm IT theo cấp bậc</Link>
                  <Link href="#" className="block text-gray-300 py-1">Việc làm IT theo công ty</Link>
                  <Link href="#" className="block text-gray-300 py-1">Việc làm IT theo thành phố</Link>
                </div>
              </div>
              <Link href="#" className="block text-white py-2">Top Công ty IT</Link>
              <Link href="#" className="block text-white py-2">Blog</Link>
              <Link href="#" className="block text-white py-2">Nhà Tuyển Dụng</Link>
              <div className="pt-4 border-t border-gray-700">
                <Link href="/login" className="block text-white py-2">Đăng Nhập</Link>
                <Link href="/register" className="block text-white py-2">Đăng Ký</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
