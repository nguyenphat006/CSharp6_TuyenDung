import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Button,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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

const InvitationCardStyled = styled(Paper)({
  padding: '16px',
  marginBottom: '16px',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
});

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

interface InvitationsTabProps {
  invitations: Invitation[];
  onAcceptInvitation: (invitationId: number) => void;
  onRejectInvitation: (invitationId: number) => void;
}

const InvitationsTab: React.FC<InvitationsTabProps> = ({
  invitations,
  onAcceptInvitation,
  onRejectInvitation,
}) => {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <SectionTitleStyled>Lời mời công việc</SectionTitleStyled>
        <Grid container spacing={2}>
          {invitations.map((invitation) => (
            <Grid item xs={12} key={invitation.id}>
              <InvitationCardStyled>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={invitation.companyLogo}
                    alt={invitation.company}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      {invitation.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {invitation.company}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => onAcceptInvitation(invitation.id)}
                      sx={{
                        backgroundColor: '#00A878',
                        '&:hover': {
                          backgroundColor: '#008F63',
                        },
                        borderRadius: '8px',
                      }}
                    >
                      Chấp nhận
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => onRejectInvitation(invitation.id)}
                      sx={{ borderRadius: '8px' }}
                    >
                      Từ chối
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnIcon sx={{ color: '#666', fontSize: 20 }} />
                    <Typography variant="body2">{invitation.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AttachMoneyIcon sx={{ color: '#666', fontSize: 20 }} />
                    <Typography variant="body2">{invitation.salary}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ color: '#666', fontSize: 20 }} />
                    <Typography variant="body2">{invitation.type}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                  {invitation.description}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Được mời: {invitation.invitedDate}
                </Typography>
              </InvitationCardStyled>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default InvitationsTab; 