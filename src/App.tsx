import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { MainLayout } from './layouts/MainLayout';
import { WorkspaceSettings } from './pages/WorkspaceSettings/WorkspaceSettings';
import { BillingTracking } from './pages/BillingTracking/BillingTracking';
import { Subscription } from './pages/Subscription/Subscription';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D1B3F',
    },
    background: {
      default: '#F6F6F7',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          margin: 0;
          padding: 0;
          min-height: 100%;
        }
        #root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<WorkspaceSettings />} />
            <Route path="/workspace-settings" element={<WorkspaceSettings />} />
            <Route path="/billing" element={<BillingTracking />} />
            <Route path="/subscription" element={<Subscription />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
