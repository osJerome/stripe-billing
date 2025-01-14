import { useState, useCallback } from "react";
import { logInCustomer, signUpCustomer } from "@/components/api/customerApi";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logIn = useCallback(async (email: string, password: string) => {
    try {
      const data = await logInCustomer({ email, password });
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      return null;
    }
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const data = await signUpCustomer({ name, email, password });
        setIsAuthenticated(true);
        return data;
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        return null;
      }
    },
    []
  );

  return { isAuthenticated, logIn, signUp };
};

export default useAuth;
