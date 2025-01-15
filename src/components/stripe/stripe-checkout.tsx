import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Define types for the props
interface CheckoutFormProps {
  onSubmit: (token: string) => void;
}

interface StripeCheckoutProps {
  onSubmit: (token: string) => void;
}

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51QZ2KgRuTMaRJMyasN1CYYX2kWligouAYTKMpshbMD3jpSePzdDlzz69rYzt2uctBzWk9suyaaZGdqmxpVINOfME00L3rPYPeL";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Checkout Form Component
const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found");
      setIsProcessing(false);
      return;
    }

    // Create a token with the card details
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setError(error.message ?? "An error occurred");
      setIsProcessing(false);
      return;
    }

    // Pass the token to your backend
    if (token) {
      onSubmit(token.id);
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

// Stripe Checkout Wrapper Component
const StripeCheckout: React.FC<StripeCheckoutProps> = ({ onSubmit }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onSubmit={onSubmit} />
    </Elements>
  );
};

export default StripeCheckout;
