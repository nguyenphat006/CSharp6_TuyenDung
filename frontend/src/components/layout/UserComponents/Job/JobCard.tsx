import React from 'react';
import { Typography, Button, Box, Chip, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Image from 'next/image';

const StyledCard = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  border: '1px solid #e5e7eb',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderColor: '#3b82f6',
  },
}));

const CornerDecoration = styled('div')({
  position: 'absolute',
  top: '-16px',
  left: '-16px',
  width: '128px',
  height: '128px',
  zIndex: 20,
});

const JobTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  fontSize: '1.25rem',
  color: '#111827',
  textAlign: 'center',
  transition: 'color 0.3s ease-in-out',
  '&:hover': {
    color: '#3b82f6',
  },
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  color: '#4b5563',
  marginBottom: theme.spacing(2),
  fontWeight: 500,
  textAlign: 'center',
}));

const JobInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  color: '#6b7280',
  justifyContent: 'center',
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: '#f3f4f6',
  color: '#374151',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#e5e7eb',
  },
}));

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    skills: string[];
    isHot: boolean;
    isNew: boolean;
  };
  onViewDetails: (id: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  return (
    <StyledCard onClick={() => onViewDetails(job.id)}>
      <CornerDecoration>
        <Image
          src="/img/card.svg"
          alt="corner decoration"
          fill
          className="object-contain opacity-30"
        />
      </CornerDecoration>

      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Box sx={{ position: 'relative', mb: 2 }}>
          {job.isHot && (
            <Tooltip title="Hot Job">
              <IconButton size="small" sx={{ position: 'absolute', right: 0, top: 0 }}>
                <TrendingUpIcon color="error" />
              </IconButton>
            </Tooltip>
          )}
          {job.isNew && (
            <Tooltip title="New">
              <IconButton size="small" sx={{ position: 'absolute', right: 0, top: 0 }}>
                <NewReleasesIcon color="primary" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <JobTitle>{job.title}</JobTitle>
        <CompanyName>{job.company}</CompanyName>

        <JobInfo>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">{job.location}</Typography>
        </JobInfo>

        <JobInfo>
          <WorkIcon fontSize="small" />
          <Typography variant="body2">{job.type}</Typography>
        </JobInfo>

        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            fontWeight: 600,
            color: '#059669',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <span style={{ width: '8px', height: '8px', backgroundColor: '#059669', borderRadius: '50%' }} />
          {job.salary}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, justifyContent: 'center' }}>
          {job.skills.map((skill) => (
            <SkillChip key={skill} label={skill} size="small" />
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ 
            mt: 2,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            background: 'linear-gradient(269.85deg, rgb(84, 21, 28) 0%, rgb(18, 18, 18) 54.89%)',
            '&:hover': {
              background: 'linear-gradient(269.85deg, rgb(94, 31, 38) 0%, rgb(28, 28, 28) 54.89%)',
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(job.id);
          }}
        >
          Xem chi tiết
        </Button>
      </Box>
    </StyledCard>
  );
};

export default JobCard; 