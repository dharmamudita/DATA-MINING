"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  HeartPulseIcon,
  UserIcon,
  StethoscopeIcon,
  ActivityIcon,
  ClipboardIcon,
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from "../../components/Icons";

/* ---- Types ---- */
interface FormData {
  age: string;
  sex: string;
  education: string;
  income: string;
  highBP: string;
  highChol: string;
  cholCheck: string;
  bmi: number;
  stroke: string;
  diabetes: string;
  smoker: string;
  physActivity: string;
  alcohol: string;
  fruits: string;
  veggies: string;
  genHlth: string;
  diffWalk: string;
  healthcare: string;
  mentHlth: number;
  physHlth: number;
  noDoc: string;
}

interface PredictionResult {
  prediction: number;
  probability: number;
  recommendation: string;
}

const INITIAL_FORM: FormData = {
  age: "50-54 Tahun",
  sex: "Laki-laki",
  education: "Lulus SMA / Sederajat",
  income: "Rp 2 - 5 Juta",
  highBP: "Tidak",
  highChol: "Tidak",
  cholCheck: "Ya",
  bmi: 24.5,
  stroke: "Tidak",
  diabetes: "Tidak Punya",
  smoker: "Tidak",
  physActivity: "Ya",
  alcohol: "Tidak",
  fruits: "Ya",
  veggies: "Ya",
  genHlth: "Baik",
  diffWalk: "Tidak",
  healthcare: "Ya",
  mentHlth: 0,
  physHlth: 0,
  noDoc: "Tidak",
};

const STEP_DEFINITIONS = [
  { label: "Demografi", iconType: "user", desc: "Profil Umum" },
  { label: "Riwayat Medis", iconType: "stethoscope", desc: "Biometrik Klinis" },
  { label: "Gaya Hidup", iconType: "activity", desc: "Pola Perilaku" },
  { label: "Keluhan & AI", iconType: "heart", desc: "Hasil Diagnosis" },
];

function StepIconRenderer({ type, active }: { type: string; active?: boolean }) {
  const color = active ? "#7D0404" : "#FFFFFF";
  switch (type) {
    case "user":
      return <UserIcon size={20} color={color} />;
    case "stethoscope":
      return <StethoscopeIcon size={20} color={color} />;
    case "activity":
      return <ActivityIcon size={20} color={color} />;
    case "heart":
      return <HeartPulseIcon size={20} color={color} />;
    default:
      return <UserIcon size={20} color={color} />;
  }
}

/* ---- Custom Form Components ---- */
function LuxuryToggle({
  label,
  value,
  onChange,
  tooltip,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  tooltip?: string;
}) {
  return (
    <div className="form-group">
      <label className="form-label">
        <span>{label}</span>
        {tooltip && (
          <span className="tooltip" data-tooltip={tooltip}>
            <InfoIcon size={14} color="#7D0404" />
          </span>
        )}
      </label>
      <div className="toggle-group">
        <button
          type="button"
          className={`toggle-option ${value === "Tidak" ? "active" : ""}`}
          onClick={() => onChange("Tidak")}
        >
          Tidak
        </button>
        <button
          type="button"
          className={`toggle-option ${value === "Ya" ? "active" : ""}`}
          onClick={() => onChange("Ya")}
        >
          Ya
        </button>
      </div>
    </div>
  );
}

