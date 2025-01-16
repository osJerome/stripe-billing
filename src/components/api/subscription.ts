import axiosInstance from "./axios-instance";

interface SubscriptionResponse {
  session_id: string;
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


// Get session ID separate from the redirect URL
// 1. Create an API call to get session ID from the backend
// 2. Populate values on /manage
// 3. Perform operations based on customer ID