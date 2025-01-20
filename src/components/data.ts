export const tiers = [
  {
    name: "Starter",
    price: 0.00,
    recurring: "14-day free trial",
    features: [
      "Transcription Services",
      "Agentic Services",
      "Text Generation",
      "AI Consultation",
      "Custom Integrations",
    ],
    description: "For users exploring services.",
  },
  {
    name: "Startup",
    price: 99.99,
    recurring: "month",
    features: ["Transcription Services", "Text Generation"],
    description: "For startups or small-sized companies.",
  },
  {
    name: "Advanced",
    price: 249.99,
    recurring: "month",
    features: [
      "Transcription Services",
      "Agentic Services",
      "Text Generation",
      "AI Consultation",
    ],
    description: "For medium-sized companies.",
  },
  {
    name: "Enterprise",
    price: 499.99,
    recurring: "month",
    features: [
      "Transcription Services",
      "Agentic Services",
      "Text Generation",
      "AI Consultation",
      "Custom Integrations",
      "Data Analytics",
      "Custom AI Solutions",
    ],
    description: "For large-sized companies.",
  },
];

export const featureList = [
  "Transcription Services",
  "Agentic Services",
  "Text Generation",
  "AI Consultation",
  "Custom Integrations",
  "Data Analytics",
  "Custom AI Solutions",
];

export const faqs = [
  {
    question: "What's included in each subscription tier?",
    answer:
      "Each tier builds upon the previous one. Starter includes basic features, Startups adds text generation, Advanced includes AI consultation, and Enterprise offers the full suite including custom integrations and data analytics.",
  },
  {
    question: "Can I upgrade or downgrade my subscription?",
    answer:
      "Yes, you can change your subscription at any time. Changes will be reflected in your next billing cycle. If you downgrade, ensure to back up your data if the new tier does not support all features.",
  },
  {
    question: "How does billing work?",
    answer:
      "We bill monthly on the date you signed up. You can view your next billing date in the Manage Subscription page. Annual billing options are also available for discounted rates.",
  },
  {
    question: "What happens if I cancel my subscription?",
    answer:
      "If you cancel, you'll retain access to your current tier until the end of your billing period. Post this period, your account will revert to a free tier with limited features.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial for all new users. During this trial, you can try out any tier. If you don't upgrade, you'll transition to the free Starter plan after the trial ends.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We prioritize data security. All data is encrypted both at rest and in transit. Our platform undergoes regular security audits and backups to ensure data integrity.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, debit cards, and PayPal. Contact support for alternative payment options for Enterprise plans.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refunds are generally not provided, but exceptions can be made in cases of accidental charges or service issues. Contact support for assistance.",
  },
];

export const addons = [
  {
    name: "AI Chatbot",
    price: 199.99,
    description: "An AI Chatbot add-on tailored to your needs.",
    recurring: "month"
  },
];

export const currency = "$";