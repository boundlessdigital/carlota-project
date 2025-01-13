import { Box, BoxProps } from '@chakra-ui/react';

export const Card = (props: BoxProps) => (
  <Box
    bg="white"
    borderRadius="lg"
    boxShadow="sm"
    p={6}
    {...props}
  />
);
