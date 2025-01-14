import { useState, useCallback, useEffect } from "react";
import { logInCustomer, signUpCustomer } from "@/components/api/customerApi";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsAuthenticated(true);
    }
  }, []);

  const logIn = useCallback(async (email: string, password: string) => {
    try {
      const data = await logInCustomer({ email, password });
      setIsAuthenticated(true);
      localStorage.setItem("userData", JSON.stringify(data));
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

  const logOut = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
  }, []);

  return { isAuthenticated, logIn, signUp, logOut };
};

export default useAuth;
