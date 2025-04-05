export interface Job {
  id: string;
  title: string;
  skills: string[];
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  headcount: number;
  level: string;
  company: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
}

export interface JobFormData {
  id: string;
  title: string;
  skills: string[];
  location: string;
  salary: {
    min: string;
    max: string;
    currency: string;
  };
  headcount: string;
  level: string;
  company: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
}

export const sampleJobs: Record<string, JobFormData> = {
  "1": {
    id: "1",
    title: "Senior Frontend Developer",
    skills: ["ReactJS", "TypeScript", "JavaScript"],
    location: "Hồ Chí Minh",
    salary: {
      min: "25000000",
      max: "45000000",
      currency: "VND",
    },
    headcount: "2",
    level: "senior",
    company: "Tech Company",
    startDate: "2024-03-20",
    endDate: "2024-04-20",
    isActive: true,
    description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm làm việc với ReactJS và TypeScript. Ứng viên sẽ tham gia vào các dự án lớn và có cơ hội làm việc với các công nghệ mới nhất.",
  },
  "2": {
    id: "2",
    title: "Backend Developer",
    skills: ["NodeJS", "Express", "MongoDB", "SQL"],
    location: "Hà Nội",
    salary: {
      min: "20000000",
      max: "35000000",
      currency: "VND",
    },
    headcount: "3",
    level: "mid",
    company: "Tech Solutions",
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    isActive: true,
    description: "Chúng tôi cần tuyển Backend Developer có kinh nghiệm với NodeJS và các cơ sở dữ liệu. Ứng viên sẽ được làm việc với đội ngũ giàu kinh nghiệm và môi trường năng động.",
  },
  "3": {
    id: "3",
    title: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research"],
    location: "Đà Nẵng",
    salary: {
      min: "15000000",
      max: "25000000",
      currency: "VND",
    },
    headcount: "1",
    level: "junior",
    company: "Creative Agency",
    startDate: "2024-03-25",
    endDate: "2024-04-25",
    isActive: false,
    description: "Tìm kiếm UI/UX Designer có đam mê thiết kế và hiểu biết về trải nghiệm người dùng. Bạn sẽ được tham gia vào các dự án đa dạng và thú vị.",
  }
}; 