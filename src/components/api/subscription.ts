import axiosInstance from "./axios-instance";

interface SubscriptionData {
  tier: string;
  cardNumber: string; // 16 digits
  expiryDate: string; // MM/YY format
  cvc: string; // 3 or 4 digits
}

interface SubscriptionResponse {
  message: string;
  subscription_id: string;
  customer_id: string;
}

const createSubscription = async (
  subscriptionData: SubscriptionData
): Promise<SubscriptionResponse | void> => {
  const response = await axiosInstance.post<SubscriptionResponse>(
    "/create-subscription",
    subscriptionData
  );
  return response.data;
};

export default createSubscription;
