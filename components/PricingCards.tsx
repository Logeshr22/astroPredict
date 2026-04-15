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
    <div className="pricing-grid">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`pricing-card ${plan.highlighted ? "highlighted" : ""}`}
        >
          {plan.highlighted && (
            <div className="pricing-badge">Most Popular</div>
          )}

          <div className="pricing-header">
            <h3 className="pricing-name">{plan.name}</h3>
            <div className="pricing-price">
              <span className="pricing-price-amount">{plan.price}</span>
            </div>
            <p className="pricing-period">{plan.period}</p>
          </div>

          <ul className="pricing-features">
            {plan.features.map((feature) => (
              <li key={feature} className="pricing-feature">
                <Check className="pricing-feature-icon" />
                <span className="pricing-feature-text">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => router.push("/register")}
            className={`pricing-button ${
              plan.highlighted ? "primary" : "secondary"
            }`}
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
