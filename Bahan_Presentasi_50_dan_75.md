# 📊 Panduan Presentasi Proyek Akhir (REVISI)

Berdasarkan strategi terbaru Anda, proyek ini dibagi menjadi dua fase presentasi utama. Anda bisa menggunakan panduan ini untuk menyesuaikan *template* PPT yang Anda miliki.

---

## 📌 PRESENTASI 50%: Pembahasan Penuh Google Colab (Notebook Bab 1 - 5.1)
*Fokus: Mengupas tuntas seluruh tahapan hulu Data Mining, mulai dari dataset mentah hingga model klasifikasi dan klasterisasi berhasil dievaluasi.*

* **Slide 1: Latar Belakang & Pemilihan Data (Tahap 1)**
  * **Judul Besar Saran:** Pemilihan Data (Dataset BRFSS 2015)
  * **Isi Slide:** Tampilkan *screenshot* 5 baris pertama data (`df.head()`). Sebutkan bahwa kita menggunakan data 250 ribu rekam medis CDC dengan 21 fitur prediktor (termasuk Gaji & Pendidikan).
* **Slide 2: Pemrosesan Data (Tahap 2)**
  * **Judul Besar Saran:** Pra-pemrosesan & Standardisasi Data
  * **Isi Slide:** Jelaskan mengapa data dibagi 80% (latihan) dan 20% (ujian). Sebutkan fungsi *StandardScaler* (agar skala angka seragam) dan penanganan *imbalanced data*.
* **Slide 3: Klasifikasi Random Forest (Tahap 3 & 4)**
  * **Judul Besar Saran:** Klasifikasi & Evaluasi Model (Random Forest)
  * **Isi Slide:** Tampilkan *screenshot* hasil **Akurasi 90%** dan *Classification Report*. Sebutkan bahwa BMI dan Usia adalah penentu tertinggi dari grafik *Feature Importance*.
* **Slide 4: Klasterisasi & Visualisasi (Tahap 5 & 5.1)**
  * **Judul Besar Saran:** Segmentasi Pasien (K-Means Clustering)
  * **Isi Slide:** Tampilkan gambar grafik Titik-Titik warna-warni (*Scatter Plot*). Jelaskan bahwa mesin berhasil memisahkan pasien ke dalam 3 kelompok secara alami (tanpa label) berdasarkan pola gaya hidup mereka.

---

## 🚀 PRESENTASI 75% (Dianggap Final): Pembahasan Website (Deployment)
*Fokus: Bagaimana otak AI yang sudah jadi di Colab (Tahap 50%) dihidupkan ke dalam dunia nyata berupa Website interaktif.*

* **Slide 1: Konsep Deployment Model**
  * **Judul Besar Saran:** Integrasi Model AI ke Dalam Sistem Web
  * **Isi Slide:** Jelaskan proses *Export* model dari Colab ke file `.pkl`, lalu file tersebut dipanggil (*Load*) ke dalam aplikasi berbasis *Streamlit*.
* **Slide 2: Antarmuka & Input Pengguna**
  * **Judul Besar Saran:** Desain UI Berbasis Langkah (Wizard Form)
  * **Isi Slide:** Tampilkan *screenshot* tampilan web Anda yang premium. Jelaskan mengapa Anda membagi form ke dalam 4 Langkah (Demografi -> Riwayat -> Gaya Hidup -> Keluhan) agar sistematis dan *User-Friendly*.
* **Slide 3: Eksekusi Prediksi & Kesimpulan**
  * **Judul Besar Saran:** Simulasi Prediksi Secara *Real-Time*
  * **Isi Slide:** Tampilkan *screenshot* hasil saat tombol ditekan (Kabar Baik vs Peringatan). Jelaskan bahwa sistem tidak hanya memberi tebakan, tapi juga probabilitas (Tingkat Keyakinan) dan Saran Medis otomatis.
