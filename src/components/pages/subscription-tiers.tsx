import createSubscription from "../api/subscription";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
import { faqs, featureList, tiers, addons, currency } from "@/components/data";
import { useUrlParam } from "@/components/hooks/useUrlParams"


const SubscriptionTiers = () => {
  const { toast } = useToast();
  const urlParam = useUrlParam("url")

  const onSubscribe = async (tier: string) => {
    try {
      const subscription = await createSubscription(tier, urlParam || "");
      if (
        subscription &&
        subscription.url &&
        typeof subscription.url === "string"
      ) {
        window.location.href = subscription.url;
        return;
      }

      toast({
        title: "Something went wrong",
        description: "There was a problem with your request",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Subscription creation failed",
        description: `There was a problem with your request\n\n${error}`,
        variant: "destructive",
      });
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
                      disabled={!tier.isAvailable}
                      className="w-full mt-10"
                      onClick={() => {
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
    </>
  );
};

export default SubscriptionTiers;
