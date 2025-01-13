import { useState, useRef } from 'react';
import * as Chakra from '@chakra-ui/react';
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
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = Chakra.useToast();

  const handlePlanSelect = (planId: string) => {
    if (planId === 'pro') {
      setSelectedPlan(planId);
      setIsConfirmOpen(true);
    } else {
      // For demo purposes, show a message for other plans
      toast({
        title: 'Feature Coming Soon',
        description: 'This subscription plan will be available soon.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    // Here you would typically make an API call to update the subscription
    toast({
      title: 'Plan Updated',
      description: 'Your subscription has been updated successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Chakra.Box>
      <Breadcrumb />
      <Chakra.Heading size="lg" mb={2} color="black">
        Subscription Plans
      </Chakra.Heading>
      <Chakra.Text mb={6} color="gray.600">
        Choose the plan that best fits your needs
      </Chakra.Text>

      <Chakra.SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {subscriptionPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isActive={currentPlan === plan.name}
            onSelect={handlePlanSelect}
          />
        ))}
      </Chakra.SimpleGrid>

      <Chakra.AlertDialog
        isOpen={isConfirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsConfirmOpen(false)}
      >
        <Chakra.AlertDialogOverlay>
          <Chakra.AlertDialogContent>
            <Chakra.AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Subscription Change
            </Chakra.AlertDialogHeader>

            <Chakra.AlertDialogBody>
              Are you sure you want to change your subscription plan? This will affect your billing immediately.
            </Chakra.AlertDialogBody>

            <Chakra.AlertDialogFooter>
              <Chakra.Button ref={cancelRef} onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </Chakra.Button>
              <Chakra.Button colorScheme="blue" onClick={handleConfirm} ml={3}>
                Confirm
              </Chakra.Button>
            </Chakra.AlertDialogFooter>
          </Chakra.AlertDialogContent>
        </Chakra.AlertDialogOverlay>
      </Chakra.AlertDialog>
    </Chakra.Box>
  );
};
