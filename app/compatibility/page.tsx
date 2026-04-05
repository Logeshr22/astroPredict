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
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Compatibility Check</h1>
          <p className="text-xl text-gray-600">
            {step === "person1"
              ? "First, tell us about yourself"
              : "Now, enter your partner's birth details"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                step === "person1"
                  ? "bg-purple-600 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {step === "person1" ? "1" : "✓"}
            </div>
            <span className="text-xs text-gray-600 mt-2">You</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                step === "person2"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              2
            </div>
            <span className="text-xs text-gray-600 mt-2">Partner</span>
          </div>
        </div>

        <div className="card mt-8">
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
              className="mt-8 pt-6 border-t border-gray-200 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              ← Go back and edit your details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
