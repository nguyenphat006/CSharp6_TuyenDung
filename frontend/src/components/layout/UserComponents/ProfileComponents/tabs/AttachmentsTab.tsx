import { Box, Typography, TextField, Grid } from '@mui/material';

interface ProfileInfo {
  fullName: string;
  email: string;
  age: string;
  gender: string;
}

interface AttachmentsTabProps {
  profileInfo: ProfileInfo;
  onProfileInfoChange: (field: keyof ProfileInfo, value: string) => void;
}

const AttachmentsTab: React.FC<AttachmentsTabProps> = ({
  profileInfo,
  onProfileInfoChange,
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Thông tin cá nhân
      </Typography>

      <Grid container spacing={3}>
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
            label="Email"
            value={profileInfo.email}
            onChange={(e) => onProfileInfoChange('email', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tuổi"
            value={profileInfo.age}
            onChange={(e) => onProfileInfoChange('age', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Giới tính"
            value={profileInfo.gender}
            onChange={(e) => onProfileInfoChange('gender', e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttachmentsTab; 