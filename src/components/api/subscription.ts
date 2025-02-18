import axiosInstance from "./axios-instance";

interface SubscriptionResponse {
  url: string;
}

const createSubscription = async (
  tier: string,
  fallbackUrl: string
): Promise<SubscriptionResponse | void> => {
  const response = await axiosInstance.get<SubscriptionResponse>(
    `/subscribe?tier=${tier}&fallbackUrl=${fallbackUrl}`
  );
  return response.data;
};

export default createSubscription;
