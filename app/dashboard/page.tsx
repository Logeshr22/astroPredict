"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store";
import { api } from "@/app/lib/api";
import { Heart, Clock, TrendingUp, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state: any) => state.user);
  const [reports, setReports] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalChecks: 0,
    checksThisMonth: 0,
    plan: "Free",
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [reportsRes, statsRes] = await Promise.all([
        api.get("/compatibility/my-reports"),
        api.get("/users/stats"),
      ]);

      setReports(reportsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user.name}! 👋</h1>
          <p className="dashboard-subtitle">Your cosmic journey dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatCard
            icon={<Heart className="w-6 h-6" />}
            title="Total Checks"
            value={stats.totalChecks}
            color="purple"
          />
          <StatCard
            icon={<Calendar className="w-6 h-6" />}
            title="This Month"
            value={stats.checksThisMonth}
            color="pink"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Current Plan"
            value={stats.plan}
            color="indigo"
          />
        </div>

        {/* Quick Actions */}
        <div className="card action-card">
          <h2 className="card-title">Quick Actions</h2>
          <div className="actions-grid">
            <button
              onClick={() => router.push("/compatibility")}
              className="btn-primary"
            >
              New Compatibility Check
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="btn-secondary"
            >
              Update Birth Chart
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="card reports-container">
          <h2 className="card-title">Recent Compatibility Reports</h2>

          {reports.length === 0 ? (
            <div className="empty-state">
              <Heart className="empty-state-icon" />
              <p className="empty-state-text">No compatibility checks yet</p>
              <button
                onClick={() => router.push("/compatibility")}
                className="btn-primary"
              >
                Create Your First Check
              </button>
            </div>
          ) : (
            <div className="reports-list">
              {reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => router.push(`/results/${report.id}`)}
                  className="report-item"
                >
                  <div className="report-header">
                    <div className="report-info">
                      <h3>Compatibility Report</h3>
                      <p className="report-date">
                        <Clock />
                        {format(new Date(report.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div className="report-score">
                      <div className="report-score-value">
                        {report.score}/10
                      </div>
                      <p className="report-score-label">Score</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }: any) {
  return (
    <div className="card">
      <div className={`stat-card-icon ${color}`}>{icon}</div>
      <p className="stat-card-label">{title}</p>
      <p className="stat-card-value">{value}</p>
    </div>
  );
}
