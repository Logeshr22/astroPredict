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
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">Your cosmic journey dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
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
        <div className="card mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
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
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">
            Recent Compatibility Reports
          </h2>

          {reports.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No compatibility checks yet</p>
              <button
                onClick={() => router.push("/compatibility")}
                className="btn-primary"
              >
                Create Your First Check
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => router.push(`/results/${report.id}`)}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        Compatibility Report
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {format(new Date(report.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {report.score}/10
                      </div>
                      <p className="text-sm text-gray-600">Score</p>
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
  const colorClasses = {
    purple: "from-purple-600 to-purple-700",
    pink: "from-pink-600 to-pink-700",
    indigo: "from-indigo-600 to-indigo-700",
  };

  return (
    <div className="card">
      <div
        className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} text-white mb-4`}
      >
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
