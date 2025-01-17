import axiosInstance from "./axios-instance";

interface SubscriptionResponse {
  url: string;
}

const createSubscription = async (
  tier: string
): Promise<SubscriptionResponse | void> => {
  const response = await axiosInstance.get<SubscriptionResponse>(
    `/subscribe?tier=${tier}`
  );
  return response.data;
};

export default createSubscription;
