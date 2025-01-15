import { useToast } from "@/hooks/use-toast";
import { useState, useCallback } from "react";
import { logInCustomer, signUpCustomer } from "@/components/api/authenticate";

const useAuth = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logIn = useCallback(
    async (email: string, password: string) => {
      try {
        const data = await logInCustomer({ email, password });
        toast({
          title: "Log In Successful.",
          description: "Customer was successfully authenticated!",
        });
        setIsAuthenticated(true);
        console.log(data);
        localStorage.setItem("stripeId", data.stripe_customer_id);
        return data;
      } catch (error) {
        console.error(error);
        toast({
          title: "Log In Unsuccessful.",
          description: "Invalid customer login details!",
          variant: "destructive",
        });
        setIsAuthenticated(false);
        return null;
      }
    },
    [toast]
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const data = await signUpCustomer({ name, email, password });
        toast({
          title: "Sign Up Successful.",
          description: "Customer was successfully created!",
        });
        setIsAuthenticated(true);
        return data;
      } catch (error) {
        console.error(error);
        toast({
          title: "Sign Up Unsuccessful.",
          description: "Customer already exists!",
          variant: "destructive",
        });
        setIsAuthenticated(false);
        return null;
      }
    },
    [toast]
  );

  const logOut = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, logIn, signUp, logOut };
};

export default useAuth;
