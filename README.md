# 🩺 HeartGuard AI — Sistem Prediksi Risiko Penyakit Jantung

> **Proyek Akhir Mata Kuliah Data Mining — Semester Pendek (SP)**  
> **Program Studi Informatika**  
> **Dosen Pengampu:** Nirwana Hendrastuty, S.Kom., M.Cs.

---

## 👥 Tim Peneliti & Pengembang
* **Dharma Mudita** (NPM: 23312067)
* **Wildan Pratama** (NPM: 23312024)
* **Farhan Almasyah Nuryadi** (NPM: 25312110)

---

## 🚀 Ringkasan Sistem
HeartGuard AI adalah platform penapisan klinis dan deteksi dini risiko penyakit kardiovaskular terintegrasi. Sistem memanfaatkan algoritma Machine Learning **Random Forest Classifier** yang dilatih pada **253,680 rekam medis epidemiologis CDC BRFSS (Behavioral Risk Factor Surveillance System) 2015** dengan **21 parameter klinis, biometrik, dan gaya hidup**.

### 📊 Performa Model
- **Akurasi Pengujian:** **89.96%** (diuji pada 50,736 data independen)
- **ROC-AUC Score:** **0.7712**
- **Segmentasi Pasien:** **K-Means Clustering (k = 3 kelompok profil risiko)**
- **Waktu Inferensi:** Instan (< 1 detik)

---

## ✨ Fitur Unggulan
1. **Liquid Glass & Frosted Glassmorphism UI:** Desain antarmuka premium modern dengan palet warna Crimson `#7D0404`.
2. **Alur Skrining 4 Langkah Terstruktur:**
   - *Langkah 1:* Demografi & Sosioekonomi (Usia, Gender, Pendidikan, Pendapatan)
   - *Langkah 2:* Biometrik & Riwayat Klinis (Hipertensi, Kolesterol, BMI, Diabetes, Stroke)
   - *Langkah 3:* Gaya Hidup & Pola Konsumsi (Merokok, Olahraga, Alkohol, Buah & Sayur)
   - *Langkah 4:* Keluhan Akut & Status Kesehatan Fisik-Mental
3. **Autentikasi & Database Cloud:** Integrasi Firebase Authentication & Cloud Firestore untuk sinkronisasi riwayat real-time.
4. **Isolasi Mode Tamu (Guest Mode):** Pengunjung yang belum login tetap dapat melakukan skrining gratis tanpa mencemari data riwayat pengguna lain.
5. **Floating Generative AI Medical Assistant:** Chatbot asisten cerdas terintegrasi dengan Google Gemini 3.7 / 3.6 Flash.
6. **Unduh Rekap Medis PDF (Export PDF):** Fitur cetak dokumen laporan klinis resmi lengkap dengan diagram biometrik, probabilitas, dan rekomendasi intervensi.
7. **Mobile & Laptop Responsive:** Tampilan proporsional dan responsif di smartphone, tablet, maupun layar laptop/desktop.

---

## 🛠️ Arsitektur Teknologi
- **Frontend Framework:** Next.js 16 (App Router) & TypeScript
- **Styling:** Vanilla CSS (Liquid Glass Specular Reflections, 28px Blur)
- **Generative AI:** Google Gemini API (Gemini 3.7 / 3.6 Flash)
- **Machine Learning Engine:** Scikit-Learn & Python Serverless Runtime
- **Cloud Database & Auth:** Firebase Authentication & Cloud Firestore
- **Document Export Engine:** jsPDF & Canvas
- **Deployment Platform:** Vercel Serverless Architecture

---

## 💻 Cara Menjalankan Secara Lokal

```bash
# 1. Masuk ke direktori web
cd web

# 2. Pasang dependensi
npm install

# 3. Konfigurasi Environment Variable
# Buat berkas .env.local dan masukkan:
# GEMINI_API_KEY=your_gemini_api_key_here

# 4. Jalankan server pengembangan
npm run dev
```

Buka **http://localhost:3000** di peramban Anda.
