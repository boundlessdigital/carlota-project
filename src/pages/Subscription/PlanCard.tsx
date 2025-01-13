import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  Stack,
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { SubscriptionPlan } from './types';

interface PlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan: boolean;
  onSelect: (planId: string) => void;
}

export const PlanCard = ({ plan, isCurrentPlan, onSelect }: PlanCardProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        position: 'relative',
        p: 3,
        height: '100%',
        borderRadius: 2,
        border: (theme) => `1px solid ${isCurrentPlan ? theme.palette.primary.main : theme.palette.divider}`,
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
    >
      {plan.isPopular && (
        <Chip
          label="Most Popular"
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: -10,
            right: 16,
          }}
        />
      )}

      <Stack spacing={3}>
        <Box>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.25rem'
            }}
          >
            {plan.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              minHeight: 48,
              fontSize: '0.95rem'
            }}
          >
            {plan.description}
          </Typography>
        </Box>

        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              fontSize: '2rem'
            }}
          >
            {plan.price}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: '0.9rem' }}
          >
            {plan.billingPeriod}
          </Typography>
        </Box>

        <List sx={{ py: 2 }}>
          {plan.features.map((feature, index) => (
            <ListItem 
              key={index} 
              sx={{ 
                px: 0,
                py: 0.5
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {feature.included ? (
                  <CheckIcon 
                    fontSize="small" 
                    sx={{ color: 'success.main' }}
                  />
                ) : (
                  <CloseIcon 
                    fontSize="small"
                    sx={{ color: 'error.main' }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
                    {feature.name}
                    {feature.limit && (
                      <Typography 
                        component="span" 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ ml: 0.5 }}
                      >
                        ({feature.limit})
                      </Typography>
                    )}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Button
          variant={isCurrentPlan ? 'outlined' : 'contained'}
          onClick={() => onSelect(plan.id)}
          sx={{ 
            mt: 'auto',
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
        </Button>
      </Stack>
    </Paper>
  );
};
