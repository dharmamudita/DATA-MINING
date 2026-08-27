"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../login/page.module.css";
import { useAuth } from "../../context/AuthContext";
import { HeartPulseIcon, AlertTriangleIcon } from "../../components/Icons";

export default function RegisterPage() {
  const router = useRouter();
  const { signUpWithEmail, user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Safely redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPass) {
      setError("Harap lengkapi semua kolom pendaftaran.");
      return;
    }

    if (password.length < 6) {
      setError("Kata sandi minimal harus 6 karakter.");
      return;
    }

    if (password !== confirmPass) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signUpWithEmail(email, password, name);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email ini sudah terdaftar. Silakan masuk.");
      } else if (err.code === "auth/invalid-email") {
        setError("Format email tidak valid.");
      } else {
        setError("Gagal mendaftar. Silakan coba kembali.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.splitPage}>
      {/* Left Brand Banner Column */}
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
            Daftar akun baru dan simpan seluruh rekam penapisan risiko kardiovaskular Anda secara permanen di Cloud Firestore.
          </p>
        </div>
      </div>

      {/* Right Register Card Column */}
      <div className={styles.rightFormCol}>
        <div className={styles.formContainer}>
          <div className={styles.loginCard}>
            <h2 className={styles.cardTitle}>Buat Akun Baru</h2>
            <p className={styles.cardSubtitle}>
              Mulai penapisan klinis mandiri dengan HeartGuard AI
            </p>

            {/* Error Message */}
            {error && (
              <div className={styles.errorAlert}>
                <AlertTriangleIcon size={18} color="#7D0404" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className={styles.formBody}>
              {/* Name Input */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Nama Lengkap</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className={styles.textInput}
                    placeholder="misal: Dr. Dharma Mudita"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Kata Sandi (Min. 6 Karakter)</label>
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
                    placeholder="••••••••"
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

              {/* Confirm Password */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Konfirmasi Kata Sandi</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={styles.textInput}
                    placeholder="Ulangi kata sandi"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                  />
                </div>
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
                    <span>Mendaftarkan Akun...</span>
                  </>
                ) : (
                  <>
                    <span>Daftar Akun Baru</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Bottom Login Prompt */}
            <div className={styles.cardFooter}>
              <span>Sudah punya akun?</span>{" "}
              <Link href="/login" className={styles.registerLink}>
                Masuk Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
