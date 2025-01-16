import { useForm } from "react-hook-form";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import createSubscription from "../api/subscription";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { faqs, featureList, tiers, addons, currency } from "../data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  SubscriptionFormValues,
  subscriptionSchema,
} from "@/lib/subscription-schema";
// import StripeCheckout from "@/components/stripe/stripe-checkout";

const SubscriptionTiers = () => {
  // const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [cvc, setCvc] = useState("");
  // const [email, setEmail] = useState("");
  const [tier, setTier] = useState("starter");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // useEffect(() => {
  //   if (!localStorage.getItem("stripeId")) {
  //     navigate("/");
  //   }
  // });

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      // email: "", // Email address
      tier: tier, // Subscription product
      cardNumber: "", // Card number
      expiryDate: "", // Card Expiry Date
      cvc: "", // CVC
    },
  });

  const onSubscriptionSubmit = async (values: SubscriptionFormValues) => {
    const stripeId = localStorage.getItem("stripeId");

    const subscriptionData = {
      stripe_id: stripeId,
      tier: values.tier,
      cardNumber: values.cardNumber,
      expiryDate: values.expiryDate,
      cvc: values.cvc,
    };

    console.log(subscriptionData);

    // try {
    //   const subscription = await createSubscription(subscriptionData);
    //   console.log("Form submitted:", subscription);
    //   setIsOpen(false); // Close the modal on success
    // } catch (error) {
    //   console.error("Error creating subscription:", error);
    //   // Handle error, e.g., show an error message to the user
    // }
  };

  const onSubscribe = async (tier: string) => {
    const subscription = await createSubscription(tier);
    if (typeof subscription!.url === "string") {
      window.location.href = subscription!.url;
      localStorage.setItem("sessionId", subscription!.session_id);
    } else {
      console.error("Subscription creation failed:", subscription);
    }
  };

  return (
    <>
      <div className="space-y-6 min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Plans & Pricing Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Plans & Pricing</CardTitle>
            <CardDescription className="w-full">
              Start with our free 14-day trial on the Starter Plan. Upgrade to a
              monthly paid plan tailored for small, medium, or large businesses,
              and customize further with optional add-ons to suit your needs.
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {tiers.map((tier, index) => (
                <Card key={index} className="flex flex-col mb-5">
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>
                      {currency}
                      {tier.price}/{tier.recurring}
                    </CardDescription>
                    <Separator />
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="mb-4">{tier.description}</p>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <div
                          className="flex flex-row space-x-1"
                          key={`${index}-${featureIndex}`}
                        >
                          <Check className="text-green-500" />
                          <li>{feature}</li>
                        </div>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full mt-10"
                      onClick={() => {
                        // setIsOpen(!isOpen);
                        setTier(tier.name.toLowerCase());
                        onSubscribe(tier.name.toLowerCase());
                      }}
                    >
                      Select {tier.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Feature Comparison Card */}
        <Card className="">
          <CardHeader>
            <CardTitle>Detailed Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  {tiers.map((tier, index) => (
                    <TableHead key={index}>{tier.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureList.map((feature, featureIndex) => (
                  <TableRow key={featureIndex}>
                    <TableCell>{feature}</TableCell>
                    {tiers.map((tier, index) => (
                      <TableCell key={`${index}-${featureIndex}`}>
                        {tier.features.includes(feature) ||
                        (feature === "Storage" &&
                          tier.features.some((f) => f.includes("storage"))) ? (
                          <Check className="text-green-500" />
                        ) : (
                          <X className="text-red-500" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* Add-ons Subscription Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Optional Add-ons</CardTitle>
            <CardDescription className="w-full">
              Enhance your journey with optional add-ons designed to boost
              efficiency and provide deeper insights. Tailor your experience by
              integrating advanced features to meet your organization's specific
              needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {addons.map((addon, index) => (
              <Card key={index} className="flex flex-col mb-5">
                <CardHeader>
                  <CardTitle>{addon.name}</CardTitle>
                  <CardDescription>
                    {currency}
                    {addon.price}/{addon.recurring}
                  </CardDescription>
                </CardHeader>
                <CardContent>{addon.description}</CardContent>
                <CardFooter>
                  <Button disabled={true}>Select {addon.name}</Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
        {/* Subscription Info */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full mb-5">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Subscription</DialogTitle>
            <DialogDescription>
              Complete your subscription by filling in your details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubscriptionSubmit)}
              className="space-y-4"
            >
              {/* <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="tier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Tier</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setTier(value);
                          field.onChange(value);
                        }}
                        defaultValue={tier}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiers.map((tier, index) => (
                            <SelectItem
                              value={tier.name.toLowerCase()}
                              key={index}
                            >
                              {tier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => {
                          setCardNumber(e.target.value);
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => {
                            setExpiryDate(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123"
                          value={cvc}
                          onChange={(e) => {
                            setCvc(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Confirm
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionTiers;
