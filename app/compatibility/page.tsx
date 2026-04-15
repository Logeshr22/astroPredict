"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BirthDataForm from "@/components/BirthDataForm";
import { toast } from "react-hot-toast";
import { api } from "@/app/lib/api";
import { Heart } from "lucide-react";

export default function CompatibilityPage() {
  const router = useRouter();
  const [step, setStep] = useState<"person1" | "person2">("person1");
  const [person1Data, setPerson1Data] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePerson1Submit = (data: any) => {
    setPerson1Data(data);
    setStep("person2");
    toast.success("Great! Now enter your partner's details");
  };

  const handlePerson2Submit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post("/compatibility/analyze", {
        person1: person1Data,
        person2: data,
      });

      const reportId = response.data.id;
      router.push(`/results/${reportId}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compatibility-container">
      <div className="compatibility-wrapper">
        <div className="compatibility-header">
          <div className="compatibility-icon">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="compatibility-title">Compatibility Check</h1>
          <p className="compatibility-subtitle">
            {step === "person1"
              ? "First, tell us about yourself"
              : "Now, enter your partner's birth details"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="progress-container">
          <div className="progress-step">
            <div
              className={`progress-circle ${
                step === "person1" ? "active" : "completed"
              }`}
            >
              {step === "person1" ? "1" : "✓"}
            </div>
            <span className="progress-label">You</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <div
              className={`progress-circle ${
                step === "person2" ? "active" : "inactive"
              }`}
            >
              2
            </div>
            <span className="progress-label">Partner</span>
          </div>
        </div>

        <div className="form-card">
          {step === "person1" ? (
            <BirthDataForm
              onSubmit={handlePerson1Submit}
              title="Your Birth Details"
            />
          ) : (
            <BirthDataForm
              onSubmit={handlePerson2Submit}
              title="Partner's Birth Details"
              loading={loading}
            />
          )}

          {step === "person2" && (
            <button
              onClick={() => setStep("person1")}
              className="form-back-button"
            >
              ← Go back and edit your details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
