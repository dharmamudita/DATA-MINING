"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  HeartPulseIcon,
  DashboardIcon,
  ActivityIcon,
  HistoryIcon,
  UserIcon,
  ChevronDownIcon,
} from "./Icons";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.push("/");
  };

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="floating-navbar-wrapper">
      <nav className="floating-navbar">
        {/* Left: Brand Identity */}
        <Link href="/" className="nav-brand">
          <div className="nav-brand-logo">
            <HeartPulseIcon size={20} color="#FFFFFF" />
          </div>
          <span className="nav-brand-text">
            HeartGuard<span>AI</span>
          </span>
        </Link>

        {/* Center: 3-Pill Navigation Track (PortalSPPG Signature) */}
        <div className="nav-pill-track">
          <Link
            href="/"
            className={`nav-pill-item ${pathname === "/" ? "active" : ""}`}
          >
            <DashboardIcon size={16} color={pathname === "/" ? "#FFFFFF" : "rgba(255,255,255,0.7)"} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/predict"
            className={`nav-pill-item ${pathname === "/predict" ? "active" : ""}`}
          >
            <ActivityIcon size={16} color={pathname === "/predict" ? "#FFFFFF" : "rgba(255,255,255,0.7)"} />
            <span>Skrining AI</span>
          </Link>

          <Link
            href="/history"
            className={`nav-pill-item ${pathname === "/history" ? "active" : ""}`}
          >
            <HistoryIcon size={16} color={pathname === "/history" ? "#FFFFFF" : "rgba(255,255,255,0.7)"} />
            <span>Riwayat</span>
          </Link>
        </div>

        {/* Right: Auth Profile / Sign In Action Capsule */}
        <div className="nav-auth-container" ref={dropdownRef} style={{ position: "relative" }}>
          {user ? (
            <div
              className="nav-action-pill"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="nav-avatar-icon"
                style={{
                  backgroundColor: "var(--blood-base)",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                }}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                  />
                ) : (
                  getUserInitials()
                )}
              </div>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  maxWidth: "110px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.displayName || user.email?.split("@")[0]}
              </span>
              <ChevronDownIcon size={14} color="#FF3B3B" />

              {/* User Dropdown Menu */}
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    width: "200px",
                    background: "rgba(24, 4, 4, 0.95)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "16px",
                    boxShadow: "0 12px 35px rgba(0,0,0,0.5)",
                    padding: "0.6rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      padding: "0.55rem 0.75rem",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <div style={{ color: "#FFFFFF", fontSize: "0.85rem", fontWeight: 800 }}>
                      {user.displayName || "Pengguna"}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "0.75rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.email}
                    </div>
                  </div>

                  <Link
                    href="/history"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.55rem",
                      padding: "0.55rem 0.75rem",
                      color: "#FFFFFF",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      borderRadius: "10px",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <HistoryIcon size={15} color="#FF3B3B" />
                    <span>Riwayat Saya</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.55rem",
                      padding: "0.55rem 0.75rem",
                      color: "#FFA8A8",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      width: "100%",
                      borderRadius: "10px",
                      textAlign: "left",
                      fontFamily: "var(--font-sans)",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(125,4,4,0.4)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="nav-action-pill"
              style={{
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.25)",
              }}
            >
              <div className="nav-avatar-icon">
                <UserIcon size={16} color="#FFFFFF" />
              </div>
              <span style={{ color: "#FFFFFF", fontSize: "0.86rem", fontWeight: 800, paddingRight: "0.35rem" }}>
                Masuk / Daftar
              </span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
