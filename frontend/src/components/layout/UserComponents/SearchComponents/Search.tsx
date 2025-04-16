"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch, faChevronDown, faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField, MenuItem, Slider, InputAdornment } from "@mui/material";
import { getProvinces, Province } from "@/services/locationService";

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
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedCity, setSelectedCity] = useState("Tất cả thành phố");
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [filters, setFilters] = useState({
    minSalary: 0,
    maxSalary: 100000000,
    level: ""
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (searchKeyword) {
      searchParams.set('keyword', searchKeyword);
    }
    
    if (selectedCity !== "Tất cả thành phố") {
      searchParams.set('location', selectedCity);
    }

    // Thêm các tham số lọc nếu có
    if (filters.minSalary > 0) {
      searchParams.set('minSalary', filters.minSalary.toString());
    }
    if (filters.maxSalary < 100000000) {
      searchParams.set('maxSalary', filters.maxSalary.toString());
    }
    if (filters.level && filters.level !== "Tất cả cấp độ") {
      searchParams.set('level', filters.level);
    }

    router.push(`/jobs?${searchParams.toString()}`);
  };

  const handleFilterChange = (field: string, value: number | string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilterSubmit = () => {
    setIsFilterOpen(false);
    handleSearch();
  };

  const handleSalaryChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setFilters(prev => ({
        ...prev,
        minSalary: newValue[0],
        maxSalary: newValue[1]
      }));
    }
  };

  const formatSalary = (value: number) => {
    return `${value.toLocaleString()} VNĐ`;
  };

  const filteredProvinces = provinces.filter(province => 
    province.name.toLowerCase().includes(citySearch.toLowerCase())
  );

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
              <option value="Tất cả thành phố" className="bg-[#121212] text-white">
                Tất cả thành phố
              </option>
              {filteredProvinces.map((province) => (
                <option key={province.code} value={province.name} className="bg-[#121212] text-white">
                  {province.name}
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
        className="dark"
      >
        <DialogTitle className="bg-[#121212] text-white flex justify-between items-center">
          <span>Lọc nâng cao</span>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </DialogTitle>
        <DialogContent className="bg-[#121212] text-white">
          <div className="space-y-8 mt-4">
            {/* Mức lương */}
            <div>
              <h3 className="text-lg font-medium mb-4">Mức lương</h3>
              <div className="px-4">
                <Slider
                  value={[filters.minSalary, filters.maxSalary]}
                  onChange={handleSalaryChange}
                  valueLabelDisplay="auto"
                  valueLabelFormat={formatSalary}
                  min={0}
                  max={100000000}
                  step={1000000}
                  className="text-red-500"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>{formatSalary(filters.minSalary)}</span>
                  <span>{formatSalary(filters.maxSalary)}</span>
                </div>
              </div>
            </div>

            {/* Cấp độ */}
            <div>
              <h3 className="text-lg font-medium mb-4">Cấp độ</h3>
              <TextField
                fullWidth
                select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="bg-white/10 rounded-lg"
                InputProps={{
                  className: "text-white",
                }}
                SelectProps={{
                  MenuProps: {
                    className: "bg-[#121212]",
                  },
                }}
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level} className="bg-[#121212] text-white">
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {/* Thành phố */}
            <div>
              <h3 className="text-lg font-medium mb-4">Thành phố</h3>
              <div className="space-y-4">
                <TextField
                  fullWidth
                  placeholder="Tìm kiếm thành phố..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="bg-white/10 rounded-lg"
                  InputProps={{
                    className: "text-white",
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {filteredProvinces.map((province) => (
                      <button
                        key={province.code}
                        onClick={() => {
                          setSelectedCity(province.name);
                          setCitySearch("");
                        }}
                        className={`p-2 text-left rounded-lg transition-colors ${
                          selectedCity === province.name
                            ? "bg-red-500 text-white"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {province.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="bg-[#121212] p-4">
          <Button 
            onClick={() => setIsFilterOpen(false)} 
            className="text-white hover:bg-white/10"
          >
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
