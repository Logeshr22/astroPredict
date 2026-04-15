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
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Analyzing cosmic compatibility...</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const scoreColor =
    report.score >= 8
      ? "excellent"
      : report.score >= 6
        ? "good"
        : "challenging";

  return (
    <div className="results-container">
      <div className="results-wrapper">
        {/* Header */}
        <div className="report-header">
          <div>
            <div className="report-icon">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="report-title">Compatibility Report</h1>
            <p className="report-subtitle">
              Based on Western & Vedic Astrology
            </p>
          </div>

          <div className="report-score-section">
            <div className={`report-score ${scoreColor}`}>
              {report.score}/10
            </div>
            <p className="report-verdict">
              {report.score >= 8
                ? "🎉 Excellent Match!"
                : report.score >= 6
                  ? "👍 Good Compatibility"
                  : "💭 Challenging But Possible"}
            </p>
          </div>

          <div className="report-actions">
            <button className="btn-primary">
              <Download className="w-4 h-4" />
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
        <div className="analysis-list">
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
          <div className="challenges-card">
            <div className="challenges-card-header">
              <div className="challenges-icon">
                <AlertCircle />
              </div>
              <div className="flex-1">
                <h3 className="challenges-title">Areas to Watch</h3>
                <p className="challenges-text">{report.challenges}</p>
              </div>
            </div>
          </div>

          {/* AI Interpretation */}
          <div className="ai-analysis-card">
            <h3 className="ai-analysis-title">Complete AI Analysis</h3>
            <p className="ai-analysis-text">{report.aiInterpretation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisCard({ icon, title, score, description, color }: any) {
  return (
    <div className="analysis-card">
      <div className="analysis-card-content">
        <div className={`analysis-card-icon ${color}`}>{icon}</div>
        <div className="analysis-card-body">
          <div className="analysis-card-header">
            <h3 className="analysis-card-title">{title}</h3>
            <span className="analysis-card-score">{score}/10</span>
          </div>
          <p className="analysis-card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}
