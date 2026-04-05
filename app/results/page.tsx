"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/app/lib/api";
import {
  Heart,
  Users,
  MessageCircle,
  TrendingUp,
  AlertCircle,
  Download,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [params.id]);

  const fetchReport = async () => {
    try {
      const response = await api.get(`/compatibility/reports/${params.id}`);
      setReport(response.data);
    } catch (error) {
      toast.error("Failed to load report");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing cosmic compatibility...</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const scoreColor =
    report.score >= 8
      ? "text-green-600"
      : report.score >= 6
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card mb-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Compatibility Report</h1>
            <p className="text-gray-600">Based on Western & Vedic Astrology</p>
          </div>

          <div className="mb-6">
            <div className={`text-7xl font-bold mb-2 ${scoreColor}`}>
              {report.score}/10
            </div>
            <p className="text-xl font-semibold">
              {report.score >= 8
                ? "🎉 Excellent Match!"
                : report.score >= 6
                  ? "👍 Good Compatibility"
                  : "💭 Challenging But Possible"}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button className="btn-primary">
              <Download className="w-4 h-4 inline mr-2" />
              Download PDF
            </button>
            <button
              onClick={() => router.push("/compatibility")}
              className="btn-secondary"
            >
              New Check
            </button>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-6">
          {/* Emotional Connection */}
          <AnalysisCard
            icon={<Heart className="w-6 h-6" />}
            title="Emotional Connection"
            score={report.emotionalScore}
            description={report.emotionalAnalysis}
            color="purple"
          />

          {/* Communication */}
          <AnalysisCard
            icon={<MessageCircle className="w-6 h-6" />}
            title="Communication Style"
            score={report.communicationScore}
            description={report.communicationAnalysis}
            color="blue"
          />

          {/* Romantic Chemistry */}
          <AnalysisCard
            icon={<Users className="w-6 h-6" />}
            title="Romantic Chemistry"
            score={report.romanticScore}
            description={report.romanticAnalysis}
            color="pink"
          />

          {/* Long-term Potential */}
          <AnalysisCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Long-term Potential"
            score={report.longTermScore}
            description={report.longTermAnalysis}
            color="green"
          />

          {/* Challenges */}
          <div className="card border-2 border-yellow-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Areas to Watch</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {report.challenges}
                </p>
              </div>
            </div>
          </div>

          {/* AI Interpretation */}
          <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
            <h3 className="text-2xl font-bold mb-4">Complete AI Analysis</h3>
            <p className="text-gray-800 whitespace-pre-line leading-relaxed">
              {report.aiInterpretation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisCard({ icon, title, score, description, color }: any) {
  const colorClasses = {
    purple: "from-purple-600 to-purple-700",
    blue: "from-blue-600 to-blue-700",
    pink: "from-pink-600 to-pink-700",
    green: "from-green-600 to-green-700",
  };

  return (
    <div className="card">
      <div className="flex items-start gap-4">
        <div
          className={`p-3 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} text-white rounded-lg`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold">{title}</h3>
            <span className="text-2xl font-bold text-purple-600">
              {score}/10
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{description}</p>
        </div>
      </div>
    </div>
  );
}
