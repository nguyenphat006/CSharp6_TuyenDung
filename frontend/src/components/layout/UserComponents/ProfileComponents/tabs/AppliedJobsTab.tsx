'use client';

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  TablePagination,
  Avatar,
  CircularProgress,
  Link,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

interface ResumeResponse {
  id: string;
  email: string;
  user: {
    id: string;
    name: string;
  };
  status: string;
  company: {
    id: string;
    name: string;
    address: string;
  };
  job: {
    id: string;
    name: string;
    salary: number;
  };
  fileUrl: string;
  createdAt: string;
}

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  fontWeight: 500,
  ...(status === 'PENDING' && {
    backgroundColor: '#FFF4E5',
    color: '#B76E00',
  }),
  ...(status === 'APPROVED' && {
    backgroundColor: '#E8F5E9',
    color: '#1B5E20',
  }),
  ...(status === 'REJECTED' && {
    backgroundColor: '#FEEBEE',
    color: '#B71C1C',
  }),
}));

const getStatusText = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'Đang chờ';
    case 'APPROVED':
      return 'Đã duyệt';
    case 'REJECTED':
      return 'Từ chối';
    default:
      return status;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

interface CompanyAvatarProps {
  name: string;
  logo?: string;
  size?: number;
}

const getInitials = (name: string) => {
  const words = name.split(' ');
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const getColorFromName = (name: string) => {
  const colors = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', 
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFC107', '#FF9800', '#FF5722'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

const CompanyAvatar = ({ name, logo, size = 24 }: CompanyAvatarProps) => {
  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.5,
        bgcolor: getColorFromName(name),
        borderRadius: 1
      }}
    >
      {getInitials(name)}
    </Avatar>
  );
};

const StyledLink = styled(Link)({
  color: '#1a1a1a',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: '#E60023',
  },
  cursor: 'pointer',
});

interface AppliedJobsTabProps {
  onCountChange: (count: number) => void;
}

export default function AppliedJobsTab({ onCountChange }: AppliedJobsTabProps) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [resumes, setResumes] = useState<ResumeResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7152/api/Resume/get-all-by-user', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch resumes');
        }

        const data = await response.json();
        if (data.result) {
          setResumes(data.data);
          onCountChange(data.data.length);
        } else {
          throw new Error(data.message || 'Failed to fetch resumes');
        }
      } catch (error: any) {
        toast.error('Không thể tải danh sách đơn ứng tuyển', {
          description: error.message
        });
        onCountChange(0);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [onCountChange]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewResume = (fileUrl: string) => {
    if (fileUrl) {
      window.open(`https://localhost:7152${fileUrl}`, '_blank');
    }
  };

  const handleJobClick = (jobId: string) => {
    window.open(`/jobs/${jobId}`, '_blank');
  };

  const handleCompanyClick = (companyId: string) => {
    window.open(`/company/${companyId}`, '_blank');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (resumes.length === 0) {
    return (
      <Box>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Công việc đã ứng tuyển
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: 400,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            p: 3,
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: 64, color: '#9e9e9e', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Bạn chưa ứng tuyển công việc nào
          </Typography>
          <Typography color="text.secondary" textAlign="center" mb={3}>
            Hãy tìm kiếm và ứng tuyển các công việc phù hợp với bạn
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/jobs')}
            sx={{
              textTransform: 'none',
              px: 4,
            }}
          >
            Tìm việc ngay
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={3}>
        Công việc đã ứng tuyển
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E0E0E0' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Công việc</TableCell>
              <TableCell>Công ty</TableCell>
              <TableCell>Địa điểm</TableCell>
              <TableCell>Mức lương</TableCell>
              <TableCell>Ngày ứng tuyển</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((resume) => (
                <TableRow key={resume.id} hover>
                  <TableCell>
                    <StyledLink onClick={() => handleJobClick(resume.job.id)}>
                      {resume.job.name}
                    </StyledLink>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CompanyAvatar name={resume.company.name} />
                      <StyledLink onClick={() => handleCompanyClick(resume.company.id)}>
                        {resume.company.name}
                      </StyledLink>
                    </Box>
                  </TableCell>
                  <TableCell>{resume.company.address}</TableCell>
                  <TableCell>{formatCurrency(resume.job.salary)}</TableCell>
                  <TableCell>{new Date(resume.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell>
                    <StatusChip
                      label={getStatusText(resume.status)}
                      size="small"
                      status={resume.status}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Xem CV">
                      <IconButton
                        size="small"
                        onClick={() => handleViewResume(resume.fileUrl)}
                        sx={{ color: 'primary.main' }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={resumes.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} của ${count}`
          }
        />
      </TableContainer>
    </Box>
  );
} 