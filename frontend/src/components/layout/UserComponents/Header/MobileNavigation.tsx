import Link from "next/link";
import { itJobsData, topCompaniesData, blogData } from "./data";

interface MobileNavigationProps {
  isOpen: boolean;
  activeMenu: string | null;
  activeSubmenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  setActiveSubmenu: (submenu: string | null) => void;
}

const MobileNavigation = ({
  isOpen,
  activeMenu,
  activeSubmenu,
  setActiveMenu,
  setActiveSubmenu,
}: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-[#121212] py-4">
      <div className="px-4 space-y-4">
        {/* Menu Việc Làm IT */}
        <div className="space-y-2">
          <button 
            className="w-full text-left text-white py-2 flex items-center justify-between"
            onClick={() => setActiveMenu(activeMenu === 'jobs' ? null : 'jobs')}
          >
            <span>Việc Làm IT</span>
            <svg 
              className={`w-5 h-5 transform transition-transform ${activeMenu === 'jobs' ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeMenu === 'jobs' && (
            <div className="pl-4 space-y-2">
              {/* Skills */}
              <div className="space-y-2">
                <button 
                  className="w-full text-left text-gray-300 py-1 flex items-center justify-between"
                  onClick={() => setActiveSubmenu(activeSubmenu === 'skills' ? null : 'skills')}
                >
                  <span>Việc làm IT theo kỹ năng</span>
                  <svg 
                    className={`w-4 h-4 transform transition-transform ${activeSubmenu === 'skills' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeSubmenu === 'skills' && (
                  <div className="pl-4 grid grid-cols-2 gap-2">
                    {itJobsData.skills.slice(0, 8).map((skill, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="text-gray-400 hover:text-white text-sm"
                      >
                        {skill}
                      </Link>
                    ))}
                    <Link
                      href="#"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                )}
              </div>

              {/* Positions */}
              <div className="space-y-2">
                <button 
                  className="w-full text-left text-gray-300 py-1 flex items-center justify-between"
                  onClick={() => setActiveSubmenu(activeSubmenu === 'positions' ? null : 'positions')}
                >
                  <span>Việc làm IT theo cấp bậc</span>
                  <svg 
                    className={`w-4 h-4 transform transition-transform ${activeSubmenu === 'positions' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeSubmenu === 'positions' && (
                  <div className="pl-4 grid grid-cols-2 gap-2">
                    {itJobsData.positions.slice(0, 8).map((position, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="text-gray-400 hover:text-white text-sm"
                      >
                        {position}
                      </Link>
                    ))}
                    <Link
                      href="#"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                )}
              </div>

              {/* Companies */}
              <div className="space-y-2">
                <button 
                  className="w-full text-left text-gray-300 py-1 flex items-center justify-between"
                  onClick={() => setActiveSubmenu(activeSubmenu === 'companies' ? null : 'companies')}
                >
                  <span>Việc làm IT theo công ty</span>
                  <svg 
                    className={`w-4 h-4 transform transition-transform ${activeSubmenu === 'companies' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeSubmenu === 'companies' && (
                  <div className="pl-4 grid grid-cols-2 gap-2">
                    {itJobsData.companies.slice(0, 8).map((company, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="text-gray-400 hover:text-white text-sm"
                      >
                        {company}
                      </Link>
                    ))}
                    <Link
                      href="#"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                )}
              </div>

              {/* Cities */}
              <div className="space-y-2">
                <button 
                  className="w-full text-left text-gray-300 py-1 flex items-center justify-between"
                  onClick={() => setActiveSubmenu(activeSubmenu === 'cities' ? null : 'cities')}
                >
                  <span>Việc làm IT theo thành phố</span>
                  <svg 
                    className={`w-4 h-4 transform transition-transform ${activeSubmenu === 'cities' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeSubmenu === 'cities' && (
                  <div className="pl-4 grid grid-cols-2 gap-2">
                    {itJobsData.cities.map((city, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="text-gray-400 hover:text-white text-sm"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Menu Top Companies */}
        <div className="space-y-2">
          <button 
            className="w-full text-left text-white py-2 flex items-center justify-between"
            onClick={() => setActiveMenu(activeMenu === 'companies' ? null : 'companies')}
          >
            <span>Top Công ty IT</span>
            <svg 
              className={`w-5 h-5 transform transition-transform ${activeMenu === 'companies' ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeMenu === 'companies' && (
            <div className="pl-4 space-y-2">
              <div className="space-y-2">
                <h3 className="text-gray-300 font-medium">Công ty IT Tốt Nhất</h3>
                {topCompaniesData.bestCompanies.slice(0, 5).map((company, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="block text-gray-400 hover:text-white text-sm"
                  >
                    {company}
                  </Link>
                ))}
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-700">
                <h3 className="text-gray-300 font-medium">Review Công Ty</h3>
                {topCompaniesData.reviews.map((review, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="block text-gray-400 hover:text-white text-sm"
                  >
                    {review}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Menu Blog */}
        <div className="space-y-2">
          <button 
            className="w-full text-left text-white py-2 flex items-center justify-between"
            onClick={() => setActiveMenu(activeMenu === 'blog' ? null : 'blog')}
          >
            <span>Blog</span>
            <svg 
              className={`w-5 h-5 transform transition-transform ${activeMenu === 'blog' ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeMenu === 'blog' && (
            <div className="pl-4 space-y-2">
              <div className="space-y-2">
                <h3 className="text-gray-300 font-medium">Báo Cáo Lương IT</h3>
                {blogData.salaryReports.map((report, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="block text-gray-400 hover:text-white text-sm"
                  >
                    {report}
                  </Link>
                ))}
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-700">
                <h3 className="text-gray-300 font-medium">Các chủ đề Blog khác</h3>
                {blogData.topics.map((topic, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="block text-gray-400 hover:text-white text-sm"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Menu Nhà Tuyển Dụng */}
        <Link 
          href="/employer" 
          className="block text-white py-2"
        >
          Nhà Tuyển Dụng
        </Link>

        {/* Menu Đăng nhập/Đăng ký */}
        <div className="pt-4 border-t border-gray-700 space-y-2">
          <Link 
            href="/login" 
            className="block text-white py-2"
          >
            Đăng Nhập
          </Link>
          <Link 
            href="/register" 
            className="block text-white py-2"
          >
            Đăng Ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation; 