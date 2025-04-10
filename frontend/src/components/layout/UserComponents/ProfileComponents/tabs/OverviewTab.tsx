import { 
  Box, 
  Typography, 
  Button,
  Avatar,
  Grid,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailIcon from '@mui/icons-material/Mail';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

const StatusBoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: '#E60023',
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#FFFFFF',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#CC001F',
  },
}));

const ProgressBarStyled = styled(LinearProgress)({
  height: 8,
  borderRadius: 4,
  backgroundColor: '#F3F4F6',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#E60023',
  },
});

interface OverviewTabProps {
  profileCompletion: number;
  cvFile: File | null;
  onUpdateProfile: () => void;
  onUpgradeProfile: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteCV: () => void;
  onDownloadCV: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  profileCompletion,
  cvFile,
  onUpdateProfile,
  onUpgradeProfile,
  onFileUpload,
  onDeleteCV,
  onDownloadCV,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="/img/avatar.jpg"
            alt="Profile"
            sx={{ width: 50, height: 50, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" sx={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>
              Nguyễn Văn A
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              example@email.com
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={onUpdateProfile}
          sx={{
            color: '#3B82F6',
            borderColor: '#3B82F6',
            '&:hover': {
              borderColor: '#2563EB',
              backgroundColor: '#EFF6FF',
            },
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Cập nhật hồ sơ
        </Button>
      </Box>

      <Box sx={{ 
        border: '2px dashed #E5E7EB',
        borderRadius: '12px',
        p: 3,
        textAlign: 'center',
        mb: 3,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#E60023',
          backgroundColor: '#FFF5F5',
        },
      }}>
        <input
          type="file"
          id="cv-upload"
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
          onChange={onFileUpload}
        />
        <label htmlFor="cv-upload">
          <AttachFileIcon sx={{ fontSize: 40, color: '#E60023', mb: 1 }} />
          <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
            {cvFile ? cvFile.name : 'Bạn chưa đính kèm CV'}
          </Typography>
          {!cvFile && (
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{
                backgroundColor: '#E60023',
                '&:hover': {
                  backgroundColor: '#CC001F',
                },
                borderRadius: '8px',
                textTransform: 'none',
              }}
            >
              Tải CV lên
            </Button>
          )}
        </label>
        {cvFile && (
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
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
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Hoàn thiện hồ sơ
        </Typography>
        <ProgressBarStyled variant="determinate" value={profileCompletion} />
        <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
          {profileCompletion}% hoàn thành
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <StatusBoxStyled>
          <Typography variant="h6">0</Typography>
          <Typography variant="body2">Việc làm đã ứng tuyển</Typography>
        </StatusBoxStyled>
        <StatusBoxStyled>
          <Typography variant="h6">0</Typography>
          <Typography variant="body2">Lời mời công việc</Typography>
        </StatusBoxStyled>
        <StatusBoxStyled>
          <Typography variant="h6">0</Typography>
          <Typography variant="body2">Công ty đã xem hồ sơ</Typography>
        </StatusBoxStyled>
      </Box>
    </>
  );
};

export default OverviewTab; 