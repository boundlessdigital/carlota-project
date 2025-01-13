import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { timezones } from './timezones';

export const WorkspaceSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [workspaceData, setWorkspaceData] = useState({
    name: 'My Workspace',
    timezone: 'UTC',
    logo: null as File | null,
    logoPreview: '',
  });
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);
  const [zoom, setZoom] = useState(100);

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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings updated:', workspaceData);
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          fontWeight: 600,
          textAlign: 'left'
        }}
      >
        Workspace Settings
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary" 
        paragraph
        sx={{ 
          fontSize: { xs: '1rem', sm: '1.1rem' },
          textAlign: 'left'
        }}
      >
        Manage your workspace configuration and preferences
      </Typography>

      <Paper 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          p: { xs: 3, sm: 4 },
          mt: 4,
          borderRadius: 2,
        }}
      >
        <Stack spacing={4} sx={{ alignItems: 'flex-start', width: '100%' }}>
          <TextField
            label="Workspace Name"
            value={workspaceData.name}
            onChange={(e) => setWorkspaceData({ ...workspaceData, name: e.target.value })}
            fullWidth
            required
            sx={{ 
              '& .MuiInputBase-input': { 
                fontSize: '1.1rem',
                textAlign: 'left'
              }
            }}
          />

          <FormControl fullWidth required>
            <InputLabel sx={{ textAlign: 'left' }}>Timezone</InputLabel>
            <Select
              value={workspaceData.timezone}
              label="Timezone"
              onChange={(e: SelectChangeEvent) => 
                setWorkspaceData({ ...workspaceData, timezone: e.target.value })
              }
              sx={{ 
                '& .MuiInputBase-input': { 
                  fontSize: '1.1rem',
                  textAlign: 'left'
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    '& .MuiMenuItem-root': {
                      textAlign: 'left'
                    }
                  }
                }
              }}
            >
              {timezones.map((tz) => (
                <MenuItem key={tz.value} value={tz.value}>
                  {tz.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
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
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: 'center',
                      transition: 'transform 0.2s',
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
                    <Tooltip title="View Full Size">
                      <IconButton 
                        size="small" 
                        onClick={() => setIsLogoDialogOpen(true)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Logo">
                      <IconButton 
                        size="small"
                        onClick={handleDeleteLogo}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    alignItems="center"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: 1,
                      p: 0.5,
                    }}
                  >
                    <Tooltip title="Zoom Out">
                      <IconButton 
                        size="small" 
                        onClick={handleZoomOut} 
                        disabled={zoom <= 50}
                      >
                        <ZoomOutIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body2" sx={{ minWidth: 45, textAlign: 'center' }}>
                      {zoom}%
                    </Typography>
                    <Tooltip title="Zoom In">
                      <IconButton 
                        size="small" 
                        onClick={handleZoomIn} 
                        disabled={zoom >= 200}
                      >
                        <ZoomInIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reset Zoom">
                      <IconButton 
                        size="small" 
                        onClick={handleResetZoom} 
                        disabled={zoom === 100}
                      >
                        <RefreshIcon fontSize="small" />
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

          <Box sx={{ 
            mt: 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              size="large"
              sx={{ 
                minWidth: 180,
                height: 48,
                fontSize: '1rem'
              }}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Dialog
        open={isLogoDialogOpen}
        onClose={() => setIsLogoDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'left' }}>
          Logo Preview
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            py: 2
          }}>
            <Box
              component="img"
              src={workspaceData.logoPreview}
              alt="Workspace Logo"
              sx={{ 
                maxWidth: '100%',
                maxHeight: 400,
                objectFit: 'contain'
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start', px: 3, pb: 2 }}>
          <Button onClick={() => setIsLogoDialogOpen(false)}>
            Close
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            style={{ display: 'none' }}
            id="logo-upload-dialog"
          />
          <label htmlFor="logo-upload-dialog">
            <Button component="span" variant="contained">
              Upload New
            </Button>
          </label>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
