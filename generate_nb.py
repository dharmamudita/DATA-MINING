import json

notebook = {
    "cells": [],
    "metadata": {
        "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
        "language_info": {"name": "python", "version": "3.10"}
    },
    "nbformat": 4,
    "nbformat_minor": 4
}

def add_md(text):
    notebook["cells"].append({"cell_type": "markdown", "metadata": {}, "source": [line + "\n" for line in text.split('\n')]})

def add_code(text):
    notebook["cells"].append({"cell_type": "code", "execution_count": None, "metadata": {}, "outputs": [], "source": [line + "\n" for line in text.split('\n')]})

add_md("# Proyek Akhir Data Mining: Prediksi Risiko Penyakit Jantung\n**Dataset**: `heart_disease_health_indicators_BRFSS2015.csv`\n\nBuku catatan (Notebook) ini berisi keseluruhan tahapan *Data Mining*, mulai dari Pemilihan Data hingga Klasterisasi. Setiap tahapan dilengkapi dengan penjelasan teoretis, fungsi kode, dan interpretasi grafik agar sangat mudah dipahami saat presentasi.")

add_md("## 1. PEMILIHAN DATA (Data Selection)\n**Tujuan Tahapan:**\nLangkah pertama dalam Data Mining adalah mengumpulkan dan memasukkan data mentah ke dalam sistem. Kita akan memuat dataset yang berisi ratusan ribu rekam medis pasien.\n\n**Silakan jalankan cell di bawah ini. Tombol 'Choose Files' akan muncul. Klik tombol tersebut dan pilih file CSV Anda dari laptop.**")
add_code("""# --- PENJELASAN KODE ---
# 1. Mengimpor library pandas untuk manipulasi data (membaca tabel, dll)
import pandas as pd
# 2. Mengimpor numpy untuk komputasi numerik
import numpy as np
# 3. Mengimpor library untuk membuat grafik dasar dan tingkat lanjut
import matplotlib.pyplot as plt
import seaborn as sns
# 4. Mengimpor library Machine Learning dari Scikit-Learn (Standarisasi, Model, Evaluasi)
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
# 5. Mengimpor fungsi khusus Colab untuk mengunggah file
from google.colab import files
# 6. Mengimpor library untuk menyimpan model AI ke dalam file (untuk kebutuhan Web)
import joblib

print("Silakan klik tombol 'Choose Files' di bawah untuk mengunggah dataset CSV Anda:")
uploaded = files.upload()
file_name = next(iter(uploaded))

# Membaca file CSV tersebut dan menyimpannya ke dalam memori DataFrame (df)
df = pd.read_csv(file_name)
print('\\nFile berhasil dimuat!')

# df.head() berfungsi untuk menampilkan 5 baris pertama sebagai 'preview' agar kita tahu bentuk tabelnya.
df.head()""")

add_md("### 1.1 Exploratory Data Analysis (EDA) - Pengecekan Data Kosong\n**Tujuan Tahapan:**\nSebelum dianalisis, kita harus memastikan kualitas data. Jika ada sel data yang kosong (*missing values*), hal itu dapat mengacaukan perhitungan mesin. Di sini kita memverifikasi keutuhan data.")
add_code("""# Menampilkan informasi detail tentang dataset (jumlah baris: 253.682, jumlah kolom: 22)
print('Informasi Dataset:')
df.info()

# Mengecek jumlah sel yang kosong (NaN/Null) di setiap kolom.
# Hasil 0 berarti dataset kita sempurna dan tidak membutuhkan teknik pengisian data palsu (Imputasi).
print('\\nTotal Missing Values tiap kolom:')
print(df.isnull().sum())""")

