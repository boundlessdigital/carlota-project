import { Box, Typography, Link as MuiLink, Breadcrumbs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const pathToTitle: Record<string, string> = {
  'workspace-settings': 'Workspace Settings',
  'billing': 'Billing Tracking',
  'subscription': 'Subscription',
};

export const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
      >
        <MuiLink
          component={Link}
          to="/"
          color="text.secondary"
          sx={{ 
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Home
        </MuiLink>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          return (
            <Typography
              key={segment}
              color={isLast ? 'text.primary' : 'text.secondary'}
              component={isLast ? 'span' : Link}
              to={isLast ? undefined : `/${segment}`}
              sx={!isLast ? { 
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              } : undefined}
            >
              {pathToTitle[segment] || segment}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
