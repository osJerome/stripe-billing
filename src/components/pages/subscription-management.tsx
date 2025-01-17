// import { useEffect, useState } from "react";
// import axiosInstance from "@/components/api/axios-instance";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
// import { AlertCircle } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// const usageData = [
//   { name: "Jan", usage: 4000 },
//   { name: "Feb", usage: 3000 },
//   { name: "Mar", usage: 2000 },
//   { name: "Apr", usage: 2780 },
//   { name: "May", usage: 1890 },
//   { name: "Jun", usage: 2390 },
//   { name: "Jul", usage: null },
//   { name: "Aug", usage: null },
//   { name: "Sep", usage: null },
//   { name: "Oct", usage: null },
//   { name: "Nov", usage: null },
//   { name: "Dec", usage: null },
// ];

// const invoices = [
//   { date: "2023-05-01", amount: "$19.99", status: "Paid" },
//   { date: "2023-04-01", amount: "$19.99", status: "Paid" },
//   { date: "2023-03-01", amount: "$19.99", status: "Paid" },
// ];

// const SubscriptionManagement = () => {
//   const [customerId, setCustomerId] = useState<string | null>(null);
//   const [subscriptionData, setSubscriptionData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch customer ID from URL and subscription data
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const id = urlParams.get("customer");
//     if (id) {
//       setCustomerId(id);
//       fetchSubscriptionData(id);
//     }
//   }, []);

//   // Fetch subscription data
//   const fetchSubscriptionData = async (customerId: string) => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get(`/subscriptions/${customerId}`);
//       setSubscriptionData(response.data);
//     } catch (error) {
//       console.error("Failed to fetch subscription data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Cancel subscription
//   const cancelSubscription = async () => {
//     if (!customerId) return;
//     setIsLoading(true);
//     try {
//       await axiosInstance.post(`/subscriptions/${customerId}/cancel`);
//       alert("Subscription canceled successfully.");
//       fetchSubscriptionData(customerId); // Refresh subscription data
//     } catch (error) {
//       console.error("Failed to cancel subscription:", error);
//       alert("An error occurred while canceling the subscription.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold text-center">
//         Manage Your Subscription
//       </h1>
//       {isLoading && <p>Loading...</p>}
//       {!isLoading && subscriptionData && (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Current Plan: {subscriptionData.plan}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p>
//                   Next billing date:{" "}
//                   {new Date(
//                     subscriptionData.nextBillingDate
//                   ).toLocaleDateString()}
//                 </p>
//                 <p>Monthly cost: ${subscriptionData.amount / 100}</p>
//                 <div className="mt-4 space-y-2">
//                   <p>Storage Usage</p>
//                   <Progress value={66} />
//                   <p className="text-sm text-gray-500">3.3GB of 5GB used</p>
//                 </div>
//                 <div className="mt-4 space-x-2">
//                   <Button>Upgrade Plan</Button>
//                   <Button variant="outline">Downgrade Plan</Button>
//                 </div>
//                 <Button
//                   variant="destructive"
//                   className="mt-4"
//                   onClick={cancelSubscription}
//                 >
//                   Cancel Subscription
//                 </Button>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Usage Analytics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ChartContainer
//                   config={{
//                     usage: { label: "Usage", color: "hsl(var(--chart-1))" },
//                   }}
//                 >
//                   <BarChart data={usageData}>
//                     <CartesianGrid vertical={false} />
//                     <XAxis
//                       dataKey="name"
//                       tickLine={false}
//                       tickMargin={10}
//                       axisLine={false}
//                     />
//                     <ChartTooltip
//                       cursor={false}
//                       content={<ChartTooltipContent indicator="dashed" />}
//                     />
//                     <Bar dataKey="usage" fill="var(--color-usage)" radius={4} />
//                   </BarChart>
//                 </ChartContainer>
//               </CardContent>
//             </Card>
//           </div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Billing History</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <table className="w-full">
//                 <thead>
//                   <tr>
//                     <th className="text-left">Date</th>
//                     <th className="text-left">Amount</th>
//                     <th className="text-left">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoices.map((invoice, index) => (
//                     <tr key={index}>
//                       <td>{invoice.date}</td>
//                       <td>{invoice.amount}</td>
//                       <td>{invoice.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//           <Alert>
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Heads up!</AlertTitle>
//             <AlertDescription>
//               Your subscription will automatically renew on{" "}
//               {new Date(subscriptionData.nextBillingDate).toLocaleDateString()}.
//               If you want to make any changes, please do so before this date.
//             </AlertDescription>
//           </Alert>
//         </>
//       )}
//     </div>
//   );
// };

// export default SubscriptionManagement;
