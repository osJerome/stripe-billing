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
import { faqs, featureList, tiers, addons } from "../data";

const SubscriptionTiers = () => {
  return (
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
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {tiers.map((tier) => (
              <Card key={tier.name} className="flex flex-col mb-5">
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>
                    {tier.price}/{tier.recurring}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4">{tier.description}</p>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <div className="flex flex-row space-x-1">
                        <Check className="text-green-500" />
                        <li key={feature}>{feature}</li>
                      </div>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-600/80">
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
                {tiers.map((tier) => (
                  <TableHead key={tier.name}>{tier.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureList.map((feature) => (
                <TableRow key={feature}>
                  <TableCell>{feature}</TableCell>
                  {tiers.map((tier) => (
                    <TableCell key={`${tier.name}-${feature}`}>
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
            Enhance your ESG compliance journey with optional add-ons designed
            to boost efficiency and provide deeper insights. Tailor your
            experience by integrating advanced features to meet your
            organization's specific needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {addons.map((addon) => (
            <Card key={addon.name} className="flex flex-col mb-5">
              <CardHeader>
                <CardTitle>{addon.name}</CardTitle>
                <CardDescription>
                  {addon.price}/{addon.recurring}
                </CardDescription>
              </CardHeader>
              <CardContent>{addon.description}</CardContent>
              <CardFooter>
                <Button
                  className="bg-green-600 hover:bg-green-600/80"
                  disabled={true}
                >
                  Select {addon.name}
                </Button>
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
  );
};

export default SubscriptionTiers;