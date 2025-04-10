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
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

// Import các component tab
import OverviewTab from './tabs/OverviewTab';
import AttachmentsTab from './tabs/AttachmentsTab';
import SettingsTab from './tabs/SettingsTab';

interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
}

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  file: File | null;
}

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

interface Invitation {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  type: string;
  invitedDate: string;
  description: string;
}

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
  const [activeTab, setActiveTab] = useState('attachments');
  const [notifications, setNotifications] = useState(true);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [profileCompletion] = useState(65);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [skills, setSkills] = useState<string[]>(['React', 'Node.js', 'TypeScript']);
  const [experienceDialog, setExperienceDialog] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      company: 'Công ty A',
      position: 'Frontend Developer',
      period: '2020 - 2022',
      description: '- Phát triển và duy trì các ứng dụng web sử dụng React và TypeScript\n- Tối ưu hóa hiệu suất và trải nghiệm người dùng\n- Làm việc với team Agile'
    }
  ]);
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    id: 0,
    company: '',
    position: '',
    period: '',
    description: ''
  });
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022',
      file: null
    }
  ]);
  const [certificateDialog, setCertificateDialog] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState<Certificate>({
    id: 0,
    name: '',
    issuer: '',
    date: '',
    file: null
  });
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
  const [profileDialog, setProfileDialog] = useState(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    fullName: 'Nguyễn Văn A',
    email: 'example@email.com',
    age: '25',
    gender: 'Nam'
  });
  const [upgradeProfileDialog, setUpgradeProfileDialog] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [notificationSettingsDialog, setNotificationSettingsDialog] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState<PasswordInfo>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Công ty A',
      location: 'Hà Nội',
      salary: '15-20 triệu',
      type: 'Full-time',
      status: 'pending',
      appliedDate: '2024-03-15'
    }
  ]);
  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Công ty B',
      companyLogo: '/img/company-b.png',
      location: 'TP.HCM',
      salary: '25-35 triệu',
      type: 'Full-time',
      invitedDate: '2024-03-16',
      description: 'Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm với React và TypeScript.'
    }
  ]);

  const menuItems: MenuItem[] = [
    { id: 'attachments', label: 'Thông tin cá nhân', icon: <AttachFileIcon /> },
    { id: 'settings', label: 'Cài đặt', icon: <SettingsIcon /> },
  ];

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

  const handleAddExperience = () => {
    setCurrentExperience({
      id: 0,
      company: '',
      position: '',
      period: '',
      description: ''
    });
    setExperienceDialog(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setCurrentExperience(experience);
    setExperienceDialog(true);
  };

  const handleDeleteExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleSaveExperience = () => {
    if (currentExperience.id === 0) {
      setExperiences([
        ...experiences,
        {
          ...currentExperience,
          id: experiences.length + 1
        }
      ]);
    } else {
      setExperiences(experiences.map(exp => 
        exp.id === currentExperience.id ? currentExperience : exp
      ));
    }
    setExperienceDialog(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error('File không được vượt quá 3MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error('Chỉ hỗ trợ file PDF và Word');
        return;
      }
      setCvFile(file);
      toast.success('Tải lên CV thành công');
    }
  };

  const handleDeleteCV = () => {
    setCvFile(null);
    setDeleteDialog(false);
    toast.success('Xóa CV thành công');
  };

  const handleDownloadCV = () => {
    if (cvFile) {
      // TODO: Implement download functionality
      toast.success('Đang tải xuống CV...');
    }
  };

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
      toast.success('Thêm kỹ năng thành công');
    }
  };

  const handleDeleteSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
    toast.success('Xóa kỹ năng thành công');
  };

  const handleAddCertificate = () => {
    setCurrentCertificate({
      id: 0,
      name: '',
      issuer: '',
      date: '',
      file: null
    });
    setCertificateDialog(true);
  };

  const handleEditCertificate = (certificate: Certificate) => {
    setCurrentCertificate(certificate);
    setCertificateDialog(true);
  };

  const handleDeleteCertificate = (id: number) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
    toast.success('Xóa chứng chỉ thành công');
  };

  const handleSaveCertificate = () => {
    if (currentCertificate.id === 0) {
      setCertificates([
        ...certificates,
        {
          ...currentCertificate,
          id: certificates.length + 1
        }
      ]);
    } else {
      setCertificates(certificates.map(cert => 
        cert.id === currentCertificate.id ? currentCertificate : cert
      ));
    }
    setCertificateDialog(false);
    toast.success('Lưu chứng chỉ thành công');
  };

  const handleCertificateFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File không được vượt quá 5MB');
        return;
      }
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Chỉ hỗ trợ file PDF và hình ảnh');
        return;
      }
      setCurrentCertificate({...currentCertificate, file});
      toast.success('Tải lên file thành công');
    }
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    if (certificate.file) {
      // TODO: Implement download functionality
      toast.success('Đang tải xuống chứng chỉ...');
    }
  };

  const handleDeleteAccount = () => {
    // TODO: Implement delete account functionality
    toast.success('Tài khoản đã được xóa thành công');
    setDeleteAccountDialog(false);
  };

  const handleUpdateProfile = () => {
    // TODO: Implement update profile functionality
    toast.success('Cập nhật thông tin thành công');
    setProfileDialog(false);
  };

  const handleUpdateProfileClick = () => {
    setProfileDialog(true);
  };

  const handleUpgradeProfile = () => {
    setUpgradeProfileDialog(true);
  };

  const handleSavePassword = () => {
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      toast.error('Mật khẩu mới không khớp');
      return;
    }
    // TODO: Implement password change functionality
    toast.success('Đổi mật khẩu thành công');
    setPasswordDialog(false);
    setPasswordInfo({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccountClick = () => {
    setDeleteAccountDialog(true);
  };

  const handleProfileInfoChange = (field: keyof ProfileInfo, value: string) => {
    setProfileInfo(prev => ({...prev, [field]: value}));
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
            {activeTab === 'attachments' && (
              <AttachmentsTab
                profileInfo={profileInfo}
                onProfileInfoChange={handleProfileInfoChange}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsTab
                notifications={notifications}
                onNotificationsChange={setNotifications}
                onUpdateProfile={handleUpdateProfileClick}
                onDeleteAccount={handleDeleteAccountClick}
                onPasswordChange={() => setPasswordDialog(true)}
                onNotificationSettings={() => setNotificationSettingsDialog(true)}
              />
            )}
          </MainContentStyled>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Xác nhận xóa CV</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa CV này?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Hủy</Button>
          <Button onClick={handleDeleteCV} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog thêm/sửa kinh nghiệm */}
      <Dialog 
        open={experienceDialog} 
        onClose={() => setExperienceDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentExperience.id === 0 ? 'Thêm kinh nghiệm' : 'Chỉnh sửa kinh nghiệm'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Tên công ty"
              fullWidth
              value={currentExperience.company}
              onChange={(e) => setCurrentExperience({...currentExperience, company: e.target.value})}
            />
            <TextField
              label="Vị trí"
              fullWidth
              value={currentExperience.position}
              onChange={(e) => setCurrentExperience({...currentExperience, position: e.target.value})}
            />
            <TextField
              label="Thời gian"
              fullWidth
              value={currentExperience.period}
              onChange={(e) => setCurrentExperience({...currentExperience, period: e.target.value})}
            />
            <TextField
              label="Mô tả công việc"
              fullWidth
              multiline
              rows={4}
              value={currentExperience.description}
              onChange={(e) => setCurrentExperience({...currentExperience, description: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExperienceDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveExperience} variant="contained" color="primary">
            {currentExperience.id === 0 ? 'Thêm' : 'Cập nhật'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog thêm/sửa chứng chỉ */}
      <Dialog 
        open={certificateDialog} 
        onClose={() => setCertificateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentCertificate.id === 0 ? 'Thêm chứng chỉ' : 'Chỉnh sửa chứng chỉ'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Tên chứng chỉ"
              fullWidth
              value={currentCertificate.name}
              onChange={(e) => setCurrentCertificate({...currentCertificate, name: e.target.value})}
            />
            <TextField
              label="Tổ chức cấp"
              fullWidth
              value={currentCertificate.issuer}
              onChange={(e) => setCurrentCertificate({...currentCertificate, issuer: e.target.value})}
            />
            <TextField
              label="Ngày cấp"
              fullWidth
              value={currentCertificate.date}
              onChange={(e) => setCurrentCertificate({...currentCertificate, date: e.target.value})}
            />
            <Box>
              <input
                type="file"
                id="certificate-upload-dialog"
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                onChange={handleCertificateFileUpload}
              />
              <label htmlFor="certificate-upload-dialog">
                <Button
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ borderRadius: '8px' }}
                >
                  {currentCertificate.file ? 'Thay đổi file' : 'Tải lên chứng chỉ'}
                </Button>
              </label>
              {currentCertificate.file && (
                <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                  File đã chọn: {currentCertificate.file.name}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertificateDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveCertificate} variant="contained" color="primary">
            {currentCertificate.id === 0 ? 'Thêm' : 'Cập nhật'}
          </Button>
        </DialogActions>
      </Dialog>

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

      {/* Dialog nâng cấp hồ sơ */}
      <Dialog 
        open={upgradeProfileDialog} 
        onClose={() => setUpgradeProfileDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Nâng cấp hồ sơ</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Để nâng cấp hồ sơ của bạn, vui lòng hoàn thành các thông tin sau:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon color="success" />
                <Typography>Thêm ít nhất 3 kỹ năng chuyên môn</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon color="success" />
                <Typography>Thêm ít nhất 1 kinh nghiệm làm việc</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon color="success" />
                <Typography>Thêm ít nhất 1 chứng chỉ hoặc bằng cấp</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon color="success" />
                <Typography>Viết thư xin việc</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon color="success" />
                <Typography>Tải lên CV</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
              Sau khi hoàn thành các thông tin trên, hồ sơ của bạn sẽ được nâng cấp và có cơ hội cao hơn trong việc tìm kiếm việc làm.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpgradeProfileDialog(false)}>Đóng</Button>
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
