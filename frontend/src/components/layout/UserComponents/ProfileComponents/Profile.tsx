"use client";

import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Button,
  Switch,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

// Import các component tab
import SettingsTab from './tabs/SettingsTab';
import AppliedJobsTab from './tabs/AppliedJobsTab';

interface ProfileInfo {
  fullName: string;
  email: string;
  age: string;
  gender: string;
}

interface PasswordInfo {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

// Styled Components
const SidebarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}));

const MenuItemStyled = styled(ListItem)(({ theme }) => ({
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#F8F8F8',
  },
  '&.active': {
    backgroundColor: '#F8F8F8',
    '& .MuiListItemIcon-root': {
      color: '#E60023',
    },
    '& .MuiListItemText-primary': {
      color: '#E60023',
      fontWeight: 600,
    },
  },
}));

const NotificationBadgeStyled = styled(Box)({
  backgroundColor: '#00A878',
  color: '#FFFFFF',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  marginLeft: '8px',
});

const MainContentStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}));

const Profile: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('appliedJobs');
  const [notifications, setNotifications] = useState(true);
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
  const [profileDialog, setProfileDialog] = useState(false);
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    fullName: '',
    email: '',
    age: '',
    gender: ''
  });
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [notificationSettingsDialog, setNotificationSettingsDialog] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState<PasswordInfo>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const menuItems: MenuItem[] = [
    {
      id: 'appliedJobs',
      label: 'Công việc đã ứng tuyển',
      icon: <WorkIcon />,
      badge: appliedJobsCount,
    },
    {
      id: 'settings',
      label: 'Cài đặt',
      icon: <SettingsIcon />,
    },
  ];

  // Lấy thông tin user từ localStorage khi component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setProfileInfo({
        fullName: user.name,
        email: user.email,
        age: user.age.toString(),
        gender: user.gender
      });
    }
  }, []);

  // Xử lý thay đổi tab và cập nhật URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && menuItems.some(item => item.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/profile?tab=${tabId}`);
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      const response = await fetch('https://localhost:7152/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: userData.id,
          name: profileInfo.fullName,
          email: profileInfo.email,
          age: parseInt(profileInfo.age),
          gender: profileInfo.gender,
          role: userData.role,
          isActive: true
        })
      });

      const data = await response.json();
      
      if (!data.result) {
        throw new Error(data.message || "Cập nhật thông tin thất bại");
      }

      localStorage.setItem('user', JSON.stringify(data.data));
      setProfileDialog(false);

      toast.success("Cập nhật thông tin thành công!", {
        description: "Trang sẽ được tải lại sau 1 giây",
        duration: 1500
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error("Có lỗi xảy ra!", {
        description: error.message || "Không thể cập nhật thông tin"
      });
    }
  };

  const handleUpdateProfileClick = () => {
    setProfileDialog(true);
  };

  const handleSavePassword = () => {
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      toast.error('Mật khẩu mới không khớp');
      return;
    }
    toast.success('Đổi mật khẩu thành công');
    setPasswordDialog(false);
    setPasswordInfo({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccount = () => {
    toast.success('Tài khoản đã được xóa thành công');
    setDeleteAccountDialog(false);
  };

  const handleDeleteAccountClick = () => {
    setDeleteAccountDialog(true);
  };

  const handleProfileInfoChange = (field: keyof ProfileInfo, value: string) => {
    setProfileInfo(prev => ({...prev, [field]: value}));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appliedJobs':
        return <AppliedJobsTab onCountChange={setAppliedJobsCount} />;
      case 'settings':
        return (
          <SettingsTab
            notifications={notifications}
            onNotificationsChange={setNotifications}
            onUpdateProfile={handleUpdateProfileClick}
            onDeleteAccount={handleDeleteAccountClick}
            onPasswordChange={() => setPasswordDialog(true)}
            onNotificationSettings={() => setNotificationSettingsDialog(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <SidebarContainer>
            <List>
              {menuItems.map((item) => (
                <MenuItemStyled
                  key={item.id}
                  className={activeTab === item.id ? 'active' : ''}
                  onClick={() => handleTabChange(item.id)}
                >
                  <ListItemIcon sx={{ color: activeTab === item.id ? '#E60023' : '#4B5563' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  />
                  {item.badge && <NotificationBadgeStyled>{item.badge}</NotificationBadgeStyled>}
                </MenuItemStyled>
              ))}
            </List>
          </SidebarContainer>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <MainContentStyled>
            {renderTabContent()}
          </MainContentStyled>
        </Grid>
      </Grid>

      {/* Dialog xác nhận xóa tài khoản */}
      <Dialog open={deleteAccountDialog} onClose={() => setDeleteAccountDialog(false)}>
        <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#E60023', mb: 2 }}>
            CẢNH BÁO: Hành động này không thể hoàn tác!
          </Typography>
          <Typography>
            Khi bạn xóa tài khoản:
          </Typography>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Tất cả thông tin cá nhân của bạn sẽ bị xóa vĩnh viễn</li>
            <li>Bạn sẽ không thể truy cập vào các ứng dụng đã nộp</li>
            <li>Lịch sử tìm kiếm và các cài đặt sẽ bị xóa</li>
            <li>Bạn sẽ cần tạo tài khoản mới nếu muốn sử dụng lại dịch vụ</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountDialog(false)}>Hủy</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Xóa tài khoản
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog cập nhật thông tin hồ sơ */}
      <Dialog 
        open={profileDialog} 
        onClose={() => setProfileDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Cập nhật thông tin hồ sơ</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={profileInfo.fullName}
                  onChange={(e) => setProfileInfo({...profileInfo, fullName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profileInfo.email}
                  onChange={(e) => setProfileInfo({...profileInfo, email: e.target.value})}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tuổi"
                  value={profileInfo.age}
                  onChange={(e) => setProfileInfo({...profileInfo, age: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Giới tính"
                  value={profileInfo.gender}
                  onChange={(e) => setProfileInfo({...profileInfo, gender: e.target.value})}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileDialog(false)}>Hủy</Button>
          <Button onClick={handleUpdateProfile} variant="contained" color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog đổi mật khẩu */}
      <Dialog 
        open={passwordDialog} 
        onClose={() => setPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Mật khẩu hiện tại"
              value={passwordInfo.currentPassword}
              onChange={(e) => setPasswordInfo({...passwordInfo, currentPassword: e.target.value})}
            />
            <TextField
              fullWidth
              type="password"
              label="Mật khẩu mới"
              value={passwordInfo.newPassword}
              onChange={(e) => setPasswordInfo({...passwordInfo, newPassword: e.target.value})}
            />
            <TextField
              fullWidth
              type="password"
              label="Xác nhận mật khẩu mới"
              value={passwordInfo.confirmPassword}
              onChange={(e) => setPasswordInfo({...passwordInfo, confirmPassword: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)}>Hủy</Button>
          <Button onClick={handleSavePassword} variant="contained" color="primary">
            Đổi mật khẩu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog cài đặt thông báo */}
      <Dialog 
        open={notificationSettingsDialog} 
        onClose={() => setNotificationSettingsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Cài đặt thông báo</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Chọn các loại thông báo bạn muốn nhận:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>Thông báo việc làm mới</Typography>
                <Switch defaultChecked />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>Thông báo lời mời phỏng vấn</Typography>
                <Switch defaultChecked />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>Thông báo cập nhật trạng thái ứng tuyển</Typography>
                <Switch defaultChecked />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>Thông báo tin tức và sự kiện</Typography>
                <Switch defaultChecked />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotificationSettingsDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
