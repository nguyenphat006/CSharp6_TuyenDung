import { 
  Box, 
  Typography, 
  Button,
  LinearProgress,
  Paper,
  IconButton,
  Chip,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';

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

const ProgressBarStyled = styled(LinearProgress)({
  height: 8,
  borderRadius: 4,
  backgroundColor: '#F3F4F6',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#E60023',
  },
});

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

interface ITviecTabProps {
  profileCompletion: number;
  skills: string[];
  onAddSkill: (skill: string) => void;
  onDeleteSkill: (skill: string) => void;
  experiences: Experience[];
  onAddExperience: () => void;
  onEditExperience: (experience: Experience) => void;
  onDeleteExperience: (id: number) => void;
  certificates: Certificate[];
  onAddCertificate: () => void;
  onEditCertificate: (certificate: Certificate) => void;
  onDeleteCertificate: (id: number) => void;
  onCertificateFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadCertificate: (certificate: Certificate) => void;
}

const SUGGESTED_SKILLS = [
  'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'PHP',
  'Angular', 'Vue.js', 'Next.js', 'Express', 'MongoDB', 'MySQL', 'PostgreSQL',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Git', 'CI/CD', 'Agile', 'Scrum'
];

const ITviecTab: React.FC<ITviecTabProps> = ({
  profileCompletion,
  skills,
  onAddSkill,
  onDeleteSkill,
  experiences,
  onAddExperience,
  onEditExperience,
  onDeleteExperience,
  certificates,
  onAddCertificate,
  onEditCertificate,
  onDeleteCertificate,
  onCertificateFileUpload,
  onDownloadCertificate,
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewSkill(value);
    if (value) {
      const filtered = SUGGESTED_SKILLS.filter(skill => 
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      onAddSkill(newSkill);
      setNewSkill('');
      setFilteredSkills([]);
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <SectionTitleStyled>Hoàn thành hồ sơ</SectionTitleStyled>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Độ hoàn thành hồ sơ
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {profileCompletion}%
            </Typography>
          </Box>
          <ProgressBarStyled variant="determinate" value={profileCompletion} />
          {profileCompletion < 70 && (
            <Typography variant="body2" sx={{ color: '#E60023', mt: 1 }}>
              Hồ sơ của bạn chưa đủ 70%. Hãy cập nhật thêm thông tin để tăng cơ hội tìm việc.
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <SectionTitleStyled>Kinh nghiệm làm việc</SectionTitleStyled>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAddExperience}
          sx={{ mb: 2, borderRadius: '8px' }}
        >
          Thêm kinh nghiệm
        </Button>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {experiences.map((experience) => (
            <Paper key={experience.id} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{experience.company}</Typography>
                <Box>
                  <IconButton 
                    size="small" 
                    sx={{ mr: 1 }}
                    onClick={() => onEditExperience(experience)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => onDeleteExperience(experience.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                {experience.position} • {experience.period}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {experience.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <SectionTitleStyled>Kỹ năng chuyên môn</SectionTitleStyled>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => onDeleteSkill(skill)}
                sx={{ borderRadius: '16px' }}
              />
            ))}
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Thêm kỹ năng"
                value={newSkill}
                onChange={handleSkillInputChange}
                sx={{ flex: 1 }}
              />
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddSkill}
                sx={{ borderRadius: '8px' }}
              >
                Thêm
              </Button>
            </Box>
            {filteredSkills.length > 0 && (
              <Paper 
                sx={{ 
                  position: 'absolute', 
                  top: '100%', 
                  left: 0, 
                  right: 0, 
                  zIndex: 1000,
                  maxHeight: 200,
                  overflow: 'auto'
                }}
              >
                <List>
                  {filteredSkills.map((skill: string) => (
                    <ListItem 
                      key={skill}
                      button
                      onClick={() => {
                        setNewSkill(skill);
                        setFilteredSkills([]);
                      }}
                    >
                      <ListItemText primary={skill} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>

      <Box>
        <SectionTitleStyled>Bằng cấp & chứng chỉ</SectionTitleStyled>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAddCertificate}
          sx={{ mb: 2, borderRadius: '8px' }}
        >
          Thêm chứng chỉ
        </Button>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {certificates.map((certificate) => (
            <Paper key={certificate.id} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{certificate.name}</Typography>
                <Box>
                  <IconButton 
                    size="small" 
                    sx={{ mr: 1 }}
                    onClick={() => onEditCertificate(certificate)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => onDeleteCertificate(certificate.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                {certificate.issuer} • {certificate.date}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <input
                  type="file"
                  id={`certificate-upload-${certificate.id}`}
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={onCertificateFileUpload}
                />
                <label htmlFor={`certificate-upload-${certificate.id}`}>
                  <Button
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    size="small"
                    sx={{ borderRadius: '8px' }}
                  >
                    {certificate.file ? 'Thay đổi file' : 'Tải lên chứng chỉ'}
                  </Button>
                </label>
                {certificate.file && (
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    size="small"
                    onClick={() => onDownloadCertificate(certificate)}
                    sx={{ borderRadius: '8px' }}
                  >
                    Tải xuống
                  </Button>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ITviecTab; 