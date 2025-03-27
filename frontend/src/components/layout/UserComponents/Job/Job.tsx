"use client";

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import JobCard from './JobCard';

const Job: React.FC = () => {
  const router = useRouter();

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Hồ Chí Minh',
      type: 'Full-time',
      salary: '25-35M',
      skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
      isHot: true,
      isNew: false,
    },
    {
      id: 2,
      title: 'Backend Developer (Node.js)',
      company: 'Digital Innovations',
      location: 'Hà Nội',
      type: 'Full-time',
      salary: '20-30M',
      skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
      isHot: true,
      isNew: true,
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Đà Nẵng',
      type: 'Full-time',
      salary: '30-40M',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
      isHot: true,
      isNew: false,
    },
    {
      id: 4,
      title: 'Mobile Developer (React Native)',
      company: 'App Solutions',
      location: 'Hồ Chí Minh',
      type: 'Full-time',
      salary: '22-32M',
      skills: ['React Native', 'Redux', 'Firebase', 'REST API'],
      isHot: false,
      isNew: true,
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      company: 'Creative Design Studio',
      location: 'Hà Nội',
      type: 'Full-time',
      salary: '18-28M',
      skills: ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping'],
      isHot: false,
      isNew: false,
    },
    {
      id: 6,
      title: 'Full Stack Developer',
      company: 'Web Solutions',
      location: 'Hồ Chí Minh',
      type: 'Full-time',
      salary: '28-38M',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      isHot: true,
      isNew: true,
    }
  ];

  const handleViewDetails = (id: number) => {
    router.push(`/job/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        123 việc làm IT hot nhất hôm nay
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
        Cập nhật liên tục các cơ hội việc làm hấp dẫn cho Developer
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          variant="contained"
          size="large"
          sx={{ 
            py: 2,
            px: 6,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1.125rem',
            borderRadius: '8px',
            background: 'linear-gradient(269.85deg, rgb(84, 21, 28) 0%, rgb(18, 18, 18) 54.89%)',
            '&:hover': {
              background: 'linear-gradient(269.85deg, rgb(94, 31, 38) 0%, rgb(28, 28, 28) 54.89%)',
            }
          }}
          onClick={() => router.push('/jobs')}
        >
          Xem thêm 123 việc làm khác
        </Button>
      </div>
    </div>
  );
};

export default Job;
