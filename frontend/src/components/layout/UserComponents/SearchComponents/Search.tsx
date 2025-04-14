"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch, faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField, MenuItem } from "@mui/material";

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

const levels = [
  "Tất cả cấp độ",
  "Thực tập sinh",
  "Fresher",
  "Junior",
  "Middle",
  "Senior"
];

interface SearchProps {
  onSearch?: (params: { keyword: string; location: string; level: string }) => void;
  showTags?: boolean;
  title?: string;
  subtitle?: string;
}

const Search = ({ onSearch, showTags = true, title = "Nơi hội tụ Developer \"Chất\" – Cơ hội IT hấp dẫn", subtitle = "966 Việc làm IT cho Developer" }: SearchProps) => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    minSalary: "",
    maxSalary: "",
    level: ""
  });

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (searchKeyword) {
      searchParams.set('keyword', searchKeyword);
    }
    
    if (selectedCity !== "Tất cả thành phố") {
      searchParams.set('location', selectedCity);
    }

    // Thêm các tham số lọc nếu có
    if (filters.minSalary) {
      searchParams.set('minSalary', filters.minSalary);
    }
    if (filters.maxSalary) {
      searchParams.set('maxSalary', filters.maxSalary);
    }
    if (filters.level) {
      searchParams.set('level', filters.level);
    }

    router.push(`/jobs?${searchParams.toString()}`);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilterSubmit = () => {
    setIsFilterOpen(false);
    handleSearch();
  };

  const handleTagClick = (tag: string) => {
    setSearchKeyword(tag);
    const searchParams = new URLSearchParams();
    searchParams.set('keyword', tag);
    
    if (selectedCity !== "Tất cả thành phố") {
      searchParams.set('location', selectedCity);
    }

    router.push(`/jobs?${searchParams.toString()}`);
  };

  return (
    <div 
      className="w-full py-16 px-4"
      style={{ background: 'linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)' }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Tiêu đề */}
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          {title}
        </h1>
        <p className="text-xl text-white font-semibold mb-8">
          {subtitle}
        </p>

        {/* Thanh tìm kiếm */}
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
          {/* Dropdown thành phố */}
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon 
                  icon={faMapMarkerAlt} 
                  className="text-gray-400 w-4 h-4"
                />
              </motion.div>
              <span className="text-gray-400">|</span>
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-16 pr-10 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/50 appearance-none"
              aria-label="Chọn thành phố"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-[#121212] text-white">
                  {city}
                </option>
              ))}
            </select>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4"
              />
            </motion.div>
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
          <motion.button
            onClick={handleSearch}
            className="px-8 py-3 bg-[#FF0000] text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 min-w-[120px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
            </motion.div>
            <span>Tìm Kiếm</span>
          </motion.button>

          {/* Nút lọc */}
          <motion.button
            onClick={() => setIsFilterOpen(true)}
            className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 flex items-center justify-center gap-2 min-w-[120px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
            </motion.div>
            <span>Lọc</span>
          </motion.button>
        </div>

        {/* Tags tìm kiếm phổ biến */}
        {showTags && (
          <div className="flex items-center justify-center gap-4">
            <p className="text-gray-400 text-sm whitespace-nowrap">Mọi người đang tìm kiếm:</p>
            <div className="flex flex-wrap gap-3">
              {popularTags.map((tag, index) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="px-4 py-2 bg-black/50 border border-white/30 rounded-lg text-white text-sm hover:bg-white/10 transition-colors duration-200"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dialog lọc nâng cao */}
      <Dialog 
        open={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="bg-[#121212] text-white">Lọc nâng cao</DialogTitle>
        <DialogContent className="bg-[#121212] text-white">
          <div className="space-y-4 mt-4">
            <TextField
              fullWidth
              label="Mức lương tối thiểu (VNĐ)"
              type="number"
              value={filters.minSalary}
              onChange={(e) => handleFilterChange('minSalary', e.target.value)}
              InputProps={{
                className: "text-white",
              }}
              InputLabelProps={{
                className: "text-gray-400",
              }}
            />
            <TextField
              fullWidth
              label="Mức lương tối đa (VNĐ)"
              type="number"
              value={filters.maxSalary}
              onChange={(e) => handleFilterChange('maxSalary', e.target.value)}
              InputProps={{
                className: "text-white",
              }}
              InputLabelProps={{
                className: "text-gray-400",
              }}
            />
            <TextField
              fullWidth
              select
              label="Cấp độ"
              value={filters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
              InputProps={{
                className: "text-white",
              }}
              InputLabelProps={{
                className: "text-gray-400",
              }}
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level} className="bg-[#121212] text-white">
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </DialogContent>
        <DialogActions className="bg-[#121212]">
          <Button onClick={() => setIsFilterOpen(false)} className="text-white">
            Hủy
          </Button>
          <Button 
            onClick={handleFilterSubmit} 
            className="bg-[#FF0000] text-white hover:bg-red-600"
          >
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Search;
