"use client";

import { useState } from "react";
import {
  FileText,
  CreditCard,
  Repeat,
  DollarSign,
  Bell,
  BarChart,
  Check,
  ChevronDown,
  PlayCircle,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const features: Feature[] = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Create invoices in seconds",
      description:
        "Professional invoices with your branding. Send them instantly or schedule for later.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Track payments effortlessly",
      description:
        "Real-time payment tracking and automatic status updates. Never lose track of what's owed.",
    },
    {
      icon: <Repeat className="h-8 w-8 text-primary" />,
      title: "Manage subscriptions",
      description:
        "Set up recurring invoices for subscription-based services. Automated and hassle-free.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "Accept online payments",
      description:
        "Integrated payment processing. Get paid faster with multiple payment options.",
    },
    {
      icon: <Bell className="h-8 w-8 text-primary" />,
      title: "Automated reminders",
      description:
        "Smart reminder system for overdue invoices. Maintain cash flow without awkward conversations.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Detailed reporting",
      description:
        "Comprehensive analytics and insights. Make data-driven decisions for your business.",
    },
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for freelancers and solo entrepreneurs",
      features: [
        "Up to 25 invoices per month",
        "2 clients",
        "Basic reporting",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Unlimited invoices",
        "Unlimited clients",
        "Advanced reporting & analytics",
        "Priority support",
        "Recurring invoices",
        "Payment reminders",
        "Custom branding",
        "API access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with specific needs",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "Advanced security",
        "Multi-user accounts",
        "White-label solution",
      ],
    },
  ];

  const testimonials: Testimonial[] = [
    {
      quote:
        "Invoicely has transformed how we handle billing. What used to take hours now takes minutes. The automated reminders alone have improved our cash flow by 40%.",
      author: "Sarah Chen",
      role: "CEO",
      company: "TechStart Inc",
    },
    {
      quote:
        "As a freelancer, I need tools that just work. Invoicely is intuitive, professional, and saves me countless hours every month. Best investment I've made.",
      author: "Michael Rodriguez",
      role: "Freelance Designer",
      company: "MR Creative",
    },
    {
      quote:
        "The reporting features give us incredible visibility into our revenue streams. We can make informed decisions faster than ever before.",
      author: "Emma Thompson",
      role: "CFO",
      company: "Growth Labs",
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: "How quickly can I get started?",
      answer:
        "You can create your account and send your first invoice in under 5 minutes. No credit card required for the free trial.",
    },
    {
      question: "Can I customize my invoices?",
      answer:
        "Yes! You can add your logo, customize colors, add payment terms, and include custom fields to match your brand perfectly.",
    },
    {
      question: "What payment methods do you support?",
      answer:
        "We support all major credit cards, bank transfers, PayPal, and Stripe. Your clients can choose their preferred payment method.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-level encryption, regular security audits, and comply with GDPR, SOC 2, and other industry standards.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes, you can cancel your subscription at any time with no cancellation fees. Your data will remain accessible for 90 days after cancellation.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes! We offer a 14-day free trial with full access to all Professional features. No credit card required to start.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Invoicing made simple for modern businesses
                </h1>
                <p className="text-lg text-muted-foreground sm:text-xl">
                  Create, send, and track professional invoices in seconds.
                  Get paid faster with automated reminders and integrated
                  payments.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="text-base">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-base">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-auto lg:h-[500px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <FileText className="h-32 w-32 text-primary/40" aria-label="Invoice management illustration" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything you need to manage invoices
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your invoicing workflow
              and help you get paid faster.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that&apos;s right for your business. All plans include
              a 14-day free trial.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative flex flex-col ${
                  tier.popular
                    ? "border-primary border-2 shadow-lg scale-105"
                    : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && (
                      <span className="text-muted-foreground">{tier.period}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.popular ? "primary" : "outline"}
                  >
                    {tier.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Trusted by thousands of businesses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about Invoicely.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <p className="text-muted-foreground italic mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question? We&apos;re here to help.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  className="w-full text-left"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-lg font-semibold">
                      {faq.question}
                    </CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        openFAQ === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </CardHeader>
                </button>
                {openFAQ === index && (
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Ready to streamline your invoicing?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of businesses already using Invoicely. Start your
                free trial today—no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base"
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Invoicely. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
