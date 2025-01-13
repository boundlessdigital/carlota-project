import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  IconButton,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  ContentCopy as ContentCopyIcon,
  Save as SaveIcon,
  Settings as SettingsIcon,
  Key as KeyIcon,
} from '@mui/icons-material';
import { timezones } from './timezones';
import { Breadcrumb } from '../../components/Breadcrumb';

export const WorkspaceSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [workspaceData, setWorkspaceData] = useState({
    name: 'My Workspace',
    timezone: 'UTC',
    logo: null as File | null,
    logoPreview: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('sk-xxxx-xxxx-xxxx-xxxx');
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setWorkspaceData({
        ...workspaceData,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleDeleteLogo = () => {
    setWorkspaceData({
      ...workspaceData,
      logo: null,
      logoPreview: '',
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Breadcrumb />
      
      <Box sx={{ 
        mb: 4,
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #0D1B3F 0%, #1a3f8f 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '30%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
          transform: 'skewX(-20deg) translateX(50%)',
        }} />
        <Typography 
          variant="h4" 
          sx={{ 
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            fontWeight: 600,
            mb: 1,
            position: 'relative',
          }}
        >
          Workspace Settings
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            opacity: 0.9,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            position: 'relative',
          }}
        >
          Configure your workspace preferences and API access
        </Typography>
      </Box>

      <Stack spacing={3}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <SettingsIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              General Settings
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <TextField
              label="Workspace Name"
              value={workspaceData.name}
              onChange={(e) => setWorkspaceData({ ...workspaceData, name: e.target.value })}
              fullWidth
              sx={{
                maxWidth: 400,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: alpha('#0D1B3F', 0.4),
                  },
                },
              }}
            />

            <FormControl sx={{ maxWidth: 400 }}>
              <InputLabel>Timezone</InputLabel>
              <Select
                value={workspaceData.timezone}
                label="Timezone"
                onChange={(e) => setWorkspaceData({ ...workspaceData, timezone: e.target.value })}
                sx={{
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha('#0D1B3F', 0.4),
                  },
                }}
              >
                {timezones.map((timezone) => (
                  <MenuItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ maxWidth: 400 }}>
              <InputLabel 
                sx={{ 
                  position: 'static', 
                  transform: 'none',
                  mb: 1,
                  fontSize: '1.1rem',
                  '&.Mui-focused': {
                    color: 'rgba(0, 0, 0, 0.87)'
                  }
                }}
              >
                Workspace Logo
              </InputLabel>
              
              <Box sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: '#f5f5f5',
                width: '100%',
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                mb: 2
              }}>
                {workspaceData.logoPreview ? (
                  <>
                    <Box
                      component="img"
                      src={workspaceData.logoPreview}
                      alt="Workspace Logo"
                      sx={{ 
                        maxHeight: 160,
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                    <Stack 
                      direction="row" 
                      spacing={1} 
                      sx={{ 
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 1,
                        p: 0.5,
                      }}
                    >
                      <Tooltip title="Delete Logo">
                        <IconButton 
                          size="small"
                          onClick={handleDeleteLogo}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </>
                ) : (
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    No logo
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ display: 'none' }}
                  id="logo-upload"
                />
                <label htmlFor="logo-upload">
                  <Button 
                    variant="outlined" 
                    component="span"
                    size="large"
                    sx={{ 
                      minWidth: 180,
                      height: 48,
                      fontSize: '1rem'
                    }}
                  >
                    Upload Logo
                  </Button>
                </label>
                <Typography 
                  variant="caption"
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '0.9rem'
                  }}
                >
                  Recommended size: 200x200px. Max file size: 2MB
                </Typography>
              </Box>
            </FormControl>
          </Stack>
        </Paper>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <KeyIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              API Access
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Your API Key
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: alpha('#0D1B3F', 0.04),
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    color: 'text.secondary',
                  }}
                >
                  sk-xxxx-xxxx-xxxx-xxxx
                </Typography>
                <Tooltip 
                  title={showCopied ? "Copied!" : "Copy API Key"}
                  placement="top"
                >
                  <IconButton 
                    onClick={handleCopyApiKey}
                    sx={{
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: alpha('#0D1B3F', 0.08),
                      },
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Paper>
            </Box>

            <Button
              startIcon={<RefreshIcon />}
              variant="outlined"
              sx={{
                maxWidth: 200,
                textTransform: 'none',
                borderRadius: 1.5,
                '&:hover': {
                  bgcolor: alpha('#0D1B3F', 0.04),
                },
              }}
            >
              Refresh API Key
            </Button>
          </Stack>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
            sx={{
              px: 4,
              py: 1,
              textTransform: 'none',
              borderRadius: 1.5,
              background: 'linear-gradient(45deg, #0D1B3F 30%, #1a3f8f 90%)',
              boxShadow: '0 3px 12px rgba(13, 27, 63, 0.2)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0D1B3F 30%, #1a3f8f 90%)',
                boxShadow: '0 4px 15px rgba(13, 27, 63, 0.3)',
              },
            }}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
