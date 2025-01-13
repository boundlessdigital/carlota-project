export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  billingPeriod: string;
  features: PlanFeature[];
  isPopular?: boolean;
}

export type PlanType = 'Free' | 'Pro' | 'Enterprise';
