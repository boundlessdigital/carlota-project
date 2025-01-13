import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const pathToTitle: Record<string, string> = {
  'workspace-settings': 'Workspace Settings',
  'billing-tracking': 'Billing Tracking',
  'subscription': 'Subscription',
};

export const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <ChakraBreadcrumb mb={6} color="gray.600">
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathSegments.map((segment, index) => (
        <BreadcrumbItem key={segment} isCurrentPage={index === pathSegments.length - 1}>
          <BreadcrumbLink as={Link} to={`/${segment}`}>
            {pathToTitle[segment] || segment}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};
