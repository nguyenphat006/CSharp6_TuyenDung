"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Chip, IconButton, Tooltip, Paper, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessIcon from '@mui/icons-material/Business';
import Image from 'next/image';

const JobListContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  border: '1px solid #E5E7EB',
}));

const JobItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid #E5E7EB',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#F9FAFB',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const JobTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 700,
  color: '#1F2937',
  marginBottom: '4px',
  fontFamily: 'Inter, sans-serif',
  lineHeight: 1.4,
});

const CompanyName = styled(Typography)({
  fontSize: '14px',
  color: '#4B5563',
  marginBottom: '8px',
  fontFamily: 'Inter, sans-serif',
  lineHeight: 1.5,
});

const Salary = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#059669',
  marginBottom: '8px',
  fontFamily: 'Inter, sans-serif',
  lineHeight: 1.5,
});

const JobDetailContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  border: '1px solid #E5E7EB',
}));

const DetailTitle = styled(Typography)({
  fontSize: '24px',
  fontWeight: 700,
  color: '#1F2937',
  marginBottom: '16px',
  fontFamily: 'Inter, sans-serif',
  lineHeight: 1.3,
});

const DetailSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: '#1F2937',
  marginBottom: '16px',
  fontFamily: 'Inter, sans-serif',
  lineHeight: 1.4,
});

const BulletPoint = styled('li')({
  color: '#374151',
  marginBottom: '12px',
  fontSize: '15px',
  lineHeight: 1.6,
  fontFamily: 'Inter, sans-serif',
  '&::marker': {
    color: '#E60023',
    fontSize: '20px',
  },
});

const BenefitItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  color: '#374151',
  fontSize: '15px',
  lineHeight: 1.6,
  fontFamily: 'Inter, sans-serif',
}));

const CompanyInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#F8FAFC',
  borderRadius: '12px',
  marginTop: theme.spacing(4),
  border: '1px solid #E2E8F0',
}));

const InfoGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  border: '1px solid #E2E8F0',
  transition: 'all 0.2s ease',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-6px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#E60023',
  },
  '&:hover': {
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
}));

const InfoIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  backgroundColor: '#F1F5F9',
  color: '#E60023',
});

const InfoContent = styled(Box)({
  flex: 1,
});

const InfoLabel = styled(Typography)({
  fontWeight: 600,
  color: '#1E293B',
  fontSize: '14px',
  marginBottom: '4px',
});

const InfoValue = styled(Typography)({
  color: '#475569',
  fontSize: '14px',
  lineHeight: 1.5,
});

