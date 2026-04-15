"use client";

import { useRouter } from "next/navigation";
import { Sparkles, Heart, Star, Zap, Shield, Globe } from "lucide-react";
import PricingCards from "@/components/PricingCards";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="blob blob-purple"></div>
          <div className="blob blob-pink"></div>
          <div className="blob blob-indigo"></div>
        </div>

        <div className="hero-content">
          <div className="fade-in-up">
            <div className="badge">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Astrology</span>
            </div>

            <h1 className="hero-title">
              Find Your
              <br />
              <span className="section-title">Cosmic Match</span>
            </h1>

            <p className="hero-description">
              Discover deep compatibility insights using advanced Western &
              Vedic astrology. Know if they're your soulmate before the first
              date.
            </p>

            <div className="button-group">
              <button
                onClick={() => router.push("/compatibility")}
                className="btn-primary"
              >
                Try Free Compatibility Check
                  {/* <Sparkles/> */}
              </button>
              <button
                onClick={() => router.push("/register")}
                className="btn-secondary"
              >
                Create Account
              </button>
            </div>

            <div className="stats-grid">
              <div className="glass-card">
                <Star className="glass-card-icon text-yellow-500 fill-yellow-500" />
                <div className="glass-card-value">4.9/5</div>
                <div className="glass-card-label">Rating</div>
              </div>
              <div className="glass-card">
                <Heart className="glass-card-icon text-red-500 fill-red-500" />
                <div className="glass-card-value">10,000+</div>
                <div className="glass-card-label">Matches</div>
              </div>
              <div className="glass-card">
                <Shield className="glass-card-icon text-green-500" />
                <div className="glass-card-value">100%</div>
                <div className="glass-card-label">Private</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container-tight">
          <div className="section-header">
            <span className="section-divider"></span>
            <h2 className="section-title section-header-title">
              Why Cosmic Match?
            </h2>
            <p className="section-description">
              Experience the most accurate astrological compatibility analysis
            </p>
          </div>

          <div className="features-grid">
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-purple-600" />}
              title="Dual System Analysis"
              description="Get insights from both Western & Vedic astrology systems for comprehensive compatibility."
            />
            <FeatureCard
              icon={<Sparkles className="w-12 h-12 text-pink-600" />}
              title="AI-Powered Insights"
              description="Advanced AI interprets complex astrological patterns to give you personalized guidance."
            />
            <FeatureCard
              icon={<Globe className="w-12 h-12 text-indigo-600" />}
              title="Real-Time Transits"
              description="Know the best timing for important relationship decisions based on current planetary movements."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section">
        <div className="container-tight">
          <div className="pricing-header">
            <span className="section-divider"></span>
            <h2 className="section-title pricing-header-title">
              Choose Your Plan
            </h2>
            <p className="pricing-header-description">
              Start free, upgrade anytime with no hidden fees
            </p>
          </div>

          <PricingCards />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container-tight">
          <div className="card-gradient">
            <h2 className="cta-title">Ready to Find Your Cosmic Match?</h2>
            <p className="cta-description">
              Join thousands who've discovered their astrological compatibility
              and found meaningful connections
            </p>
            <button
              onClick={() => router.push("/register")}
              className="btn-primary"
            >
              <Sparkles className="w-5 h-5" />
              Get Started Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="step-card">
      <div className="step-number">{number}</div>
      <h3 className="step-title">{title}</h3>
      <p className="step-description">{description}</p>
    </div>
  );
}
