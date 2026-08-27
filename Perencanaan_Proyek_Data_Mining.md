# DOKUMEN PERENCANAAN PROYEK DATA MINING
**Judul Proyek:** Prediksi Risiko Penyakit Jantung Berdasarkan Gaya Hidup Menggunakan Algoritma Random Forest dan K-Means Clustering
**Mata Kuliah:** Data Mining (Semester 6)

---

## 1. Latar Belakang
Penyakit jantung merupakan salah satu penyebab utama kematian secara global. Banyak faktor risiko penyakit jantung berkaitan erat dengan gaya hidup sehari-hari, seperti indeks massa tubuh (BMI), kebiasaan merokok, tingkat aktivitas fisik, dan tekanan darah. Dengan memanfaatkan teknik *Data Mining* dan *Machine Learning*, rekam medis historis dari ratusan ribu pasien dapat dianalisis untuk menemukan pola tersembunyi. Proyek ini bertujuan untuk membangun model yang mampu memprediksi apakah seseorang berisiko terkena penyakit jantung berdasarkan data gaya hidup, serta mengimplementasikannya ke dalam sebuah aplikasi web yang dapat diakses publik.

## 2. Tujuan Proyek
1. Menganalisis dan menemukan fitur/variabel gaya hidup yang memiliki korelasi paling kuat terhadap risiko penyakit jantung (Eksplorasi Data).
2. Membangun model **Klasifikasi** untuk memprediksi risiko penyakit jantung menggunakan algoritma *Random Forest*.
3. Melakukan **Klasterisasi** pasien menggunakan algoritma *K-Means* untuk menemukan segmen/kelompok pasien dengan karakteristik kesehatan yang mirip (Segmentasi Pasien).
4. Melakukan **Deployment** dengan mengintegrasikan model ke dalam aplikasi Web (Streamlit) secara interaktif.

## 3. Deskripsi Dataset
*   **Nama Dataset:** `heart_disease_health_indicators_BRFSS2015.csv`
*   **Sumber Data:** Sistem Pengawasan Faktor Risiko Perilaku (BRFSS) CDC tahun 2015.
*   **Jumlah Data:** 253.682 baris (pasien).
*   **Jumlah Variabel/Fitur:** 21 Fitur Prediktor (Umur, BMI, Tekanan Darah, dll) + 1 Variabel Target (`HeartDiseaseorAttack`).
*   **Karakteristik Target:** Biner (0 = Tidak Ada Penyakit Jantung, 1 = Berisiko / Pernah Mengalami Serangan Jantung).

---

## 4. Metodologi Data Mining (Tahapan Pengerjaan)
Proyek ini mengadopsi kerangka kerja standar *Knowledge Discovery in Databases (KDD)* yang meliputi tahap-tahap berikut:

### Tahap 1: Pemilihan Data (*Data Selection*)
*   Memuat dataset CSV ke dalam environment *Google Colab* menggunakan library Pandas.
*   Mengidentifikasi kolom target utama (`HeartDiseaseorAttack`) dan fitur-fitur pendukung.

### Tahap 2: Eksplorasi & Pemrosesan Data (*Preprocessing*)
*   **Pengecekan Missing Values:** Memastikan tidak ada data yang kosong (Null/NaN) pada dataset.
*   **Exploratory Data Analysis (EDA):** Membuat visualisasi grafik batang untuk melihat distribusi target (menganalisis *imbalanced data*) dan *Heatmap Correlation* untuk melihat hubungan antar variabel.
*   **Splitting Data:** Membagi dataset menjadi dua bagian, yaitu 80% Data Latih (*Training Data*) dan 20% Data Uji (*Testing Data*).
*   **Standarisasi (Scaling):** Menggunakan `StandardScaler` agar seluruh fitur memiliki rentang skala angka yang sama, sehingga tidak ada fitur yang mendominasi hanya karena angkanya besar (misal: BMI vs Skala Umur).

### Tahap 3: Klasifikasi (Supervised Learning)
*   **Algoritma:** *Random Forest Classifier*.
*   **Skenario:** Melatih sekumpulan Pohon Keputusan (Decision Trees) secara paralel menggunakan 80% Data Latih untuk menemukan aturan/pola yang membedakan pasien sakit dan sehat.
*   **Alasan Pemilihan Algoritma:** Sangat tangguh terhadap *outlier*, cepat dilatih pada data berukuran besar, dan mampu meminimalisir *overfitting*.

### Tahap 4: Klasterisasi (Unsupervised Learning)
*   **Algoritma:** *K-Means Clustering*.
*   **Skenario:** Mengabaikan kolom target (penyakit), lalu meminta mesin mengelompokkan 253.682 pasien tersebut menjadi 3 klaster/segmen berdasarkan kemiripan pola kesehatannya.
*   **Tujuan:** Berguna untuk pihak Rumah Sakit dalam memetakan profil pasien (misalnya: Klaster 1 adalah lansia perokok, Klaster 2 adalah anak muda sehat, dsb) untuk tindakan preventif yang tepat sasaran.

### Tahap 5: Evaluasi dan Validasi Model
Menguji performa model Klasifikasi terhadap 20% Data Uji menggunakan metrik:
*   **Akurasi (Accuracy):** Persentase total tebakan mesin yang benar.
*   **Classification Report:** Meninjau nilai *Precision*, *Recall*, dan *F1-Score* untuk melihat seberapa baik mesin menebak kelas minoritas (pasien sakit).
*   **Confusion Matrix:** Menampilkan heatmap silang untuk melihat letak *False Positive* (Sehat ditebak sakit) dan *False Negative* (Sakit ditebak sehat - sangat fatal di dunia medis).

### Tahap 6: Deployment (Implementasi ke Aplikasi Web)
*   **Export Model:** Menyimpan model *Random Forest* terbaik beserta objek *Scaler* ke dalam file berekstensi `.pkl` menggunakan library `joblib`.
*   **Pengembangan Antarmuka Web (Frontend):** Membangun antarmuka web interaktif menggunakan *framework* Python **Streamlit**.
*   **Integrasi Model:** Menghubungkan file model `.pkl` ke dalam aplikasi web. Dengan demikian, pengguna (masyarakat awam atau dokter) dapat memasukkan data pasien baru (seperti BMI, umur, tekanan darah) melalui *form* di website, dan sistem akan langsung mengembalikan hasil prediksi risiko penyakit jantung secara otomatis.

---

## 5. Kebutuhan Perangkat Lunak (Tools)
*   **Bahasa Pemrograman:** Python 3
*   **Environment Data Mining:** Google Colab (untuk komputasi Cloud tahap *Training*)
*   **Web Framework:** Streamlit (untuk pembuatan antarmuka Web Deployment)
*   **Library Utama:** 
    *   `pandas` & `numpy` (Manipulasi Data)
    *   `matplotlib` & `seaborn` (Visualisasi Data / Grafik)
    *   `scikit-learn` (Algoritma Machine Learning & Evaluasi)
    *   `joblib` (Menyimpan dan memuat Model Machine Learning)
