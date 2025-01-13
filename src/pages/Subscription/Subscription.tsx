import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { Breadcrumb } from '../../components/Breadcrumb';
import { PlanCard } from './PlanCard';
import { SubscriptionPlan, PlanType } from './types';

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic access to 3 products with limited features',
    price: '$0',
    billingPeriod: 'Forever free',
    features: [
      { name: 'Access to 3 products', included: true },
      { name: 'Basic features', included: true },
      { name: 'Community support', included: true },
      { name: 'Advanced features', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom user limit', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Pay-per-use access to all products with advanced features',
    price: '$10',
    billingPeriod: 'Per login',
    features: [
      { name: 'Access to all products', included: true },
      { name: 'Advanced features', included: true },
      { name: 'Priority support', included: true },
      { name: 'Usage-based billing', included: true, limit: '$10 per login' },
      { name: 'Team collaboration', included: true },
      { name: 'Custom user limit', included: false },
    ],
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Unlimited access with dedicated support and custom user limits',
    price: '$1,000',
    billingPeriod: 'Per user / month',
    features: [
      { name: 'Access to all products', included: true },
      { name: 'Advanced features', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'Unlimited usage', included: true },
      { name: 'Team collaboration', included: true },
      { name: 'Custom user limit', included: true },
    ],
  },
];

export const Subscription = () => {
  const [currentPlan] = useState<PlanType>('Pro');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const handlePlanSelect = (planId: string) => {
    if (planId === 'pro') {
      setSelectedPlan(planId);
      setIsConfirmOpen(true);
    } else {
      setSnackbar({
        open: true,
        message: 'This subscription plan will be available soon.',
        severity: 'info',
      });
    }
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    setSnackbar({
      open: true,
      message: 'Your subscription has been updated successfully.',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200 }}>
      <Breadcrumb />
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          fontWeight: 600,
          mb: 1
        }}
      >
        Subscription Plans
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.secondary',
          mb: 4,
          fontSize: { xs: '1rem', sm: '1.1rem' }
        }}
      >
        Choose the plan that best fits your needs
      </Typography>

      <Grid container spacing={3}>
        {subscriptionPlans.map((plan) => (
          <Grid item xs={12} md={6} lg={4} key={plan.id}>
            <PlanCard
              plan={plan}
              isCurrentPlan={currentPlan.toLowerCase() === plan.id}
              onSelect={handlePlanSelect}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
      >
        <DialogTitle>Confirm Subscription Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change your subscription plan? This will take effect immediately.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