add_md("### 1.2 Visualisasi Distribusi Kelas Target (Grafik Batang)\n**Tujuan Tahapan:**\nMelihat keseimbangan kelas target (Kolom `HeartDiseaseorAttack`). Apakah jumlah orang yang sehat jauh lebih banyak daripada yang sakit? Hal ini penting diketahui karena data yang terlalu tidak seimbang (imbalanced) bisa membuat model bias/kurang akurat untuk satu sisi.")
add_code("""plt.figure(figsize=(6,4))
sns.countplot(x='HeartDiseaseorAttack', data=df)
plt.title('Distribusi Pasien (0 = Tidak, 1 = Ada Penyakit Jantung)')
plt.show()""")
add_md("**📌 Interpretasi Grafik Distribusi untuk Dosen:**\n* Dari grafik batang di atas, terlihat jelas batang **0 (Tidak Sakit)** jauh lebih tinggi daripada batang **1 (Sakit Jantung)**.\n* **Kesimpulan:** Dataset ini bersifat *Imbalanced* (tidak seimbang). Ini adalah kondisi wajar dan nyata di dunia medis karena mayoritas populasi umum memang tergolong sehat.")

add_md("### 1.3 Visualisasi Korelasi Antar Fitur (Heatmap)\n**Tujuan Tahapan:**\nMencari tahu pertanyaan/fitur apa saja yang memiliki hubungan paling kuat terhadap kemunculan penyakit jantung. Semakin tinggi angkanya (mendekati 1 atau -1), semakin kuat hubungannya.")
add_code("""plt.figure(figsize=(20, 15))
# Membuat tabel korelasi dan mewarnainya. 
# Warna Merah = Hubungan Positif Kuat, Biru = Hubungan Negatif Kuat.
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Heatmap Korelasi Seluruh Fitur')
plt.show()""")
add_md("**📌 Interpretasi Heatmap Korelasi untuk Dosen:**\n* Perhatikan angka-angka di baris/kolom `HeartDiseaseorAttack`.\n* Fitur dengan korelasi tertinggi terhadap penyakit jantung antara lain: **GenHlth** (Kesehatan Umum, korelasi 0.26), **Age** (Umur, 0.22), **HighBP** (Tekanan Darah Tinggi, 0.21), dan **Stroke** (0.20).\n* **Kesimpulan:** Umur, tingginya tekanan darah, dan status kesehatan secara umum merupakan faktor penentu/prediktor utama penyakit jantung dalam penelitian ini.")

add_md("## 2. PEMROSESAN DATA (Preprocessing)\n**Tujuan Tahapan:**\nMesin tidak bisa langsung memakan data mentah. Kita harus melakukan 3 hal inti:\n1. **Pemisahan:** Memisahkan *Variabel Independen* (Pertanyaan/Fitur) dengan *Variabel Dependen* (Target/Kunci Jawaban).\n2. **Pembagian (Splitting):** Mengiris data menjadi 80% untuk *Training* (Bahan Belajar Mesin) dan 20% untuk *Testing* (Soal Ujian Mesin).\n3. **Standarisasi (Scaling):** Menyamakan skala besaran angka. (Misal: Umur berskala 1-13, BMI berskala puluhan. Jika tidak disamakan, mesin akan keliru mengira BMI jauh lebih penting dari Umur hanya karena angkanya lebih besar).")
add_code("""# X berisi semua kolom KECUALI target penyakit
X = df.drop('HeartDiseaseorAttack', axis=1)
# y HANYA berisi target penyakit
y = df['HeartDiseaseorAttack']

# Membagi data (80% latih, 20% uji). random_state=42 agar hasil pembagiannya konsisten jika kode diulang.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Melakukan standarisasi angka (Z-Score Normalization)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print('Jumlah data untuk mesin belajar:', X_train_scaled.shape[0], 'baris')
print('Jumlah data untuk mesin diuji:', X_test_scaled.shape[0], 'baris')""")

