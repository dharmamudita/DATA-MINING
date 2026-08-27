"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";
import initialHistoryData from "../../data/history_data.json";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { exportScreeningPDF } from "../../lib/pdfExport";
import {
  HistoryIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ActivityIcon,
  UserIcon,
  ClipboardIcon,
} from "../../components/Icons";

interface HistoryItem {
  id: string;
  date: string;
  patientName: string;
  age: string;
  sex: string;
  bmi: number;
  highBP: string;
  highChol: string;
  prediction: number;
  probability: number;
  status: string;
  recommendation: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "RISK" | "NORMAL">("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // User is logged in: Realtime sync specifically for this user's account
      setLoading(true);
      try {
        const q = query(
          collection(db, "screenings"),
          where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const firestoreItems: HistoryItem[] = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: data.id || doc.id,
                date: data.date || "Baru saja",
                patientName: data.patientName || user.displayName || "Pasien Saya",
                age: data.age || "-",
                sex: data.sex || "-",
                bmi: data.bmi || 0,
                highBP: data.highBP || "Tidak",
                highChol: data.highChol || "Tidak",
                prediction: data.prediction ?? 0,
                probability: data.probability ?? 0,
                status: data.status || "Stabil",
                recommendation: data.recommendation || "-",
              };
            });
            setHistoryList(firestoreItems);
            setLoading(false);
          },
          (err) => {
            console.error("Firestore listen error:", err);
            // Fallback to local storage
            const local = localStorage.getItem("heartguard_screening_history");
            if (local) {
              try {
                setHistoryList(JSON.parse(local));
              } catch (e) {
                console.error(e);
              }
            }
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (err) {
        console.error("Error setting up Firestore query:", err);
        setLoading(false);
      }
    } else {
      // Guest mode: Empty by default as requested (No mock data bleed)
      setLoading(false);
      setHistoryList([]);
    }
  }, [user]);

  const filteredItems = historyList.filter((item) => {
    if (filter === "RISK") return item.prediction === 1;
    if (filter === "NORMAL") return item.prediction === 0;
    return true;
  });

  const totalPatients = historyList.length;
  const riskCount = historyList.filter((i) => i.prediction === 1).length;
  const normalCount = historyList.filter((i) => i.prediction === 0).length;
  const avgConfidence = totalPatients > 0
    ? (historyList.reduce((acc, curr) => acc + curr.probability, 0) / totalPatients * 100).toFixed(1)
    : "0";

  return (
    <main className={styles.main}>
      {/* Floating Capsule Navbar */}
      <Navbar />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>
              Riwayat <span>Skrining AI</span>
            </h1>
            <div className={styles.titleIconBadge}>
              <HistoryIcon size={24} color="#FFFFFF" />
            </div>
          </div>
          <p className={styles.pageSubtitle}>
            Lihat kembali rekam jejak hasil penapisan klinis dan rekomendasi medis yang telah Anda lakukan.
          </p>

          {/* Cloud Sync Status / Guest Notice Banner */}
          <div style={{ marginBottom: "1.6rem" }}>
            {user ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: "0.5rem 1.25rem",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1.5px solid rgba(255, 255, 255, 0.4)",
                  borderRadius: "9999px",
                  fontSize: "0.84rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#4ADE80",
                    boxShadow: "0 0 8px #4ADE80",
                  }}
                />
                <span>Cloud Firestore Real-Time Aktif: {user.email}</span>
              </div>
            ) : (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: "0.55rem 1.35rem",
                  background: "rgba(24, 2, 2, 0.65)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1.5px solid rgba(255, 255, 255, 0.25)",
                  borderRadius: "9999px",
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  color: "#FFECEC",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ color: "#FFA8A8" }}>Mode Tamu (Penyimpanan Sementara)</span>
                <span>&bull;</span>
                <Link
                  href="/login"
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 900,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Masuk atau Daftar Akun untuk Simpan Permanen &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Filter Pills */}
          <div className={styles.filterPillsRow}>
            <button
              className={`${styles.filterPill} ${filter === "ALL" ? styles.filterPillActive : ""}`}
              onClick={() => setFilter("ALL")}
            >
              <span>Semua Riwayat ({totalPatients})</span>
            </button>

            <button
              className={`${styles.filterPill} ${filter === "RISK" ? styles.filterPillActive : ""}`}
              onClick={() => setFilter("RISK")}
            >
              <AlertTriangleIcon size={14} color={filter === "RISK" ? "#7D0404" : "#FF4D4D"} />
              <span>Terindikasi Berisiko ({riskCount})</span>
            </button>

            <button
              className={`${styles.filterPill} ${filter === "NORMAL" ? styles.filterPillActive : ""}`}
              onClick={() => setFilter("NORMAL")}
            >
              <CheckCircleIcon size={14} color={filter === "NORMAL" ? "#059669" : "#86EFAC"} />
              <span>Status Normal ({normalCount})</span>
            </button>
          </div>
        </div>

        {/* 3 Summary Stat Cards */}
        <div className={styles.summaryGrid}>
          <div className={`liquid-card ${styles.summaryCard}`}>
            <div className={styles.summaryIconBadge}>
              <UserIcon size={22} color="#7D0404" />
            </div>
            <div className={styles.summaryValue}>{totalPatients} Pasien</div>
            <div className={styles.summaryLabel}>Total Skrining Dilakukan</div>
            <div className={styles.summarySub}>
              {user ? "Tersimpan aman di Firebase Cloud" : "Data tersimpan di perangkat lokal"}
            </div>
          </div>

          <div className={`liquid-card ${styles.summaryCard}`}>
            <div className={styles.summaryIconBadge}>
              <ActivityIcon size={22} color="#7D0404" />
            </div>
            <div className={styles.summaryValue}>{avgConfidence}%</div>
            <div className={styles.summaryLabel}>Rata-rata Akurasi Keyakinan</div>
            <div className={styles.summarySub}>Model Random Forest BRFSS</div>
          </div>

          <div className={`liquid-card ${styles.summaryCard}`}>
            <div className={styles.summaryIconBadge}>
              <ClipboardIcon size={22} color="#7D0404" />
            </div>
            <div className={styles.summaryValue}>
              {normalCount} Normal / {riskCount} Risiko
            </div>
            <div className={styles.summaryLabel}>Distribusi Kondisi Pasien</div>
            <div className={styles.summarySub}>
              {totalPatients > 0 ? `${((normalCount / totalPatients) * 100).toFixed(0)}% Stabil` : "-"}
            </div>
          </div>
        </div>

        {/* List of History Record Cards */}
        <div className={styles.historyListSection}>
          {loading ? (
            <div className={`liquid-card ${styles.emptyCard}`}>
              <span className="spinner" style={{ width: "36px", height: "36px", borderTopColor: "#7D0404", borderColor: "rgba(125,4,4,0.2)" }} />
              <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontWeight: 700 }}>
                Memuat data riwayat dari Cloud Firestore...
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className={`liquid-card ${styles.emptyCard}`}>
              <HistoryIcon size={48} color="#94A3B8" />
              <h3>{user ? "Belum Ada Riwayat untuk Akun Anda" : "Belum Ada Riwayat"}</h3>
              <p>
                {user
                  ? `Akun Anda (${user.email}) belum memiliki catatan hasil skrining di Cloud Firestore. Lakukan skrining pertama Anda sekarang.`
                  : "Silakan lakukan skrining baru untuk menambahkan riwayat pasien ke sistem."}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => router.push("/predict")}
                style={{ marginTop: "1rem" }}
              >
                <span>Mulai Skrining Sekarang</span>
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className={`liquid-card ${styles.historyCard}`}>
                <div className={styles.historyCardTop}>
                  <div className={styles.patientInfo}>
                    <div className={styles.patientAvatar}>
                      <UserIcon size={20} color="#7D0404" />
                    </div>
                    <div>
                      <h3 className={styles.patientName}>{item.patientName}</h3>
                      <span className={styles.historyDate}>{item.date} &bull; ID: {item.id}</span>
                    </div>
                  </div>

                  <div className={styles.historyCardActions}>
                    <div
                      className={`${styles.statusBadge} ${
                        item.prediction === 1 ? styles.statusBadgeDanger : styles.statusBadgeSafe
                      }`}
                    >
                      {item.prediction === 1 ? (
                        <>
                          <AlertTriangleIcon size={14} color="#7D0404" />
                          <span>TERINDIKASI BERISIKO</span>
                        </>
                      ) : (
                        <>
                          <CheckCircleIcon size={14} color="#059669" />
                          <span>PROFIL STABIL (SEHAT)</span>
                        </>
                      )}
                    </div>

                    <button
                      className={styles.exportPdfBtn}
                      onClick={() => exportScreeningPDF(item)}
                      title="Unduh Rekap Medis PDF Resmi"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      <span>Unduh PDF</span>
                    </button>
                  </div>
                </div>

                <div className={styles.metricsRow}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Rentang Usia</span>
                    <strong className={styles.metricValue}>{item.age}</strong>
                  </div>

                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Indeks Massa Tubuh (BMI)</span>
                    <strong className={styles.metricValue}>{item.bmi}</strong>
                  </div>

                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Hipertensi / Kolesterol</span>
                    <strong className={styles.metricValue}>
                      {item.highBP === "Ya" ? "Hipertensi" : "Tekanan Normal"} / {item.highChol === "Ya" ? "Kolesterol Tinggi" : "Normal"}
                    </strong>
                  </div>

                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Tingkat Keyakinan AI</span>
                    <strong className={styles.metricValue} style={{ color: "#7D0404" }}>
                      {(item.probability * 100).toFixed(1)}%
                    </strong>
                  </div>
                </div>

                <div className={styles.recommendationBox}>
                  <div className={styles.recHeader}>
                    <ClipboardIcon size={16} color="#7D0404" />
                    <strong>Catatan Rekomendasi Medis:</strong>
                  </div>
                  <p>{item.recommendation}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
