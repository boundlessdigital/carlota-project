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
    <Box sx={{ maxWidth: 800, width: '100%', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ 
        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
        fontWeight: 600,
      }}>
        Workspace Settings
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary" 
        paragraph
        sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
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
        <Stack spacing={4}>
          <TextField
            label="Workspace Name"
            value={workspaceData.name}
            onChange={(e) => setWorkspaceData({ ...workspaceData, name: e.target.value })}
            fullWidth
            required
            sx={{ '& .MuiInputBase-input': { fontSize: '1.1rem' } }}
          />

          <FormControl fullWidth required>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={workspaceData.timezone}
              label="Timezone"
              onChange={(e: SelectChangeEvent) => 
                setWorkspaceData({ ...workspaceData, timezone: e.target.value })
              }
              sx={{ '& .MuiInputBase-input': { fontSize: '1.1rem' } }}
            >
              {timezones.map((tz) => (
                <MenuItem key={tz.value} value={tz.value}>
                  {tz.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ py: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Workspace Logo
            </Typography>
            
            {workspaceData.logoPreview ? (
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 2,
              }}>
                <Box sx={{ 
                  position: 'relative',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  bgcolor: '#f5f5f5',
                  width: 'fit-content'
                }}>
                  <Box
                    component="img"
                    src={workspaceData.logoPreview}
                    alt="Workspace Logo"
                    sx={{ 
                      height: 120,
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: 'top left',
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
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Tooltip title="Zoom Out">
                    <IconButton onClick={handleZoomOut} disabled={zoom <= 50}>
                      <ZoomOutIcon />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" sx={{ minWidth: 60 }}>
                    {zoom}%
                  </Typography>
                  <Tooltip title="Zoom In">
                    <IconButton onClick={handleZoomIn} disabled={zoom >= 200}>
                      <ZoomInIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reset Zoom">
                    <IconButton onClick={handleResetZoom} disabled={zoom === 100}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            ) : (
              <>
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
              </>
            )}
            <Typography 
              variant="caption" 
              display="block" 
              sx={{ 
                mt: 1.5, 
                color: 'text.secondary',
                fontSize: '0.9rem'
              }}
            >
              Recommended size: 200x200px. Max file size: 2MB
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
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
        <DialogTitle>
          Logo Preview
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
        <DialogActions>
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
