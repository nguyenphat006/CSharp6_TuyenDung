import React from 'react';
import { Card, Grid, Typography, Button, Box, Chip, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useNavigate } from 'react-router-dom';

const JobCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const JobTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  fontSize: '1.1rem',
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const JobInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const Job: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - Thay thế bằng API call thực tế
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Hồ Chí Minh',
      type: 'Full-time',
      salary: '25-35M',
      skills: ['React', 'TypeScript', 'Next.js'],
      isHot: true,
      isNew: false,
    },
    // Thêm các job khác ở đây
  ];

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          123 việc làm IT hot nhất hôm nay
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Cập nhật liên tục các cơ hội việc làm hấp dẫn cho Developer
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
            <JobCard>
              <Box sx={{ position: 'relative' }}>
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

              <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                {job.salary}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {job.skills.map((skill) => (
                  <SkillChip key={skill} label={skill} size="small" />
                ))}
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate(`/job/${job.id}`)}
              >
                Xem chi tiết
              </Button>
            </JobCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => navigate('/jobs')}
        >
          Xem thêm 123 việc làm khác
        </Button>
      </Box>
    </Box>
  );
};

export default Job;