const ViecLamIT: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(0);

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Fimetech',
      location: '236 Lê Thanh Nghị, Quận Hai Bà Trưng, Hà Nội',
      type: 'Tại văn phòng',
      postedTime: '2 ngày trước',
      salary: '25-35M',
      skills: ['PHP', 'Laravel', 'Bootstrap', 'jQuery', 'Node.js', 'MongoDB', 'PostgreSQL', 'Linux', 'Nginx'],
      isHot: true,
      description: [
        'Tham gia vào việc phân tích giải pháp và xây dựng kiến trúc kỹ thuật cho các yêu cầu dự án.',
        'Xử lý xuyên suốt quá trình phát triển sản phẩm, chẩn đoán và sửa chữa các vấn đề gặp phải.',
        'Báo cáo, đề xuất cải tiến nâng cao chất lượng dự án.',
        'Tổng hợp, báo cáo công việc đội nhóm.',
      ],
      requirements: [
        'Có ít nhất 1 năm kinh nghiệm về PHP backend framework: Laravel.',
        'Có kinh nghiệp lập trình Frontend với Bootstrap, jQuery',
        'Biết Nodejs là mội lợi thế.',
        'Thông thạo sử dụng hệ quản trị CSDL như: MongoDB, PostgreSQL hoặc có kinh nghiệm về NoSQL, Cache.',
        'Ưu tiên các bạn full stack có thể đảm nhiệm vai trò Leader theo mô hình Agile, Scrum.',
        'Có kinh nghiệm về Linux, Nginx là một lợi thế.',
        'Ưu tiên các bạn đã từng làm trong lĩnh vực tài chính, blockchain.',
        'Tinh thần trách nhiệm trong công việc cao.',
        'Kỹ năng giải quyết vấn đề, tư duy logic nghiệp vụ tốt.',
      ],
      benefits: [
        'Lương: upto $1000 (deal thêm khi phỏng vấn) + chế độ thưởng hấp dẫn',
        'Các chế độ Bảo hiểm và Phúc lợi khác theo quy định của Luật lao động.',
        'Làm việc từ Thứ 2 đến Thứ 7 (làm 2 thứ 7/tháng).',
        'Review lương hàng năm',
        'Làm việc trong môi trường năng động, chuyên nghiệp',
        'Cung cấp trang thiết bị đầy đủ để phục vụ công việc.',
      ],
      companyInfo: {
        model: 'Làm việc ngoài giờ',
        field: 'Công nghệ thông tin',
        size: '1-50',
        country: 'Vietnam',
        workingTime: 'Thứ 2 - Thứ 7',
        overtime: 'Không có OT',
      }
    },
    // Thêm các job khác ở đây
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          textAlign: 'center', 
          mb: 4,
          fontWeight: 700,
          color: '#1F2937',
          fontFamily: 'Inter, sans-serif',
          fontSize: '2rem',
          lineHeight: 1.3,
        }}
      >
      </Typography>

      <Grid container spacing={3}>
        {/* Danh sách việc làm */}
        <Grid item xs={12} md={4}>
          <JobListContainer>
            {jobs.map((job, index) => (
              <JobItem 
                key={job.id}
                onClick={() => setSelectedJob(index)}
                sx={{
                  backgroundColor: selectedJob === index ? '#F9FAFB' : 'transparent',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <JobTitle>{job.title}</JobTitle>
                  {job.isHot && (
                    <Tooltip title="Hot Job">
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <TrendingUpIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                <CompanyName>{job.company}</CompanyName>
                <Salary>{job.salary}</Salary>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <WorkIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {job.type}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {job.postedTime}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {job.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{
                        backgroundColor: '#F3F4F6',
                        color: '#374151',
                        fontSize: '12px',
                        borderRadius: '12px',
                        height: '24px',
                        '& .MuiChip-label': {
                          padding: '0 8px',
                        },
                      }}
                    />
                  ))}
                </Box>
              </JobItem>
            ))}
          </JobListContainer>
        </Grid>

        {/* Chi tiết việc làm */}
        <Grid item xs={12} md={8}>
          <JobDetailContainer>
            {selectedJob !== null && jobs[selectedJob] && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ position: 'relative', width: 80, height: 80, mr: 2 }}>
                    <Image
                      src="/img/company/logotest.webp"
                      alt="Company logo"
                      fill
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </Box>
                  <Box>
                    <DetailTitle>{jobs[selectedJob].title}</DetailTitle>
                    <Typography variant="h6" color="primary" sx={{ color: '#059669' }}>
                      {jobs[selectedJob].salary}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mb: 4,
                    py: 1.5,
                    backgroundColor: '#E60023',
                    '&:hover': {
                      backgroundColor: '#CC001F',
                    },
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  Ứng tuyển ngay
                </Button>

                <DetailSection>
                  <SectionTitle>Mô tả công việc</SectionTitle>
                  <ul style={{ paddingLeft: '20px' }}>
                    {jobs[selectedJob].description.map((item, index) => (
                      <BulletPoint key={index}>{item}</BulletPoint>
                    ))}
                  </ul>
                </DetailSection>

                <DetailSection>
                  <SectionTitle>Yêu cầu công việc</SectionTitle>
                  <ul style={{ paddingLeft: '20px' }}>
                    {jobs[selectedJob].requirements.map((item, index) => (
                      <BulletPoint key={index}>{item}</BulletPoint>
                    ))}
                  </ul>
                </DetailSection>

                <DetailSection>
                  <SectionTitle>Tại sao bạn sẽ yêu thích làm việc tại đây</SectionTitle>
                  {jobs[selectedJob].benefits.map((benefit, index) => (
                    <BenefitItem key={index}>
                      <CheckCircleIcon color="success" fontSize="small" sx={{ mt: 0.5 }} />
                      <Typography variant="body2">{benefit}</Typography>
                    </BenefitItem>
                  ))}
                </DetailSection>

                <Divider sx={{ my: 4 }} />

                <CompanyInfo>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 700, 
                      color: '#1E293B',
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      '&::before': {
                        content: '""',
                        width: '4px',
                        height: '20px',
                        backgroundColor: '#E60023',
                        borderRadius: '2px',
                      }
                    }}
                  >
                    Thông tin công ty
                  </Typography>
                  <InfoGrid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <InfoIcon>
                          <BusinessIcon fontSize="small" />
                        </InfoIcon>
                        <InfoContent>
                          <InfoLabel>Tên công ty</InfoLabel>
                          <InfoValue>{jobs[selectedJob].company}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <InfoIcon>
                          <WorkIcon fontSize="small" />
                        </InfoIcon>
                        <InfoContent>
                          <InfoLabel>Mô hình công ty</InfoLabel>
                          <InfoValue>{jobs[selectedJob].companyInfo.model}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <InfoIcon>
                          <WorkIcon fontSize="small" />
                        </InfoIcon>
                        <InfoContent>
                          <InfoLabel>Lĩnh vực</InfoLabel>
                          <InfoValue>{jobs[selectedJob].companyInfo.field}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <InfoIcon>
                          <WorkIcon fontSize="small" />
                        </InfoIcon>
                        <InfoContent>
                          <InfoLabel>Quy mô</InfoLabel>
                          <InfoValue>{jobs[selectedJob].companyInfo.size}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <InfoIcon>
                          <LocationOnIcon fontSize="small" />
                        </InfoIcon>
                        <InfoContent>
                          <InfoLabel>Quốc gia</InfoLabel>
                          <InfoValue>{jobs[selectedJob].companyInfo.country}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <InfoIcon>
                          <AccessTimeIcon fontSize="small" />
                        </InfoIcon>
                        <InfoContent>
                          <InfoLabel>Giờ làm việc</InfoLabel>
                          <InfoValue>{jobs[selectedJob].companyInfo.workingTime}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <InfoIcon>
                          <AccessTimeIcon fontSize="small" />
                        </InfoIcon>
                        <InfoContent>
                          <InfoLabel>Làm thêm giờ</InfoLabel>
                          <InfoValue>{jobs[selectedJob].companyInfo.overtime}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                  </InfoGrid>
                </CompanyInfo>
              </>
            )}
          </JobDetailContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViecLamIT;
