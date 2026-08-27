"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import { useAuth } from "../../context/AuthContext";
import { HeartPulseIcon, AlertTriangleIcon } from "../../components/Icons";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, resetPassword, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");

  // Safely redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Harap masukkan alamat email dan kata sandi Anda.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signInWithEmail(email, password);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Email atau kata sandi tidak sesuai. Silakan periksa kembali.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat.");
      } else {
        setError("Gagal masuk. Pastikan akun terdaftar dan koneksi internet stabil.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotError("Harap masukkan alamat email akun Anda.");
      return;
    }

    try {
      setForgotLoading(true);
      setForgotError("");
      setForgotMessage("");
      await resetPassword(forgotEmail.trim());
      setForgotMessage(
        "Tautan pemulihan kata sandi telah dikirim ke email Anda! Silakan periksa kotak masuk (inbox) atau folder spam untuk membuat kata sandi baru."
      );
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setForgotError("Alamat email tidak ditemukan. Pastikan email terdaftar.");
      } else if (err.code === "auth/invalid-email") {
        setForgotError("Format alamat email tidak valid.");
      } else {
        setForgotError("Gagal mengirim tautan reset. Silakan coba sesaat lagi.");
      }
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className={styles.splitPage}>
      {/* Left Brand Banner Column (PortalSPPG Reference Style) */}
      <div className={styles.leftBrandCol}>
        <div className={styles.ambientCirclesBg}>
          <div className={styles.circleOuter} />
          <div className={styles.circleMiddle} />
          <div className={styles.circleInner} />
        </div>

        <div className={styles.brandContent}>
          <Link href="/" className={styles.logoBadgeContainer}>
            <div className={styles.logoBadgeInner}>
              <div className={styles.logoIconCircle}>
                <HeartPulseIcon size={46} color="#FFFFFF" />
              </div>
            </div>
          </Link>

          <h1 className={styles.brandTitle}>
            HeartGuard<span>AI</span>
          </h1>

          <p className={styles.brandSubtitle}>
            Sistem Penapisan Klinis &amp; Prediksi Kardiovaskular Terpadu.
            <br />
            Wujudkan deteksi dini risiko penyakit jantung berbasis Machine Learning.
          </p>
        </div>
      </div>

      {/* Right Login Card Column (PortalSPPG Reference Style) */}
      <div className={styles.rightFormCol}>
        <div className={styles.formContainer}>
          <div className={styles.loginCard}>
            <h2 className={styles.cardTitle}>Selamat Datang Kembali</h2>
            <p className={styles.cardSubtitle}>
              Masuk untuk melanjutkan ke HeartGuard AI
            </p>

            {/* Error Message */}
            {error && (
              <div className={styles.errorAlert}>
                <AlertTriangleIcon size={18} color="#7D0404" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleEmailLogin} className={styles.formBody}>
              {/* Email Input */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Alamat Email</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    className={styles.textInput}
                    placeholder="nama@email.com atau ID Pengguna"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Password</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={styles.textInput}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className={styles.forgotRow}>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotMessage("");
                    setForgotError("");
                    setShowForgotModal(true);
                  }}
                  className={styles.forgotLink}
                >
                  Lupa Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    <span>Masuk ke Portal</span>
                  </>
                )}
              </button>
            </form>

            {/* Bottom Register Prompt */}
            <div className={styles.cardFooter}>
              <span>Belum punya akun?</span>{" "}
              <Link href="/register" className={styles.registerLink}>
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowForgotModal(false)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalIconBox}>
                <HeartPulseIcon size={22} color="#7D0404" />
              </div>
              <h3 className={styles.modalTitle}>Pemulihan Kata Sandi</h3>
              <p className={styles.modalSubtitle}>
                Masukkan alamat email yang terdaftar. Kami akan mengirimkan tautan resmi untuk mengatur ulang kata sandi Anda.
              </p>
            </div>

            {forgotError && (
              <div className={styles.errorAlert}>
                <AlertTriangleIcon size={16} color="#7D0404" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotMessage && (
              <div className={styles.successAlert}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{forgotMessage}</span>
              </div>
            )}

            {!forgotMessage && (
              <form onSubmit={handleForgotPassword} className={styles.modalForm}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Alamat Email Akun</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      className={styles.textInput}
                      placeholder="nama@email.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setShowForgotModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className={styles.resetSubmitBtn}
                    disabled={forgotLoading}
                  >
                    {forgotLoading ? "Mengirim..." : "Kirim Tautan Reset"}
                  </button>
                </div>
              </form>
            )}

            {forgotMessage && (
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.resetSubmitBtn}
                  onClick={() => setShowForgotModal(false)}
                >
                  Tutup &amp; Kembali ke Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