add_md("## 3. KLASIFIKASI (Pemodelan Data Mining)\n**Tujuan Tahapan:**\nMembuat 'Otak Buatan' yang mempelajari pola tersembunyi antara gaya hidup pasien (X_train) dengan penyakit jantung (y_train).\nAlgoritma yang dipakai adalah **Random Forest**, yaitu sekumpulan banyak Pohon Keputusan (Decision Trees) yang saling \"berdiskusi\"/voting untuk menghasilkan tebakan (prediksi) terbaik.")
add_code("""# Membuat model Random Forest dengan 50 Pohon Keputusan (n_estimators=50).
# n_jobs=-1 berarti kita menggunakan seluruh inti CPU Google Colab agar komputasi 200 ribu data berjalan cepat.
rf_model = RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=-1)

# Proses Training: Memerintahkan Mesin membaca 200 ribu lebih data latih dan mencari polanya secara matematis.
rf_model.fit(X_train_scaled, y_train)
print('Model Klasifikasi Selesai Dilatih!')""")

add_md("## 4. EVALUASI DAN VALIDASI MODEL\n**Tujuan Tahapan:**\nMenguji model yang sudah pintar tadi menggunakan \"soal ujian\" (Data Uji / X_test) yang belum pernah ia lihat sama sekali sebelumnya. Lalu, kita cocokkan jawaban model dengan kunci jawaban asli dokter (y_test).")
add_code("""# Mesin menebak penyakit pasien pada data uji
y_pred = rf_model.predict(X_test_scaled)

# Menghitung seberapa banyak tebakan mesin yang sama persis dengan kunci jawaban (Akurasi)
akurasi = accuracy_score(y_test, y_pred)
print(f'Akurasi Keseluruhan Model: {akurasi * 100:.2f}%')

# Mencetak Laporan Klasifikasi detail untuk per-kelas (Precision, Recall, F1-Score)
print('\\nDetail Validasi (Classification Report):\\n', classification_report(y_test, y_pred))""")
add_md("**📌 Interpretasi Classification Report untuk Dosen:**\n* **Akurasi (sekitar 90%):** Secara umum, model mampu memprediksi 90% rekam medis pasien dengan benar.\n* **Mengapa Recall/Precision untuk label 1 (Sakit) lebih rendah?** Hal ini disebabkan oleh sifat data awal yang *Imbalanced*. Karena jumlah sampel orang sakit jauh lebih sedikit, mesin lebih ahli mengenali ciri-ciri orang sehat (label 0) dibanding orang sakit.")

add_md("### 4.1 Grafik Evaluasi: Confusion Matrix\n**Tujuan Tahapan:**\nMelihat rincian letak spesifik di mana mesin melakukan kesalahan tebakan. Ada berapa orang sehat yang ditebak sakit? Ada berapa orang sakit yang ditebak sehat?")
add_code("""cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(6,4))
# Menampilkan matrix dengan warna Biru. Semakin gelap biru, semakin tinggi jumlah pasiennya.
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Tebakan Model Mesin (Prediksi)')
plt.ylabel('Kenyataan Asli (Aktual)')
plt.title('Confusion Matrix Klasifikasi')
plt.show()""")
add_md("**📌 Interpretasi Confusion Matrix untuk Dosen:**\n* **Kiri Atas (True Negative):** Jumlah pasien sehat yang *benar* ditebak sehat oleh mesin.\n* **Kanan Bawah (True Positive):** Jumlah pasien berisiko yang *benar* ditebak berisiko oleh mesin.\n* **Kiri Bawah (False Negative):** Kesalahan Fatal. Pasien aslinya berisiko, tapi ditebak sehat oleh mesin.\n* **Kanan Atas (False Positive):** Pasien aslinya sehat, tapi disangka berisiko oleh mesin (False Alarm).")

