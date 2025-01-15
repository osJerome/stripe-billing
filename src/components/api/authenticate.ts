import axiosInstance from "@/components/api/axios-instance";

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const logInCustomer = async (data: LoginData) => {
  const response = await axiosInstance.post("/log-in", data);
  return response.data;
};

export const signUpCustomer = async (data: SignUpData) => {
  const response = await axiosInstance.post("/sign-up", data);
  return response.data;
};
