import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Chip,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const SectionTitleStyled = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: '#1F2937',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&::before': {
    content: '""',
    width: '4px',
    height: '20px',
    backgroundColor: '#E60023',
    borderRadius: '2px',
  },
});

const JobCardStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
}));

const StatusChipStyled = styled(Chip)({
  borderRadius: '16px',
  '&.pending': {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  '&.approved': {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  '&.rejected': {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
  },
});

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

interface JobsTabProps {
  jobs: Job[];
  onViewJob: (jobId: number) => void;
}

const JobsTab: React.FC<JobsTabProps> = ({
  jobs,
  onViewJob,
}) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Đang chờ';
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Từ chối';
      default:
        return status;
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <SectionTitleStyled>Việc làm đã ứng tuyển</SectionTitleStyled>
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <JobCardStyled>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {job.company}
                    </Typography>
                  </Box>
                  <StatusChipStyled
                    label={getStatusLabel(job.status)}
                    className={job.status}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnIcon sx={{ color: '#666', fontSize: 20 }} />
                    <Typography variant="body2">{job.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AttachMoneyIcon sx={{ color: '#666', fontSize: 20 }} />
                    <Typography variant="body2">{job.salary}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ color: '#666', fontSize: 20 }} />
                    <Typography variant="body2">{job.type}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Đã ứng tuyển: {job.appliedDate}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<WorkIcon />}
                    onClick={() => onViewJob(job.id)}
                    sx={{ borderRadius: '8px' }}
                  >
                    Xem chi tiết
                  </Button>
                </Box>
              </JobCardStyled>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default JobsTab; 