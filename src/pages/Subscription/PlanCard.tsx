import * as Chakra from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';
import { SubscriptionPlan } from './types';

interface PlanCardProps {
  plan: SubscriptionPlan;
  isActive: boolean;
  onSelect: (planId: string) => void;
}

export const PlanCard = ({ plan, isActive, onSelect }: PlanCardProps) => {
  return (
    <Chakra.Box
      borderWidth="1px"
      borderColor={isActive ? '#0D1B3F' : 'gray.200'}
      borderRadius="lg"
      p={6}
      bg="white"
      position="relative"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
    >
      {plan.isPopular && (
        <Chakra.Badge
          colorScheme="blue"
          position="absolute"
          top="-2"
          right="4"
          fontSize="sm"
        >
          Most Popular
        </Chakra.Badge>
      )}

      <Chakra.VStack spacing={4} align="stretch">
        <Chakra.Box>
          <Chakra.Heading size="md" mb={2}>
            {plan.name}
          </Chakra.Heading>
          <Chakra.Text color="gray.600" fontSize="sm" minHeight="40px">
            {plan.description}
          </Chakra.Text>
        </Chakra.Box>

        <Chakra.Box>
          <Chakra.Text fontSize="2xl" fontWeight="bold">
            {plan.price}
          </Chakra.Text>
          <Chakra.Text color="gray.600" fontSize="sm">
            {plan.billingPeriod}
          </Chakra.Text>
        </Chakra.Box>

        <Chakra.List spacing={3}>
          {plan.features.map((feature, index) => (
            <Chakra.ListItem key={index} display="flex" alignItems="center">
              <Chakra.ListIcon
                as={feature.included ? FiCheck : FiX}
                color={feature.included ? 'green.500' : 'red.500'}
              />
              <Chakra.Text fontSize="sm">
                {feature.name}
                {feature.limit && (
                  <Chakra.Text as="span" color="gray.600">
                    {' '}
                    ({feature.limit})
                  </Chakra.Text>
                )}
              </Chakra.Text>
            </Chakra.ListItem>
          ))}
        </Chakra.List>

        <Chakra.Button
          colorScheme={isActive ? 'gray' : 'blue'}
          variant={isActive ? 'outline' : 'solid'}
          onClick={() => onSelect(plan.id)}
          mt={4}
        >
          {isActive ? 'Current Plan' : 'Select Plan'}
        </Chakra.Button>
      </Chakra.VStack>
    </Chakra.Box>
  );
};
