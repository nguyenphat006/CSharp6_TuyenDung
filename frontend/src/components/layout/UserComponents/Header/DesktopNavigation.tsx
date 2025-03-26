import Link from "next/link";
import { itJobsData, topCompaniesData, blogData } from "./data";

interface DesktopNavigationProps {
  activeMenu: string | null;
  handleMenuMouseEnter: (menu: string) => void;
  handleMenuMouseLeave: () => void;
}

const DesktopNavigation = ({
  activeMenu,
  handleMenuMouseEnter,
  handleMenuMouseLeave,
}: DesktopNavigationProps) => {
  return (
    <nav className="hidden lg:flex items-center space-x-8 ml-8">
      {/* Menu Việc Làm IT */}
      <div
        className="relative"
        onMouseEnter={() => handleMenuMouseEnter('jobs')}
        onMouseLeave={handleMenuMouseLeave}
      >
        <button className="text-white hover:text-gray-300 py-2 text-sm font-medium">
          Việc Làm IT
        </button>
        {activeMenu === 'jobs' && (
          <div className="absolute top-full left-0 w-[600px] bg-[#121212] shadow-lg rounded-lg p-6 grid grid-cols-2 gap-8 border border-gray-800 z-50">
            {/* Skills */}
            <div>
              <h3 className="text-gray-300 font-medium mb-4">Việc làm IT theo kỹ năng</h3>
              <div className="grid grid-cols-2 gap-2">
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
            </div>

            {/* Positions */}
            <div>
              <h3 className="text-gray-300 font-medium mb-4">Việc làm IT theo cấp bậc</h3>
              <div className="grid grid-cols-2 gap-2">
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
            </div>

            {/* Companies */}
            <div>
              <h3 className="text-gray-300 font-medium mb-4">Việc làm IT theo công ty</h3>
              <div className="grid grid-cols-2 gap-2">
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
            </div>

            {/* Cities */}
            <div>
              <h3 className="text-gray-300 font-medium mb-4">Việc làm IT theo thành phố</h3>
              <div className="grid grid-cols-2 gap-2">
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
            </div>
          </div>
        )}
      </div>

      {/* Menu Top Companies */}
      <div
        className="relative"
        onMouseEnter={() => handleMenuMouseEnter('companies')}
        onMouseLeave={handleMenuMouseLeave}
      >
        <button className="text-white hover:text-gray-300 py-2 text-sm font-medium">
          Top Công ty IT
        </button>
        {activeMenu === 'companies' && (
          <div className="absolute top-full left-0 w-[300px] bg-[#121212] shadow-lg rounded-lg p-6 border border-gray-800 z-50">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-300 font-medium mb-4">Công ty IT Tốt Nhất</h3>
                <div className="space-y-2">
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
              </div>
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-gray-300 font-medium mb-4">Review Công Ty</h3>
                <div className="space-y-2">
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
            </div>
          </div>
        )}
      </div>

      {/* Menu Blog */}
      <div
        className="relative"
        onMouseEnter={() => handleMenuMouseEnter('blog')}
        onMouseLeave={handleMenuMouseLeave}
      >
        <button className="text-white hover:text-gray-300 py-2 text-sm font-medium">
          Blog
        </button>
        {activeMenu === 'blog' && (
          <div className="absolute top-full left-0 w-[300px] bg-[#121212] shadow-lg rounded-lg p-6 border border-gray-800 z-50">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-300 font-medium mb-4">Báo Cáo Lương IT</h3>
                <div className="space-y-2">
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
              </div>
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-gray-300 font-medium mb-4">Các chủ đề Blog khác</h3>
                <div className="space-y-2">
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DesktopNavigation; 