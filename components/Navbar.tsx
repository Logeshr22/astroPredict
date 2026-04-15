"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store";
import { Sparkles, LogOut, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link href="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="navbar-logo-text">CosmicMatch</span>
          </Link>

          <div className="navbar-nav">
            {user ? (
              <>
                <Link href="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
                <Link href="/compatibility" className="navbar-link">
                  New Check
                </Link>
                <div className="navbar-user-section">
                  <div className="navbar-user-avatar">
                    <User />
                  </div>
                  <div className="navbar-user-info">
                    <div className="navbar-user-name">{user.name}</div>
                    <div className="navbar-user-plan">{user.plan}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="navbar-logout-btn"
                    title="Logout"
                  >
                    <LogOut />
                  </button>
                </div>
              </>
            ) : (
              <div className="navbar-auth">
                <Link href="/login" className="navbar-login-link">
                  Login
                </Link>
                <Link href="/register" className="navbar-signup-btn">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
