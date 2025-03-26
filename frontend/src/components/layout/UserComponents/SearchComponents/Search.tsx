"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const popularTags = [
  "Java",
  "ReactJS",
  ".NET",
  "Tester",
  "PHP",
  "Business Analyst",
  "NodeJS",
  "Manager"
];

const cities = [
  "Tất cả thành phố",
  "Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Biên Hòa",
  "Thủ Dầu Một",
  "Huế",
  "Quy Nhơn"
];

const Search = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = () => {
    // Xử lý tìm kiếm ở đây
    console.log("Searching with:", { city: selectedCity, keyword: searchKeyword });
  };

  return (
    <div 
      className="w-full py-16 px-4"
      style={{ background: 'linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)' }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Tiêu đề */}
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Nơi hội tụ Developer <span className="text-white">&ldquo;Chất&rdquo;</span> – Cơ hội IT hấp dẫn
        </h1>
        <p className="text-xl text-white font-semibold mb-8">
          966 Việc làm IT cho Developer
        </p>

        {/* Thanh tìm kiếm */}
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
          {/* Dropdown thành phố */}
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <FontAwesomeIcon 
                icon={faMapMarkerAlt} 
                className="text-gray-400"
              />
              <span className="text-gray-400">|</span>
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-16 pr-10 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/50 appearance-none"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-[#121212] text-white">
                  {city}
                </option>
              ))}
            </select>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Ô tìm kiếm */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Nhập từ khoá theo kỹ năng, chức vụ, công ty..."
              className="w-full pl-4 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/50"
            />
          </div>

          {/* Nút tìm kiếm */}
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-[#FF0000] text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 min-w-[120px]"
          >
            <FontAwesomeIcon icon={faSearch} />
            <span>Tìm Kiếm</span>
          </button>
        </div>

        {/* Tags tìm kiếm phổ biến */}
        <div className="flex items-center justify-center gap-4">
          <p className="text-gray-400 text-sm whitespace-nowrap">Mọi người đang tìm kiếm:</p>
          <div className="flex flex-wrap gap-3">
            {popularTags.map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-black/50 border border-white/30 rounded-lg text-white text-sm hover:bg-white/10 transition-colors duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
