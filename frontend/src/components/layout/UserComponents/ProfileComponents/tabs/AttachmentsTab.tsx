import { Box, Typography, TextField, Grid, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface ProfileInfo {
  fullName: string;
  email: string;
  age: string;
  gender: string;
}

interface AttachmentsTabProps {
  profileInfo: ProfileInfo;
  onProfileInfoChange: (field: keyof ProfileInfo, value: string) => void;
  onEditClick: () => void;
}

const AttachmentsTab: React.FC<AttachmentsTabProps> = ({
  profileInfo,
  onProfileInfoChange,
  onEditClick
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Thông tin cá nhân
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onEditClick}
          sx={{
            backgroundColor: '#E60023',
            '&:hover': {
              backgroundColor: '#CC001F',
            },
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Chỉnh sửa
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Họ và tên"
            value={profileInfo.fullName}
            onChange={(e) => onProfileInfoChange('fullName', e.target.value)}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            value={profileInfo.email}
            onChange={(e) => onProfileInfoChange('email', e.target.value)}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tuổi"
            value={profileInfo.age}
            onChange={(e) => onProfileInfoChange('age', e.target.value)}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Giới tính"
            value={profileInfo.gender}
            onChange={(e) => onProfileInfoChange('gender', e.target.value)}
            disabled
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttachmentsTab; 