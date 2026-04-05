"use client";

import { useRouter } from "next/navigation";
import { Sparkles, Heart, Star, Zap, Shield, Globe } from "lucide-react";
import PricingCards from "@/components/PricingCards";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div
            className="absolute top-40 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative container-tight text-center">
          <div className="animate-fade-in-up">
            <div className="badge mb-6 justify-center">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Astrology</span>
            </div>

            <h1 className="mb-8 leading-tight">
              Find Your
              <br />
              <span className="section-title">Cosmic Match</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover deep compatibility insights using advanced Western &
              Vedic astrology. Know if they're your soulmate before the first
              date.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <button
                onClick={() => router.push("/compatibility")}
                className="btn-primary"
              >
                <Sparkles className="w-5 h-5" />
                Try Free Compatibility Check
              </button>
              <button
                onClick={() => router.push("/register")}
                className="btn-secondary"
              >
                Create Account
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="glass-card">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="glass-card">
                <Heart className="w-6 h-6 text-red-500 fill-red-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600">Matches</div>
              </div>
              <div className="glass-card">
                <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Private</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 bg-white/40">
        <div className="container-tight">
          <div className="text-center mb-20">
            <span className="section-divider"></span>
            <h2 className="section-title mb-4">Why Cosmic Match?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the most accurate astrological compatibility analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
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

      {/* How It Works
      <section className="relative py-24 px-4">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="section-divider"></span>
            <h2 className="section-title mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Four simple steps to discover your cosmic connection
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number={1}
              title="Enter Birth Data"
              description="Your date, time, and place of birth"
            />
            <StepCard
              number={2}
              title="Add Partner's Info"
              description="Their birth details for comparison"
            />
            <StepCard
              number={3}
              title="AI Analysis"
              description="Advanced calculations in seconds"
            />
            <StepCard
              number={4}
              title="Get Insights"
              description="Detailed compatibility report"
            />
          </div>

          <div className="mt-16 flex justify-center">
            <button
              onClick={() => router.push("/compatibility")}
              className="btn-primary"
            >
              <Heart className="w-5 h-5" />
              Start Your Analysis
            </button>
          </div>
        </div>
      </section> */}

      {/* Pricing */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-white/40 to-purple-50/40">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="section-divider"></span>
            <h2 className="section-title mb-2">Choose Your Plan</h2>
            <p className="text-gray-600 text-lg">
              Start free, upgrade anytime with no hidden fees
            </p>
          </div>

          <PricingCards />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4">
        <div className="container-tight">
          <div className="card-gradient border-2 border-purple-200 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Find Your Cosmic Match?
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
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
      <div className="feature-icon flex justify-center mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
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
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
    </div>
  );
}
