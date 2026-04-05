"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PricingCards() {
  const router = useRouter();

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: [
        "3 compatibility checks/month",
        "Basic Western astrology",
        "Compatibility score",
        "Email support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "₹299",
      period: "per month",
      features: [
        "Unlimited compatibility checks",
        "Western + Vedic astrology",
        "AI-powered insights",
        "Transit alerts",
        "Priority support",
        "PDF reports",
      ],
      cta: "Upgrade Now",
      highlighted: true,
    },
    {
      name: "Pro",
      price: "₹999",
      period: "per month",
      features: [
        "Everything in Premium",
        "1-on-1 astrologer chat",
        "Yearly forecast",
        "Relationship timeline",
        "Custom transit alerts",
        "API access",
      ],
      cta: "Go Pro",
      highlighted: false,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`card relative ${
            plan.highlighted
              ? "border-4 border-purple-600 shadow-2xl scale-105"
              : "border-2 border-gray-200"
          }`}
        >
          {plan.highlighted && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
              Most Popular
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-1">
              <span className="text-5xl font-bold">{plan.price}</span>
            </div>
            <p className="text-gray-600">{plan.period}</p>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => router.push("/register")}
            className={
              plan.highlighted ? "btn-primary w-full" : "btn-secondary w-full"
            }
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
