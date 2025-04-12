import { 
  Box, 
  Typography, 
  Button,
  Switch,
  TextField,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GoogleIcon from '@mui/icons-material/Google';
import { useState, useEffect } from 'react';

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

interface SettingsTabProps {
  notifications: boolean;
  onNotificationsChange: (checked: boolean) => void;
  onUpdateProfile: () => void;
  onDeleteAccount: () => void;
  onPasswordChange: () => void;
  onNotificationSettings: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  notifications,
  onNotificationsChange,
  onUpdateProfile,
  onDeleteAccount,
  onPasswordChange,
  onNotificationSettings,
}) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email);
    }
  }, []);

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <SectionTitleStyled>Thông tin tài khoản</SectionTitleStyled>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ color: '#666', mb: 1 }}>
            Email (không thể thay đổi)
          </Typography>
          <Typography variant="body1" sx={{ color: '#333', fontWeight: 600 }}>
            {userEmail}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onUpdateProfile}
          sx={{
            backgroundColor: '#E60023',
            '&:hover': {
              backgroundColor: '#CC001F',
            },
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Cập nhật thông tin hồ sơ
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <SectionTitleStyled>Mật khẩu</SectionTitleStyled>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <GoogleIcon sx={{ color: '#4285F4' }} />
          <Typography variant="body1" sx={{ color: '#666' }}>
            Không có mật khẩu đối với tài khoản Google
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={onPasswordChange}
          sx={{ borderRadius: '8px' }}
        >
          Đổi mật khẩu
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <SectionTitleStyled>Thông báo lời mời công việc</SectionTitleStyled>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1">Bật thông báo</Typography>
          <Switch
            checked={notifications}
            onChange={(e) => onNotificationsChange(e.target.checked)}
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: notifications ? '#E60023' : '#D1D5DB',
              },
              '& .MuiSwitch-track': {
                backgroundColor: notifications ? '#FFCCCC' : '#E5E7EB',
              },
            }}
          />
        </Box>
        <Button
          variant="outlined"
          onClick={onNotificationSettings}
          sx={{ mb: 2, borderRadius: '8px' }}
        >
          Cài đặt thông báo
        </Button>
        <TextField
          fullWidth
          placeholder="Tìm kiếm công ty để tắt thông báo"
          sx={{ mb: 2 }}
        />
      </Box>

      <Box>
        <SectionTitleStyled>Xóa tài khoản</SectionTitleStyled>
        <Paper
          sx={{
            p: 2,
            border: '1px solid #FFCCCC',
            borderRadius: '8px',
            backgroundColor: '#FFF5F5',
          }}
        >
          <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
            Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
          </Typography>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onDeleteAccount}
            sx={{
              backgroundColor: '#E60023',
              '&:hover': {
                backgroundColor: '#CC001F',
              },
              borderRadius: '8px',
              textTransform: 'none',
            }}
          >
            Xóa tài khoản
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default SettingsTab; 