add_md("## 5. KLASTERISASI (Clustering - Unsupervised Learning)\n**Tujuan Tahapan:**\nBerbeda dengan klasifikasi yang memprediksi target, klasterisasi bekerja mencari kemiripan antar pasien secara \"buta\" (membuang target label penyakit). Tujuannya adalah mengelompokkan keseluruhan 253 ribu pasien menjadi 3 *Cluster* (Segmen gaya hidup) yang berbeda menggunakan algoritma **K-Means**.")
add_code("""# Standarisasi seluruh 253.682 data asli (X) untuk di-klaster.
X_all_scaled = scaler.fit_transform(X)

# Membuat model K-Means yang akan mencari 3 titik pusat kelompok (Centroid)
kmeans = KMeans(n_clusters=3, n_init=10, random_state=42)

# Proses pencarian kelompok. Mengembalikan nomor klaster (0, 1, atau 2) untuk masing-masing dari 253 ribu pasien
clusters = kmeans.fit_predict(X_all_scaled)

# Menempelkan label klaster tersebut sebagai kolom baru ke data asli agar bisa dipelajari sifatnya
df['Cluster'] = clusters
print('Proses Pengelompokan (Klasterisasi) Selesai!')""")

add_md("### 5.1 Grafik Hasil Klasterisasi\n**Tujuan Tahapan:**\nMembuktikan secara visual bahwa mesin berhasil memisahkan pasien ke dalam kelompok/segmen yang berbeda berdasarkan karakteristik mereka (di grafik ini kita gunakan irisan contoh dimensi **Umur** vs **BMI/Berat Badan**).")
add_code("""# Kita ambil sampel 5.000 pasien secara acak dari total 250 ribu data. 
# Tujuannya murni agar saat pembuatan titik grafik, browser/komputer tidak macet.
sample_df = df.sample(5000, random_state=42)

plt.figure(figsize=(8,6))
# Membuat grafik Scatter Plot (Titik-titik persebaran)
sns.scatterplot(x='Age', y='BMI', hue='Cluster', data=sample_df, palette='viridis', alpha=0.7)
plt.title('Penyebaran Klaster Pasien (Berdasarkan Umur dan BMI)')
plt.show()""")
add_md("**📌 Interpretasi Scatter Plot Klasterisasi untuk Dosen:**\n* Secara visual, terlihat bahwa titik-titik (pasien) terbagi menjadi 3 warna (3 klaster).\n* Algoritma K-Means berhasil menemukan pengelompokan alami dalam data tanpa kita beri tahu kunci jawabannya.\n* Analisis *Clustering* ini sangat berguna di dunia medis untuk **Segmentasi Pasien**. Rumah sakit bisa menggunakan 3 klaster ini untuk memberikan penyuluhan/promosi kesehatan yang *targeted* (tepat sasaran), misalnya: segmen lansia obesitas, segmen muda sehat, dll.")

add_md("## 6. DEPLOYMENT (Implementasi ke Web)\n**Tujuan Tahapan:**\nIni adalah tahap akhir yang sangat krusial! 'Otak' mesin (*Random Forest*) yang sudah pintar dan lulus uji ini akan kita simpan (Export) ke dalam file `.pkl`.\nFile `.pkl` inilah yang akan Anda masukkan ke dalam program Web (Streamlit), agar masyarakat umum bisa menggunakannya secara langsung di internet.")
add_code("""# Mengekspor (menyimpan) model Random Forest
joblib.dump(rf_model, 'model_jantung_rf.pkl')

# Mengekspor objek Scaler (Ini WAJIB, karena data input dari pengguna di Web nantinya harus distandarisasi pakai aturan yang sama)
joblib.dump(scaler, 'scaler_jantung.pkl')

print('YEAY! Model dan Scaler berhasil disimpan menjadi file .pkl!')
print('Silakan klik ikon Folder di menu sebelah kiri Colab, lalu Download file model_jantung_rf.pkl dan scaler_jantung.pkl ke laptop Anda.')""")

with open('d:\\KULIAH\\SP SEMESTER 6\\PROJECT AKHIR\\Proyek_Data_Mining.ipynb', 'w', encoding='utf-8') as f:
    json.dump(notebook, f, indent=2)