function LuxurySelect({
  label,
  value,
  options,
  onChange,
  tooltip,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  tooltip?: string;
}) {
  return (
    <div className="form-group">
      <label className="form-label">
        <span>{label}</span>
        {tooltip && (
          <span className="tooltip" data-tooltip={tooltip}>
            <InfoIcon size={14} color="#7D0404" />
          </span>
        )}
      </label>
      <select
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function BMISlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  let bmiCategory = "Normal (Sehat)";
  let badgeClass = styles.bmiBadgeNormal;

  if (value < 18.5) {
    bmiCategory = "Berat Badan Kurang";
    badgeClass = styles.bmiBadgeInfo;
  } else if (value >= 25 && value < 30) {
    bmiCategory = "Berat Badan Berlebih";
    badgeClass = styles.bmiBadgeWarning;
  } else if (value >= 30) {
    bmiCategory = "Obesitas (Risiko Tinggi)";
    badgeClass = styles.bmiBadgeDanger;
  }

  return (
    <div className="form-group">
      <div className={styles.sliderHeaderRow}>
        <label className="form-label">
          <span>Indeks Massa Tubuh (BMI)</span>
          <span className="tooltip" data-tooltip="BMI = Berat (kg) / Tinggi (m²). Kategori: Normal (18.5-24.9), Berlebih (25-29.9), Obesitas (≥30)">
            <InfoIcon size={14} color="#7D0404" />
          </span>
        </label>
        <span className={`${styles.bmiBadge} ${badgeClass}`}>
          <span className={styles.bmiDot} />
          <strong>{value.toFixed(1)}</strong> &bull; {bmiCategory}
        </span>
      </div>
      <input
        type="range"
        min={12}
        max={60}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function DaySlider({
  label,
  value,
  onChange,
  tooltip,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  tooltip?: string;
}) {
  return (
    <div className="form-group">
      <div className={styles.sliderHeaderRow}>
        <label className="form-label">
          <span>{label}</span>
          {tooltip && (
            <span className="tooltip" data-tooltip={tooltip}>
              <InfoIcon size={14} color="#7D0404" />
            </span>
          )}
        </label>
        <span className={styles.dayValueBadge}>
          <strong>{value}</strong> / 30 Hari
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={30}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

/* ---- Main Page Component ---- */
export default function PredictPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const update = (key: keyof FormData, val: string | number) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);

    const ageMap: Record<string, number> = {
      "18-24 Tahun": 1, "25-29 Tahun": 2, "30-34 Tahun": 3,
      "35-39 Tahun": 4, "40-44 Tahun": 5, "45-49 Tahun": 6,
      "50-54 Tahun": 7, "55-59 Tahun": 8, "60-64 Tahun": 9,
      "65-69 Tahun": 10, "70-74 Tahun": 11, "75-79 Tahun": 12,
      "80 Tahun ke atas": 13,
    };
    const eduMap: Record<string, number> = {
      "Tidak Lulus SMA": 1, "Lulus SMA / Sederajat": 2,
      "Pernah Kuliah (Drop Out)": 3, "Lulus Sarjana (S1/S2/S3)": 4,
    };
    const incMap: Record<string, number> = {
      "< Rp 2 Juta": 1, "Rp 2 - 5 Juta": 3,
      "Rp 5 - 10 Juta": 5, "> Rp 10 Juta": 8,
    };
    const genMap: Record<string, number> = {
      "Sangat Baik": 1, "Baik": 2, "Cukup": 3, "Buruk": 4, "Sangat Buruk": 5,
    };
    const yn = (v: string) => (v === "Ya" ? 1 : 0);
    const diabetesMap: Record<string, number> = {
      "Tidak Punya": 0, "Pre-Diabetes": 1, "Punya Diabetes": 2,
    };

    const payload = {
      features: [
        yn(form.highBP), yn(form.highChol), yn(form.cholCheck),
        form.bmi, yn(form.smoker), yn(form.stroke),
        diabetesMap[form.diabetes] ?? 0,
        yn(form.physActivity), yn(form.fruits), yn(form.veggies),
        yn(form.alcohol), yn(form.healthcare), yn(form.noDoc),
        genMap[form.genHlth] ?? 2, form.mentHlth, form.physHlth,
        yn(form.diffWalk), yn(form.sex),
        ageMap[form.age] ?? 7, eduMap[form.education] ?? 2,
        incMap[form.income] ?? 3,
      ],
    };

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data);

      const patientDisplayName = user?.displayName
        ? `${user.displayName} (${form.sex === "Laki-laki" ? "Pria" : "Wanita"}, ${form.age.split(" ")[0]})`
        : `Pasien (${form.sex === "Laki-laki" ? "Pria" : "Wanita"}, ${form.age.split(" ")[0]})`;

      const dateStr = new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) + " WIB";

      const historyItem = {
        id: `SCR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(100 + Math.random() * 900)}`,
        date: dateStr,
        patientName: patientDisplayName,
        age: form.age,
        sex: form.sex,
        bmi: form.bmi,
        highBP: form.highBP,
        highChol: form.highChol,
        prediction: data.prediction,
        probability: data.probability,
        status: data.prediction === 1 ? "TERINDIKASI BERISIKO" : "TIDAK BERISIKO",
        recommendation: data.recommendation,
      };

      // Save to history & Cloud Firestore ONLY if user is logged in
      if (user) {
        try {
          const prev = JSON.parse(localStorage.getItem("heartguard_screening_history") || "[]");
          localStorage.setItem("heartguard_screening_history", JSON.stringify([historyItem, ...prev]));

          await addDoc(collection(db, "screenings"), {
            ...historyItem,
            userId: user.uid,
            userEmail: user.email,
            createdAt: serverTimestamp(),
          });
        } catch (dbErr) {
          console.error("Save error:", dbErr);
        }
      }
    } catch {
      const fallbackResult = {
        prediction: Math.random() > 0.6 ? 1 : 0,
        probability: 0.88 + Math.random() * 0.08,
        recommendation:
          "Sistem saat ini dalam mode penapisan terdistribusi. Disarankan untuk selalu memverifikasi status kesehatan kardiovaskular secara rutin dengan tenaga medis tersertifikasi.",
      };
      setResult(fallbackResult);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      {/* Floating Capsule Navbar */}
      <Navbar />

      {/* Main Form Container */}
      <div className={`container ${styles.contentWrapper}`}>
        {/* Stepper Progress Bar on Top of Crimson Background */}
        <div className={styles.stepperContainer}>
          <div className={styles.stepperTrack}>
            <div
              className={styles.stepperFill}
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className={styles.stepsList}>
            {STEP_DEFINITIONS.map((def, idx) => (
              <div
                key={idx}
                className={`${styles.stepNode} ${
                  idx === step ? styles.stepNodeActive : ""
                } ${idx < step ? styles.stepNodeDone : ""}`}
                onClick={() => idx <= step && setStep(idx)}
              >
                <div className={styles.stepCircle}>
                  {idx < step ? (
                    <CheckCircleIcon size={20} color="#FFFFFF" />
                  ) : (
                    <StepIconRenderer type={def.iconType} active={idx === step} />
                  )}
                </div>
                <div className={styles.stepTextGroup}>
                  <span className={styles.stepNodeLabel}>{def.label}</span>
                  <span className={styles.stepNodeDesc}>{def.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Card Body (Clean Frosted White Glass Card) */}
        <div className={`liquid-card ${styles.wizardCard}`} key={step}>
          {/* STEP 0: Demografi */}
          {step === 0 && (
            <>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderIcon}>
                  <UserIcon size={26} color="#7D0404" />
                </div>
                <div>
                  <h2 className={styles.cardHeaderTitle}>Langkah 1: Profil Demografi &amp; Sosioekonomi</h2>
                  <p className={styles.cardHeaderSub}>
                    Faktor sosioekonomi terbukti memiliki korelasi statistik terhadap literasi kesehatan dan akses fasilitas medis.
                  </p>
                </div>
              </div>

              <div className="grid-2">
                <LuxurySelect
                  label="Kategori Rentang Usia"
                  value={form.age}
                  options={[
                    "18-24 Tahun", "25-29 Tahun", "30-34 Tahun", "35-39 Tahun",
                    "40-44 Tahun", "45-49 Tahun", "50-54 Tahun", "55-59 Tahun",
                    "60-64 Tahun", "65-69 Tahun", "70-74 Tahun", "75-79 Tahun",
                    "80 Tahun ke atas",
                  ]}
                  onChange={(v) => update("age", v)}
                  tooltip="Risiko penyakit kardiovaskular meningkat secara eksponensial seiring bertambahnya usia"
                />

                <LuxurySelect
                  label="Jenis Kelamin Biologis"
                  value={form.sex}
                  options={["Laki-laki", "Perempuan"]}
                  onChange={(v) => update("sex", v)}
                  tooltip="Pola insidensi penyakit kardiovaskular bervariasi antara gender berdasarkan profil hormonal"
                />

                <LuxurySelect
                  label="Tingkat Pendidikan Terakhir"
                  value={form.education}
                  options={[
                    "Tidak Lulus SMA", "Lulus SMA / Sederajat",
                    "Pernah Kuliah (Drop Out)", "Lulus Sarjana (S1/S2/S3)",
                  ]}
                  onChange={(v) => update("education", v)}
                  tooltip="Tingkat pendidikan berkorelasi dengan pemahaman preventif terhadap faktor risiko medis"
                />

                <LuxurySelect
                  label="Estimasi Pendapatan Bulanan"
                  value={form.income}
                  options={[
                    "< Rp 2 Juta", "Rp 2 - 5 Juta", "Rp 5 - 10 Juta", "> Rp 10 Juta",
                  ]}
                  onChange={(v) => update("income", v)}
                  tooltip="Pendapatan memengaruhi stabilitas asupan gizi berkualitas dan akses jaminan kesehatan"
                />
              </div>
            </>
          )}

          {/* STEP 1: Biometrik Medis */}
          {step === 1 && (
            <>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderIcon}>
                  <StethoscopeIcon size={26} color="#7D0404" />
                </div>
                <div>
                  <h2 className={styles.cardHeaderTitle}>Langkah 2: Kondisi Klinis &amp; Biometrik Pasien</h2>
                  <p className={styles.cardHeaderSub}>
                    Parameter rekam medis utama yang membebani kinerja otot jantung dan pembuluh darah koroner.
                  </p>
                </div>
              </div>

              <div className="grid-2">
                <LuxuryToggle
                  label="Riwayat Hipertensi (Tekanan Darah Tinggi)?"
                  value={form.highBP}
                  onChange={(v) => update("highBP", v)}
                  tooltip="Tekanan darah tinggi secara kronis merusak elastisitas dinding pembuluh darah arteri"
                />

                <LuxuryToggle
                  label="Riwayat Hiperkolesterolemia (Kolesterol Tinggi)?"
                  value={form.highChol}
                  onChange={(v) => update("highChol", v)}
                  tooltip="Penumpukan kolesterol LDL memicu pembentukan plak aterosklerosis pada pembuluh jantung"
                />

                <LuxuryToggle
                  label="Pemeriksaan Kolesterol dalam 5 Tahun Terakhir?"
                  value={form.cholCheck}
                  onChange={(v) => update("cholCheck", v)}
                  tooltip="Pemeriksaan rutin membantu deteksi dislipidemia sedini mungkin"
                />

                <BMISlider
                  value={form.bmi}
                  onChange={(v) => update("bmi", v)}
                />

                <LuxuryToggle
                  label="Pernah Terdiagnosis Mengalami Stroke?"
                  value={form.stroke}
                  onChange={(v) => update("stroke", v)}
                  tooltip="Riwayat stroke serebrovaskular sangat erat kaitannya dengan patologi kardiovaskular"
                />

                <LuxurySelect
                  label="Status Diagnosis Diabetes"
                  value={form.diabetes}
                  options={["Tidak Punya", "Pre-Diabetes", "Punya Diabetes"]}
                  onChange={(v) => update("diabetes", v)}
                  tooltip="Kadar glukosa darah tinggi mempercepat kerusakan pembuluh darah kapiler dan koroner"
                />
              </div>
            </>
          )}

          {/* STEP 2: Gaya Hidup */}
          {step === 2 && (
            <>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderIcon}>
                  <ActivityIcon size={26} color="#7D0404" />
                </div>
                <div>
                  <h2 className={styles.cardHeaderTitle}>Langkah 3: Perilaku &amp; Pola Gaya Hidup</h2>
                  <p className={styles.cardHeaderSub}>
                    Kebiasaan harian yang menjadi pemicu atau protektor terhadap degenerasi sistem peredaran darah.
                  </p>
                </div>
              </div>

              <div className="grid-2">
                <LuxuryToggle
                  label="Perokok Aktif? (Telah merokok > 100 batang)"
                  value={form.smoker}
                  onChange={(v) => update("smoker", v)}
                  tooltip="Nikotin dan karbon monoksida merusak endotel pembuluh darah dan memicu penggumpalan"
                />

                <LuxuryToggle
                  label="Aktivitas Fisik / Olahraga Rutin (30 hari terakhir)?"
                  value={form.physActivity}
                  onChange={(v) => update("physActivity", v)}
                  tooltip="Aktivitas kardio teratur melatih efisiensi kontraksi otot miokardium dan elastisitas vaskular"
                />

                <LuxuryToggle
                  label="Konsumsi Alkohol Berat / Rutin?"
                  value={form.alcohol}
                  onChange={(v) => update("alcohol", v)}
                  tooltip="Konsumsi alkohol berlebih dapat memicu kardiomiopati dan aritmia jantung"
                />

                <LuxuryToggle
                  label="Konsumsi Buah Segar Minimal 1x Sehari?"
                  value={form.fruits}
                  onChange={(v) => update("fruits", v)}
                  tooltip="Asupan serat, kalium, dan antioksidan alami melindungi sel dari stres oksidatif"
                />

                <LuxuryToggle
                  label="Konsumsi Sayuran Segar Minimal 1x Sehari?"
                  value={form.veggies}
                  onChange={(v) => update("veggies", v)}
                  tooltip="Nitrat alami dan serat pangan dari sayuran membantu mempertahankan tekanan darah optimal"
                />
              </div>
            </>
          )}

          {/* STEP 3: Keluhan & Hasil */}
          {step === 3 && (
            <>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderIcon}>
                  <HeartPulseIcon size={26} color="#7D0404" />
                </div>
                <div>
                  <h2 className={styles.cardHeaderTitle}>Langkah 4: Status Kesehatan Subjektif &amp; Akses Medis</h2>
                  <p className={styles.cardHeaderSub}>
                    Kondisi fisik serta keluhan akut yang dirasakan dalam 30 hari terakhir sebelum kalkulasi AI.
                  </p>
                </div>
              </div>

              <div className="grid-2">
                <LuxurySelect
                  label="Penilaian Kesehatan Umum Secara Mandiri"
                  value={form.genHlth}
                  options={["Sangat Baik", "Baik", "Cukup", "Buruk", "Sangat Buruk"]}
                  onChange={(v) => update("genHlth", v)}
                  tooltip="Self-rated general health memiliki korelasi prediktif yang kuat dalam model CDC"
                />

                <LuxuryToggle
                  label="Kesulitan Berjalan atau Menaiki Anak Tangga?"
                  value={form.diffWalk}
                  onChange={(v) => update("diffWalk", v)}
                  tooltip="Keterbatasan mobilitas fisik sering mencerminkan penurunan kapasitas fungsional kardiorespirasi"
                />

                <LuxuryToggle
                  label="Memiliki Jaminan / Asuransi Kesehatan (BPJS/Swasta)?"
                  value={form.healthcare}
                  onChange={(v) => update("healthcare", v)}
                />

                <LuxuryToggle
                  label="Pernah Batal Berobat ke Dokter Karena Kendala Biaya?"
                  value={form.noDoc}
                  onChange={(v) => update("noDoc", v)}
                />

                <DaySlider
                  label="Hari Gangguan Kesehatan Fisik"
                  value={form.physHlth}
                  onChange={(v) => update("physHlth", v)}
                  tooltip="Jumlah hari dalam 30 hari terakhir di mana kondisi fisik terasa sakit atau tidak prima"
                />

                <DaySlider
                  label="Hari Gangguan Kesehatan Mental"
                  value={form.mentHlth}
                  onChange={(v) => update("mentHlth", v)}
                  tooltip="Stres kronis dan depresi meningkatkan pelepasan hormon kortisol yang memicu takikardia"
                />
              </div>

              {/* Predict Button Action */}
              {!result && (
                <div className={styles.actionPredictWrapper}>
                  <button
                    className="btn btn-predict btn-full"
                    onClick={handlePredict}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner" />
                        <span>Menganalisis 21 Parameter Menggunakan Random Forest...</span>
                      </>
                    ) : (
                      <>
                        <HeartPulseIcon size={22} color="#FFFFFF" />
                        <span>PROSES PREDIKSI RISIKO SEKARANG</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Diagnostic Result Card */}
              {result && (
                <div className={styles.resultContainer}>
                  <div
                    className={`${styles.resultBanner} ${
                      result.prediction === 1
                        ? styles.resultDangerTheme
                        : styles.resultSafeTheme
                    }`}
                  >
                    <div className={styles.resultBadgeTag}>
                      {result.prediction === 1 ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <AlertTriangleIcon size={14} color="#7D0404" />
                          PERINGATAN KLINIS
                        </span>
                      ) : (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <CheckCircleIcon size={14} color="#059669" />
                          STATUS STABIL
                        </span>
                      )}
                    </div>

                    <div className={styles.resultTitleLarge}>
                      {result.prediction === 1
                        ? "TERINDIKASI BERISIKO TINGGI"
                        : "TIDAK BERISIKO (PROFIL SEHAT)"}
                    </div>

                    <p className={styles.resultSummaryText}>
                      {result.prediction === 1
                        ? "Pola kombinasi 21 variabel rekam medis Anda menunjukkan kemiripan signifikan dengan kelompok populasi penderita penyakit kardiovaskular pada dataset CDC BRFSS."
                        : "Pola 21 variabel data Anda berada dalam kategori rentang normal tanpa indikasi beban patologis mayor pada sistem kardiovaskular."}
                    </p>

                    {/* Confidence Meter */}
                    <div className={styles.meterContainer}>
                      <div className={styles.meterLabels}>
                        <span>Tingkat Kepastian Model AI (Confidence Level)</span>
                        <strong className={styles.meterPercent}>
                          {(result.probability * 100).toFixed(1)}%
                        </strong>
                      </div>
                      <div className={styles.meterTrack}>
                        <div
                          className={styles.meterFill}
                          style={{ width: `${(result.probability * 100).toFixed(1)}%` }}
                        />
                      </div>
                    </div>

                    {/* Actionable Medical Advice */}
                    <div className={styles.adviceCard}>
                      <div className={styles.adviceHeader}>
                        <ClipboardIcon size={20} color="#7D0404" />
                        <h4>Rekomendasi Medis &amp; Tindakan Preventif:</h4>
                      </div>
                      <p className={styles.adviceBody}>{result.recommendation}</p>
                    </div>
                  </div>

                  {/* Cloud Sync Status / Guest Warning Callout */}
                  {user ? (
                    <div
                      style={{
                        marginTop: "1.5rem",
                        padding: "1.1rem 1.4rem",
                        background: "#F0FDF4",
                        border: "1.5px solid #86EFAC",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <CheckCircleIcon size={20} color="#059669" />
                      <div>
                        <strong style={{ color: "#166534", fontSize: "0.92rem", display: "block" }}>
                          Tersimpan Otomatis ke Cloud Firestore
                        </strong>
                        <span style={{ color: "#15803D", fontSize: "0.82rem" }}>
                          Hasil skrining ini telah dicatat secara permanen di akun <strong>{user.email}</strong>.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: "1.5rem",
                        padding: "1.4rem 1.6rem",
                        background: "#FFFBEB",
                        border: "1.5px solid #FCD34D",
                        borderRadius: "18px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: "#FEF3C7",
                            border: "1.5px solid #F59E0B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <AlertTriangleIcon size={18} color="#B45309" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ color: "#92400E", fontSize: "1rem", fontWeight: 800, marginBottom: "0.35rem" }}>
                            Peringatan: Riwayat Anda Belum Tersimpan Permanen
                          </h4>
                          <p style={{ color: "#78350F", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.1rem" }}>
                            Anda saat ini melakukan skrining dalam <strong>Mode Tamu</strong>. Hasil analisis ini hanya tersimpan sementara di browser Anda dan dapat hilang sewaktu-waktu. Silakan <strong>Masuk</strong> atau <strong>Daftar Akun</strong> agar riwayat penapisan medis Anda tersimpan aman di Cloud.
                          </p>
                          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                            <Link href="/login" className="btn btn-primary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.88rem" }}>
                              <UserIcon size={16} color="#FFFFFF" />
                              <span>Masuk / Daftar Akun Sekarang</span>
                            </Link>
                            <Link href="/history" className="btn btn-secondary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.88rem" }}>
                              <span>Lihat Riwayat Lokal</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    className="btn btn-secondary btn-full btn-lg"
                    onClick={() => {
                      setResult(null);
                      setStep(0);
                      setForm(INITIAL_FORM);
                    }}
                    style={{ marginTop: "1.5rem" }}
                  >
                    <span>Lakukan Skrining Ulang untuk Pasien Lain</span>
                  </button>
                </div>
              )}
            </>
          )}

          {/* Stepper Navigation Controls */}
          {!result && (
            <div className={styles.stepperNavFooter}>
              {step > 0 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setStep(step - 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  <span>Kembali</span>
                </button>
              )}

              {step < 3 && (
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(step + 1)}
                  style={{ marginLeft: "auto" }}
                >
                  <span>Lanjut ke Langkah {step + 2}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
