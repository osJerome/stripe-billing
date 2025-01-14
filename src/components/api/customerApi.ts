import axiosInstance from "@/components/api/axiosInstance";

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
  try {
    const response = await axiosInstance.post("/log-in", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Failed to log in");
  }
};

export const signUpCustomer = async (data: SignUpData) => {
  try {
    const response = await axiosInstance.post("/sign-up", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Failed to sign up");
  }
};
