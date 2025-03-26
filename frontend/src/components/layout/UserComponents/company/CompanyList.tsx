"use client";

import Company from "./company";

const CompanyList = () => {
  const companies = [
    {
      logo: "/img/company/logotest.webp",
      name: "FPT Software",
      skills: ["Java", "React", "Node.js", "DevOps"],
      locations: ["Hà Nội", "TP.HCM", "Đà Nẵng"],
      jobCount: 156,
      href: "/companies/fpt-software",
    },
    {
      logo: "/img/company/logotest.webp",
      name: "VNG Corporation",
      skills: ["Python", "Golang", "Kubernetes", "AWS"],
      locations: ["TP.HCM", "Hà Nội"],
      jobCount: 89,
      href: "/companies/vng-corporation",
    },
    {
      logo: "/img/company/logotest.webp",
      name: "Momo",
      skills: ["Java", "Spring Boot", "Microservices", "Docker"],
      locations: ["Hà Nội", "TP.HCM"],
      jobCount: 45,
      href: "/companies/momo",
    },
    {
      logo: "/img/company/logotest.webp",
      name: "Tiki",
      skills: ["React", "TypeScript", "Node.js", "MongoDB"],
      locations: ["TP.HCM", "Hà Nội"],
      jobCount: 67,
      href: "/companies/tiki",
    },
    {
      logo: "/img/company/logotest.webp",
      name: "Techcombank",
      skills: ["Java", "Spring", "Oracle", "Angular"],
      locations: ["Hà Nội", "TP.HCM"],
      jobCount: 34,
      href: "/companies/techcombank",
    },
    {
      logo: "/img/company/logotest.webp",
      name: "MSB Bank",
      skills: ["Java", "React", "PostgreSQL", "Docker"],
      locations: ["Hà Nội"],
      jobCount: 23,
      href: "/companies/msb-bank",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Nhà tuyển dụng hàng đầu
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <Company key={index} {...company} />
        ))}
      </div>
    </div>
  );
};

export default CompanyList; 