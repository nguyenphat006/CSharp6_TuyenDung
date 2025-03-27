import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

interface ProfileInfo {
  fullName: string;
  phone: string;
  location: string;
  experience: string;
  level: string;
  workType: string;
  coverLetter: string;
}

interface AttachmentsTabProps {
  cvFile: File | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteCV: () => void;
  onDownloadCV: () => void;
  profileInfo: ProfileInfo;
  onProfileInfoChange: (field: keyof ProfileInfo, value: string) => void;
}

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

const CVUploadBoxStyled = styled(Box)(({ theme }) => ({
  border: '2px dashed #E5E7EB',
  borderRadius: '12px',
  padding: theme.spacing(3),
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#E60023',
    backgroundColor: '#FFF5F5',
  },
}));

const AttachmentsTab: React.FC<AttachmentsTabProps> = ({
  cvFile,
  onFileUpload,
  onDeleteCV,
  onDownloadCV,
  profileInfo,
  onProfileInfoChange,
}) => {
  return (
    <Box>
      <SectionTitleStyled>CV của tôi</SectionTitleStyled>
      <CVUploadBoxStyled>
        <input
          type="file"
          id="cv-upload"
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
          onChange={onFileUpload}
        />
        <label htmlFor="cv-upload">
          <Button
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{ borderRadius: '8px' }}
          >
            {cvFile ? 'Thay đổi CV' : 'Tải lên CV'}
          </Button>
        </label>
        {cvFile && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              File đã chọn: {cvFile.name}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={onDownloadCV}
                sx={{ borderRadius: '8px' }}
              >
                Tải xuống
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={onDeleteCV}
                sx={{ borderRadius: '8px' }}
              >
                Xóa
              </Button>
            </Box>
          </Box>
        )}
      </CVUploadBoxStyled>

      <SectionTitleStyled>Thông tin hồ sơ</SectionTitleStyled>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Họ và tên"
            value={profileInfo.fullName}
            onChange={(e) => onProfileInfoChange('fullName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Số điện thoại"
            value={profileInfo.phone}
            onChange={(e) => onProfileInfoChange('phone', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nơi làm việc mong muốn"
            value={profileInfo.location}
            onChange={(e) => onProfileInfoChange('location', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Tổng số năm kinh nghiệm"
            value={profileInfo.experience}
            onChange={(e) => onProfileInfoChange('experience', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Cấp bậc hiện tại"
            value={profileInfo.level}
            onChange={(e) => onProfileInfoChange('level', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Hình thức làm việc"
            value={profileInfo.workType}
            onChange={(e) => onProfileInfoChange('workType', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Thư xin việc"
            multiline
            rows={4}
            value={profileInfo.coverLetter}
            onChange={(e) => onProfileInfoChange('coverLetter', e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttachmentsTab; 