import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box } from '@mui/material'
import { Settings as SettingsIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" sx={{ bgcolor: '#0D1B3F' }}>
      <Toolbar
        sx={{
          height: 64,
          px: 2,
          justifyContent: 'space-between'
        }}
      >
        <Link to="/">
          <Box
            component="img"
            src="/images/boundless-logo.svg"
            alt="Boundless Logo"
            sx={{
              height: 36,
              filter: 'brightness(0) invert(1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Link>

        <IconButton
          size="large"
          aria-label="settings"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{
            width: 40,
            height: 40,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <SettingsIcon sx={{ fontSize: 24 }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200
            }
          }}
        >
          <MenuItem
            component={Link}
            to="/workspace-settings"
            onClick={handleClose}
          >
            Workspace Settings
          </MenuItem>
          <MenuItem component={Link} to="/billing" onClick={handleClose}>
            Billing Tracking
          </MenuItem>
          <MenuItem component={Link} to="/subscription" onClick={handleClose}>
            Subscription
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
