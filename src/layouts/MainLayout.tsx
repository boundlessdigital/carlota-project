import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          py: 4,
          pl: { xs: 4, sm: 6, md: 8 },
          pr: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
