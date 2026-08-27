"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import {
  HeartPulseIcon,
  ActivityIcon,
  StethoscopeIcon,
  UserIcon,
  ClipboardIcon,
  CheckCircleIcon,
  ChartBarIcon,
  TargetIcon,
  LayersIcon,
  ZapIcon,
} from "../components/Icons";

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string;
    name: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedPhoto(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedPhoto]);

  return (
    <main className={styles.main}>
      {/* Floating Capsule Navbar (PortalSPPG Signature) */}
      <Navbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroWrapper}>
            {/* Top Pill Badge */}
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot} />
              <span className={styles.badgeText}>
                Sistem Deteksi Dini Kardiovaskular Berbasis Data CDC BRFSS
              </span>
            </div>

            {/* Headline */}
            <h1 className={styles.heroTitle}>
              Solusi Prediksi Risiko
              <br />
              Penyakit Jantung Berbasis{" "}
              <span className={styles.heroGradientText}>Kecerdasan Buatan</span>
            </h1>

            {/* Subtitle Inside High-Contrast Liquid Glass Capsule */}
            <div className={styles.heroSubtitle}>
              <p>
                Platform penapisan medis terintegrasi yang memanfaatkan model machine learning{" "}
                <strong>Random Forest</strong> terlatih dengan <strong>89.96% akurasi</strong> untuk memprediksi risiko penyakit kardiovaskular secara personal melalui <strong>21 parameter klinis</strong>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={styles.heroActions}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => router.push("/predict")}
              >
                <HeartPulseIcon size={20} color="#FFFFFF" />
                <span>Mulai Skrining Sekarang</span>
              </button>

              <button
                className="btn btn-secondary btn-lg"
                onClick={() => router.push("/history")}
              >
                <span>Lihat Data Riwayat</span>
              </button>
            </div>

            {/* Micro Trust Proofs */}
            <div className={styles.trustRow}>
              <div className={styles.trustItem}>
                <CheckCircleIcon size={16} color="#7D0404" />
                <span>Dataset 253,680 Pasien BRFSS</span>
              </div>
              <div className={styles.trustItem}>
                <CheckCircleIcon size={16} color="#7D0404" />
                <span>21 Fitur Biometrik &amp; Gaya Hidup</span>
              </div>
              <div className={styles.trustItem}>
                <CheckCircleIcon size={16} color="#7D0404" />
                <span>Hasil Diagnosis Instan &lt; 1 Detik</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empirical Metrics Showcase Section */}
      <section className={styles.metricsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>METRIK EMPIRIS DATA MINING</span>
            <h2 className={styles.sectionTitle}>Performa Model Teruji Secara Ilmiah</h2>
            <p className={styles.sectionDesc}>
              Hasil evaluasi kuantitatif dari model Random Forest Classifier yang diuji pada data uji independen.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={`liquid-card ${styles.statCard}`}>
              <div className={styles.statIconBadge}>
                <TargetIcon size={24} color="#7D0404" />
              </div>
              <div className={styles.statValue}>89.96%</div>
              <div className={styles.statLabel}>Akurasi Klasifikasi (Accuracy)</div>
              <div className={styles.statSub}>
                Tingkat ketepatan prediksi menyeluruh pada 50,736 data uji CDC BRFSS.
              </div>
            </div>

            <div className={`liquid-card ${styles.statCard}`}>
              <div className={styles.statIconBadge}>
                <ChartBarIcon size={24} color="#7D0404" />
              </div>
              <div className={styles.statValue}>0.7712</div>
              <div className={styles.statLabel}>Area Under Curve (ROC-AUC)</div>
              <div className={styles.statSub}>
                Kemampuan diskriminasi tinggi memisahkan pasien berisiko dan stabil.
              </div>
            </div>

            <div className={`liquid-card ${styles.statCard}`}>
              <div className={styles.statIconBadge}>
                <LayersIcon size={24} color="#7D0404" />
              </div>
              <div className={styles.statValue}>k = 3</div>
              <div className={styles.statLabel}>Segmentasi K-Means Clustering</div>
              <div className={styles.statSub}>
                Klasterisasi risiko: Profil Rendah Sehat, Menengah, dan Kritis Kronis.
              </div>
            </div>

            <div className={`liquid-card ${styles.statCard}`}>
              <div className={styles.statIconBadge}>
                <ZapIcon size={24} color="#7D0404" />
              </div>
              <div className={styles.statValue}>21 Var</div>
              <div className={styles.statLabel}>Fitur Klinis BRFSS Terintegrasi</div>
              <div className={styles.statSub}>
                Biometrik, riwayat penyakit, gaya hidup, hingga kondisi mental.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Patient Journey Workflow */}
      <section className={styles.workflowSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>ARSITEKTUR DIAGNOSIS BERTINGKAT</span>
            <h2 className={styles.sectionTitle}>Alur Penapisan Pasien 4 Langkah</h2>
            <p className={styles.sectionDesc}>
              Antarmuka terstruktur dirancang untuk meminimalkan beban kognitif pengguna dan memaksimalkan akurasi pengisian data.
            </p>
          </div>

          <div className={styles.workflowGrid}>
            <div className={`liquid-card ${styles.workflowCard}`}>
              <div className={styles.stepNumberCircle}>
                <UserIcon size={22} color="#FFFFFF" />
              </div>
              <h3 className={styles.stepTitle}>1. Demografi &amp; Sosioekonomi</h3>
              <p className={styles.stepDesc}>
                Pengumpulan profil demografi: kategori umur, gender, tingkat pendidikan, dan estimasi pendapatan per bulan.
              </p>
              <div className={styles.stepPill}>4 Parameter</div>
            </div>

            <div className={`liquid-card ${styles.workflowCard}`}>
              <div className={styles.stepNumberCircle}>
                <StethoscopeIcon size={22} color="#FFFFFF" />
              </div>
              <h3 className={styles.stepTitle}>2. Biometrik &amp; Riwayat Klinis</h3>
              <p className={styles.stepDesc}>
                Pemeriksaan riwayat hipertensi, hiperkolesterolemia, kalkulasi indeks massa tubuh (BMI), dan komorbiditas diabetes/stroke.
              </p>
              <div className={styles.stepPill}>6 Parameter</div>
            </div>

            <div className={`liquid-card ${styles.workflowCard}`}>
              <div className={styles.stepNumberCircle}>
                <ActivityIcon size={22} color="#FFFFFF" />
              </div>
              <h3 className={styles.stepTitle}>3. Gaya Hidup &amp; Pola Konsumsi</h3>
              <p className={styles.stepDesc}>
                Penilaian kebiasaan merokok aktif, intensitas aktivitas fisik mingguan, konsumsi alkohol, serta asupan nutrisi buah dan sayur.
              </p>
              <div className={styles.stepPill}>5 Parameter</div>
            </div>

            <div className={`liquid-card ${styles.workflowCard}`}>
              <div className={styles.stepNumberCircle}>
                <ClipboardIcon size={22} color="#FFFFFF" />
              </div>
              <h3 className={styles.stepTitle}>4. Keluhan Akut &amp; Diagnosis AI</h3>
              <p className={styles.stepDesc}>
                Evaluasi subjektif kesehatan umum, mobilitas fisik, kesehatan mental, lalu kalkulasi probabilitas risiko kardiovaskular.
              </p>
              <div className={styles.stepPill}>6 Parameter + Hasil</div>
            </div>
          </div>

          {/* Development Team & Lecturer Section */}
          <div className={styles.teamSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>TIM PENELITI &amp; PENGEMBANG</span>
              <h2 className={styles.sectionTitle}>Profil Dosen Pengampu &amp; Tim Pengembang</h2>
              <p className={styles.sectionDesc}>
                Dikembangkan sebagai Proyek Akhir Mata Kuliah Data Mining Semester Pendek Program Studi Informatika.
              </p>
            </div>

            {/* Dosen Pengampu Card */}
            <div className={styles.lecturerWrapper}>
              <div className={`liquid-card ${styles.lecturerCard}`}>
                <div
                  className={styles.teamAvatar}
                  onClick={() =>
                    setSelectedPhoto({
                      src: "/foto-tim/mis-nirwana.png",
                      name: "Nirwana Hendrastuty, S.Kom., M.Cs.",
                      role: "Dosen Pengampu Mata Kuliah Data Mining",
                    })
                  }
                  title="Klik untuk melihat foto penuh"
                >
                  <img
                    src="/foto-tim/mis-nirwana.png"
                    alt="Nirwana Hendrastuty, S.Kom., M.Cs."
                    className={styles.teamImg}
                  />
                </div>
                <h3 className={styles.teamName}>Nirwana Hendrastuty, S.Kom., M.Cs.</h3>
                <div className={styles.lecturerRoleBadge}>
                  <span>Dosen Pengampu Mata Kuliah</span>
                </div>
              </div>
            </div>

            {/* 3 Student Developer Cards */}
            <div className={styles.teamGrid}>
              <div className={`liquid-card ${styles.teamCard}`}>
                <div
                  className={styles.teamAvatar}
                  onClick={() =>
                    setSelectedPhoto({
                      src: "/foto-tim/dharma.jpeg",
                      name: "Dharma Mudita",
                      role: "NPM: 23312067 • Mahasiswa Informatika",
                    })
                  }
                  title="Klik untuk melihat foto penuh"
                >
                  <img
                    src="/foto-tim/dharma.jpeg"
                    alt="Dharma Mudita"
                    className={styles.teamImg}
                  />
                </div>
                <h3 className={styles.teamName}>Dharma Mudita</h3>
                <div className={styles.teamNpmBadge}>NPM: 23312067</div>
              </div>

              <div className={`liquid-card ${styles.teamCard}`}>
                <div
                  className={styles.teamAvatar}
                  onClick={() =>
                    setSelectedPhoto({
                      src: "/foto-tim/wildan.jpeg",
                      name: "Wildan Pratama",
                      role: "NPM: 23312024 • Mahasiswa Informatika",
                    })
                  }
                  title="Klik untuk melihat foto penuh"
                >
                  <img
                    src="/foto-tim/wildan.jpeg"
                    alt="Wildan Pratama"
                    className={styles.teamImg}
                  />
                </div>
                <h3 className={styles.teamName}>Wildan Pratama</h3>
                <div className={styles.teamNpmBadge}>NPM: 23312024</div>
              </div>

              <div className={`liquid-card ${styles.teamCard}`}>
                <div
                  className={styles.teamAvatar}
                  onClick={() =>
                    setSelectedPhoto({
                      src: "/foto-tim/farhan.jpeg",
                      name: "Farhan Almasyah Nuryadi",
                      role: "NPM: 25312110 • Mahasiswa Informatika",
                    })
                  }
                  title="Klik untuk melihat foto penuh"
                >
                  <img
                    src="/foto-tim/farhan.jpeg"
                    alt="Farhan Almasyah Nuryadi"
                    className={styles.teamImg}
                  />
                </div>
                <h3 className={styles.teamName}>Farhan Almasyah Nuryadi</h3>
                <div className={styles.teamNpmBadge}>NPM: 25312110</div>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className={`liquid-card ${styles.ctaBanner}`}>
            <div className={styles.ctaBannerText}>
              <h3>Siap Menguji Kondisi Kardiovaskular Anda?</h3>
              <p>Hanya membutuhkan waktu 2 menit untuk melengkapi seluruh kuesioner medis.</p>
            </div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => router.push("/predict")}
            >
              <span>Mulai Skrining Sekarang</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerMain}>
            <div className={styles.footerBrandCol}>
              <div className={styles.footerBrand}>
                <div className={styles.footerBrandLogo}>
                  <HeartPulseIcon size={20} color="#FFFFFF" />
                </div>
                <div className={styles.footerBrandText}>
                  <span className={styles.brandName}>HEARTGUARD AI</span>
                  <span className={styles.brandSub}>Sistem Prediksi Risiko Penyakit Jantung</span>
                </div>
              </div>
              <p className={styles.footerAbout}>
                Proyek Tugas Akhir Semester Pendek Mata Kuliah Data Mining. Mengombinasikan algoritma Random Forest untuk klasifikasi prediktif dan K-Means Clustering untuk segmentasi risiko pasien berbasis data CDC BRFSS.
                <br />
                <strong style={{ color: "var(--blood-base)", display: "inline-block", marginTop: "0.5rem" }}>
                  Dosen Pengampu: Nirwana Hendrastuty, S.Kom., M.Cs.
                </strong>
              </p>
            </div>

            <div className={styles.footerCol}>
              <h4>Tim Peneliti / Pengembang</h4>
              <div className={styles.footerText} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div>
                  <strong>Dharma Mudita</strong>
                  <div style={{ color: "#94A3B8", fontSize: "0.82rem" }}>NPM: 23312067</div>
                </div>
                <div>
                  <strong>Wildan Pratama</strong>
                  <div style={{ color: "#94A3B8", fontSize: "0.82rem" }}>NPM: 23312024</div>
                </div>
                <div>
                  <strong>Farhan Almasyah Nuryadi</strong>
                  <div style={{ color: "#94A3B8", fontSize: "0.82rem" }}>NPM: 25312110</div>
                </div>
              </div>
            </div>

            <div className={styles.footerCol}>
              <h4>Teknologi Utama</h4>
              <ul className={styles.footerList}>
                <li><span>&bull;</span> Next.js &amp; TypeScript</li>
                <li><span>&bull;</span> Google Gemini AI (Generative Assistant)</li>
                <li><span>&bull;</span> Python Scikit-Learn &amp; Joblib</li>
                <li><span>&bull;</span> Firebase Auth &amp; Cloud Firestore</li>
                <li><span>&bull;</span> Liquid Glass &amp; Vanilla CSS</li>
                <li><span>&bull;</span> Vercel Serverless Architecture</li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.disclaimerBox}>
              <strong>PERINGATAN MEDIS (DISCLAIMER):</strong> Hasil analisis yang disajikan oleh sistem kecerdasan buatan ini ditujukan secara eksklusif untuk tujuan edukasi, skrining dini, dan demonstrasi akademis. Sistem ini <u>bukan</u> merupakan pengganti diagnosis klinis, konsultasi, ataupun tindakan medis dari dokter spesialis jantung profesional.
            </div>
            <div className={styles.copyright}>
              &copy; {new Date().getFullYear()} HeartGuard AI &bull; Dharma Mudita (23312067), Wildan Pratama (23312024), Farhan Almasyah Nuryadi (25312110). Hak Cipta Dilindungi.
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Photo Lightbox Modal rendered via React Portal */}
      {mounted &&
        selectedPhoto &&
        createPortal(
          <div
            className={styles.lightboxBackdrop}
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className={styles.lightboxCard}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.lightboxCloseBtn}
                onClick={() => setSelectedPhoto(null)}
                aria-label="Tutup"
              >
                &times;
              </button>
              <div className={styles.lightboxImageWrapper}>
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.name}
                  className={styles.lightboxImg}
                />
              </div>
              <h3 className={styles.lightboxTitle}>{selectedPhoto.name}</h3>
              <p className={styles.lightboxSubtitle}>{selectedPhoto.role}</p>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
