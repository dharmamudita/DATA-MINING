# LAPORAN PROYEK AKHIR
## IMPLEMENTASI ALGORITMA *RANDOM FOREST* DAN *K-MEANS CLUSTERING* UNTUK PREDIKSI RISIKO PENYAKIT JANTUNG BERBASIS APLIKASI WEB

**Disusun Oleh:**
1. **Dharma Mudita** (NPM: 23312067)
2. **Wildan Pratama** (NPM: 23312024)
3. **Farhan Almasyah Nuryadi** (NPM: 25312110)

**Dosen Pengampu:** Nirwana Hendrastuty, S.Kom., M.Cs.  
**Program Studi:** Informatika  
**Mata Kuliah:** Data Mining (Semester Pendek)  
**Tahun Akademik:** 2025/2026 (SP)

---

# DAFTAR ISI

- **BAB I PENDAHULUAN**
  - 1.1 Latar Belakang
  - 1.2 Rumusan Masalah
  - 1.3 Tujuan Penelitian
  - 1.4 Manfaat Penelitian
  - 1.5 Batasan Masalah
- **BAB II LANDASAN TEORI**
  - 2.1 Data Mining
  - 2.2 Knowledge Discovery in Databases (KDD)
  - 2.3 Algoritma Random Forest
  - 2.4 Algoritma K-Means Clustering
  - 2.5 Evaluasi Model Klasifikasi
  - 2.6 Pra-pemrosesan Data
  - 2.7 Teknologi Pengembangan Aplikasi Web
  - 2.8 Penelitian Terdahulu
- **BAB III METODOLOGI PENELITIAN**
  - 3.1 Jenis dan Sumber Data
  - 3.2 Variabel Penelitian
  - 3.3 Alur Penelitian (Tahapan KDD)
  - 3.4 Lingkungan Pengembangan
  - 3.5 Arsitektur Sistem
  - 3.6 Perancangan Antarmuka Pengguna
- **BAB IV HASIL DAN PEMBAHASAN**
  - 4.1 Pemilihan Data (*Data Selection*)
  - 4.2 Analisis Data Eksploratif (EDA)
  - 4.3 Pra-pemrosesan Data (*Preprocessing*)
  - 4.4 Pemodelan Klasifikasi (*Random Forest*)
  - 4.5 Evaluasi dan Validasi Model
  - 4.6 Pemodelan Klasterisasi (*K-Means*)
  - 4.7 Implementasi Aplikasi Web (*Deployment*)
  - 4.8 Pengujian Fungsional Aplikasi
- **BAB V PENUTUP**
  - 5.1 Kesimpulan
  - 5.2 Saran
- **DAFTAR PUSTAKA**

---

# BAB I
# PENDAHULUAN

## 1.1 Latar Belakang

Penyakit kardiovaskular atau penyakit jantung (*Cardiovascular Disease*) hingga saat ini masih menduduki peringkat pertama sebagai penyebab kematian tertinggi di dunia. Menurut data resmi *World Health Organization* (WHO), diperkirakan sebanyak 17,9 juta jiwa meninggal dunia setiap tahunnya akibat penyakit ini, yang merepresentasikan sekitar 32% dari seluruh kematian global (WHO, 2021). Angka yang sangat mengkhawatirkan ini diperburuk oleh fakta bahwa mayoritas kasus serangan jantung terjadi secara tiba-tiba tanpa gejala awal yang disadari oleh penderitanya, sehingga penanganan medis seringkali terlambat diberikan.

Di sisi lain, pesatnya perkembangan teknologi informasi dan ilmu komputasi telah melahirkan sebuah cabang keilmuan yang sangat potensial, yaitu *Data Mining*. Data Mining merupakan proses mengekstraksi pola-pola tersembunyi yang bernilai dari sekumpulan data berukuran masif (Han, Kamber, & Pei, 2012). Dalam konteks dunia medis, miliaran rekam medis elektronik yang tersimpan di berbagai basis data rumah sakit dan lembaga kesehatan di seluruh dunia kini dapat diolah secara komputasional untuk menemukan korelasi dan pola-pola penyebab penyakit yang tidak terlihat oleh mata manusia.

Salah satu sumber data medis yang sangat kredibel dan berskala besar adalah *Behavioral Risk Factor Surveillance System* (BRFSS) yang dikelola oleh *Centers for Disease Control and Prevention* (CDC) Amerika Serikat. Dataset BRFSS tahun 2015 menyimpan lebih dari 253.680 baris data responden yang mencakup informasi komprehensif terkait status kesehatan klinis, perilaku gaya hidup sehari-hari, hingga kondisi sosioekonomi setiap individu (CDC, 2015). Volume dan variasi data sebesar ini menjadikannya kandidat yang sangat ideal untuk dianalisis menggunakan pendekatan *Machine Learning*.

Berbeda dengan pendekatan prediksi konvensional yang umumnya hanya mempertimbangkan faktor klinis seperti tekanan darah dan kadar kolesterol, penelitian ini dirancang secara khusus untuk turut mengintegrasikan faktor sosioekonomi, yakni **tingkat pendidikan** dan **pendapatan**, sebagai variabel prediktor. Berdasarkan temuan medis modern, faktor sosioekonomi memiliki dampak langsung yang signifikan terhadap literasi kesehatan seseorang, kualitas gizi harian, tingkat stres akibat tekanan pekerjaan, serta aksesibilitas terhadap fasilitas pelayanan kesehatan dan jaminan asuransi (Braveman, Egerter, & Williams, 2011). Oleh karena itu, penyertaan variabel-variabel ini diharapkan menghasilkan model prediksi yang lebih holistik dan mendekati kondisi dunia nyata.

Pada puncaknya, sebuah model kecerdasan buatan (*Artificial Intelligence*) sehebat apa pun secara intrinsik akan tetap bersifat teoretis apabila hanya terkurung dalam lingkungan pemrograman mentah seperti Google Colab. Tenaga medis profesional, klinik kesehatan, maupun masyarakat awam membutuhkan perangkat yang dapat diakses dengan mudah dan intuitif. Oleh karena itu, proyek akhir ini tidak hanya berhenti pada tahap pembuatan model, melainkan melangkah lebih jauh dengan mengimplementasikan (*deployment*) algoritma *Random Forest* yang telah terlatih ke dalam sebuah **aplikasi web interaktif** berbasis *framework* Streamlit. Aplikasi web ini dirancang sebagai jembatan penghubung (*bridge*) antara kompleksitas kecerdasan buatan dan kebutuhan medis praktis, sehingga siapa saja dapat melakukan asesmen risiko penyakit jantung secara *real-time* tanpa memerlukan pengetahuan pemrograman sama sekali.

## 1.2 Rumusan Masalah

Berdasarkan latar belakang yang telah diuraikan di atas, maka rumusan masalah dalam proyek akhir ini adalah sebagai berikut:

1. Bagaimana proses pra-pemrosesan data (*data preprocessing*) terhadap dataset CDC BRFSS 2015 yang berskala masif (253.680 baris data dan 22 kolom) agar optimal untuk dipelajari oleh algoritma *Machine Learning*?
2. Bagaimana kinerja dan tingkat akurasi algoritma *Random Forest Classifier* dalam memprediksi risiko penyakit jantung berdasarkan 21 fitur prediktor yang mencakup aspek klinis, gaya hidup, dan sosioekonomi?
3. Bagaimana mengidentifikasi segmentasi atau pengelompokan profil pasien secara alami menggunakan pendekatan *Unsupervised Learning* melalui algoritma klasterisasi *K-Means* pada dimensi Umur dan Indeks Massa Tubuh (BMI)?
4. Bagaimana cara mengintegrasikan model prediksi yang telah dilatih dan disimpan dalam format *pickle* (`.pkl`) ke dalam sistem aplikasi web fungsional berbasis *framework* Streamlit yang siap digunakan secara *real-time*?

## 1.3 Tujuan Penelitian

Adapun tujuan dari pelaksanaan proyek akhir ini adalah sebagai berikut:

1. Melakukan rekayasa dan standardisasi data pada skala besar, termasuk penanganan dan mitigasi terhadap kondisi data yang tidak seimbang (*imbalanced data*), sehingga dataset siap diolah oleh mesin secara optimal.
2. Membangun model *Machine Learning* berbasis algoritma *Random Forest* yang mampu mendeteksi potensi risiko penyakit jantung dengan tingkat akurasi evaluasi yang teruji secara statistik (target di atas 85%).
3. Menganalisis penyebaran klaster atau segmen pasien menggunakan algoritma *K-Means* untuk membuktikan bahwa pola-pola gaya hidup pasien dapat dipetakan dan dikelompokkan secara akurat tanpa campur tangan label manual manusia.
4. Menciptakan produk akhir perangkat lunak (*software*) berbentuk aplikasi web interaktif yang ramah pengguna (*user-friendly*), mampu menerima masukan data pasien, dan menghasilkan prediksi risiko beserta rekomendasi medis secara otomatis dan *real-time*.

## 1.4 Manfaat Penelitian

Manfaat yang diharapkan dari pelaksanaan proyek akhir ini terbagi menjadi dua kategori utama, yaitu:

### 1.4.1 Manfaat Teoretis

1. Memberikan kontribusi ilmiah terhadap pemahaman penerapan algoritma *ensemble learning* (*Random Forest*) dan *unsupervised learning* (*K-Means*) pada domain kesehatan masyarakat, khususnya dalam prediksi risiko penyakit jantung.
2. Memperkaya referensi akademis tentang bagaimana faktor sosioekonomi (pendidikan dan pendapatan) dapat diintegrasikan sebagai variabel prediktor yang bermakna dalam model prediksi penyakit, di samping faktor klinis konvensional.
3. Memberikan bukti empiris bahwa dataset berskala besar (lebih dari 250.000 rekam medis) dari lembaga kredibel internasional (CDC) dapat diolah secara efektif menggunakan pendekatan *Data Mining* untuk menghasilkan wawasan medis yang bernilai tinggi.

### 1.4.2 Manfaat Praktis

1. **Bagi Tenaga Medis:** Menyediakan alat bantu skrining awal (*screening tool*) yang cepat dan efisien untuk mengidentifikasi pasien dengan risiko tinggi penyakit jantung, sehingga prioritas penanganan medis dapat dilakukan lebih dini.
2. **Bagi Masyarakat Umum:** Menyediakan platform yang mudah diakses dan dioperasikan untuk melakukan asesmen mandiri terhadap risiko kesehatan jantung berdasarkan kondisi personal masing-masing individu.
3. **Bagi Institusi Pendidikan:** Menjadi referensi dan studi kasus nyata tentang implementasi *end-to-end* dari proyek *Data Mining*, mulai dari eksplorasi data mentah, pemodelan algoritma, hingga 
- **Frontend & Backend Web:** Next.js 16 (App Router), TypeScript, Vanilla CSS (Liquid Glass & Glassmorphism)
- **Generative AI Assistant:** Google Gemini AI (Gemini 3.7 / 3.6 Flash)
- **Autentikasi & Database Cloud:** Firebase Authentication & Cloud Firestore (Real-time sync)
- **Model Machine Learning:** Random Forest Classifier & K-Means Clustering
- **Deployment:** Vercel Serverless Architecture

## 1.5 Batasan Masalah

Agar pembahasan dalam proyek akhir ini tetap terfokus dan terarah, maka ditetapkan batasan-batasan masalah sebagai berikut:

1. Dataset yang digunakan adalah data sekunder dari CDC BRFSS tahun 2015 yang bersifat statis dan tidak diperbarui secara berkala (*real-time*).
2. Algoritma klasifikasi yang digunakan terbatas pada *Random Forest Classifier*, dan algoritma klasterisasi terbatas pada *K-Means Clustering*. Perbandingan dengan algoritma lain (seperti *Support Vector Machine*, *Gradient Boosting*, atau *DBSCAN*) tidak termasuk dalam lingkup penelitian ini.
3. Aplikasi web yang dikembangkan menggunakan *framework* Streamlit berjalan secara lokal (*localhost*) dan belum di-*deploy* ke server produksi berbasis *cloud* (seperti Heroku atau AWS).
4. Hasil prediksi yang dihasilkan oleh sistem bersifat informatif sebagai alat bantu skrining awal dan **bukan** merupakan pengganti diagnosis medis resmi dari dokter profesional.
5. Fitur-fitur yang digunakan sebagai variabel prediktor dibatasi pada 21 kolom yang tersedia dalam dataset CDC BRFSS 2015, tanpa penambahan fitur eksternal dari sumber data lain.

---

# BAB II
# LANDASAN TEORI

## 2.1 Data Mining

*Data Mining* adalah proses penemuan pola-pola yang menarik dan berpotensi berguna dari sekumpulan data berukuran besar (*large datasets*). Menurut Han, Kamber, dan Pei (2012) dalam buku *Data Mining: Concepts and Techniques*, *Data Mining* didefinisikan sebagai proses mengekstraksi atau "menambang" pengetahuan (*knowledge*) dari volume data yang masif. Proses ini melibatkan serangkaian teknik yang berasal dari irisan beberapa bidang keilmuan, di antaranya statistika, kecerdasan buatan (*Artificial Intelligence*), *Machine Learning*, dan pengelolaan basis data (*Database Management*).

Secara fundamental, *Data Mining* bertujuan untuk mengubah data mentah yang tampak tidak bermakna menjadi informasi dan pengetahuan yang dapat ditindaklanjuti (*actionable knowledge*). Dalam konteks penelitian ini, *Data Mining* digunakan untuk menemukan pola-pola tersembunyi dalam ratusan ribu rekam medis pasien yang berkaitan dengan risiko penyakit jantung.

Tugas-tugas utama dalam *Data Mining* meliputi (Larose & Larose, 2014):
- **Klasifikasi (*Classification*):** Memprediksi kategori atau label dari sebuah data baru berdasarkan pola yang telah dipelajari dari data historis.
- **Klasterisasi (*Clustering*):** Mengelompokkan data ke dalam beberapa segmen berdasarkan kesamaan karakteristik tanpa menggunakan label yang telah ditentukan sebelumnya.
- **Asosiasi (*Association Rule Mining*):** Menemukan hubungan antaritem dalam sekumpulan data transaksi.
- **Regresi (*Regression*):** Memprediksi nilai numerik kontinu berdasarkan variabel-variabel prediktor.

## 2.2 Knowledge Discovery in Databases (KDD)

*Knowledge Discovery in Databases* (KDD) merupakan kerangka kerja (*framework*) menyeluruh yang menempatkan *Data Mining* sebagai salah satu tahapan intinya. Menurut Fayyad, Piatetsky-Shapiro, dan Smyth (1996), KDD adalah proses nontrivial untuk mengidentifikasi pola-pola yang valid, baru, berpotensi bermanfaat, dan pada akhirnya dapat dipahami di dalam data. Tahapan-tahapan KDD yang menjadi acuan dalam proyek ini meliputi:

1. **Pemilihan Data (*Data Selection*):** Mengidentifikasi dan memilih subset data yang relevan dari sumber data yang tersedia. Dalam proyek ini, dataset CDC BRFSS 2015 dipilih karena volume, variasi, dan kredibilitasnya.
2. **Pra-pemrosesan Data (*Data Preprocessing*):** Membersihkan data dari *noise*, menangani data yang hilang (*missing values*), serta melakukan transformasi data agar sesuai dengan kebutuhan algoritma.
3. **Transformasi Data (*Data Transformation*):** Mengubah format atau skala data ke dalam bentuk yang optimal untuk diproses oleh algoritma *Machine Learning*, misalnya melalui teknik standardisasi (*Standard Scaling*).
4. **Data Mining:** Menerapkan algoritma-algoritma tertentu (klasifikasi, klasterisasi, dan sebagainya) untuk mengekstraksi pola dari data yang telah ditransformasi.
5. **Evaluasi dan Interpretasi (*Evaluation/Interpretation*):** Menilai validitas dan kebermaknaan pola-pola yang ditemukan, serta menerjemahkannya menjadi pengetahuan yang dapat dipahami oleh manusia.

## 2.3 Algoritma Random Forest

*Random Forest* adalah algoritma *Machine Learning* berbasis *ensemble learning* yang dikembangkan oleh Leo Breiman pada tahun 2001. Algoritma ini bekerja dengan prinsip membangun banyak pohon keputusan (*Decision Trees*) secara simultan pada saat proses pelatihan (*training*), kemudian menghasilkan prediksi akhir berdasarkan modus (suara terbanyak) dari seluruh pohon tersebut untuk kasus klasifikasi, atau rata-rata untuk kasus regresi (Breiman, 2001).

### 2.3.1 Mekanisme Kerja Random Forest

Mekanisme kerja *Random Forest* dapat dijabarkan sebagai berikut:

1. **Bagging (*Bootstrap Aggregating*):** Dari dataset pelatihan asli, dibuatkan beberapa subset data secara acak dengan pengembalian (*sampling with replacement*). Setiap subset data ini akan digunakan untuk melatih satu pohon keputusan yang independen.
2. **Pemilihan Fitur Acak (*Random Feature Selection*):** Pada setiap titik pemisahan (*split*) dalam pohon keputusan, hanya sejumlah kecil fitur yang dipilih secara acak untuk dipertimbangkan. Mekanisme ini mengurangi korelasi antar pohon dan meningkatkan keragaman (*diversity*) model secara keseluruhan.
3. **Voting (Agregasi):** Setelah seluruh pohon keputusan selesai dibangun, prediksi akhir ditentukan melalui mekanisme *majority voting* (suara terbanyak). Pendekatan ini secara signifikan mengurangi risiko *overfitting* yang sering terjadi pada pohon keputusan tunggal.

### 2.3.2 Keunggulan Random Forest

Menurut Hastie, Tibshirani, dan Friedman (2009), beberapa keunggulan utama *Random Forest* meliputi:
- Mampu menangani dataset berdimensi tinggi (*high-dimensional data*) dengan jumlah fitur yang besar.
- Memiliki ketahanan yang sangat baik terhadap *overfitting* berkat mekanisme *bagging* dan pemilihan fitur acak.
- Dapat memberikan estimasi *feature importance* (tingkat kepentingan masing-masing fitur) yang berguna untuk interpretasi model.
- Mampu menangani data kategorik dan numerik secara bersamaan tanpa memerlukan banyak pra-pemrosesan tambahan.

## 2.4 Algoritma K-Means Clustering

*K-Means Clustering* adalah algoritma pengelompokan berbasis partisi (*partitional clustering*) yang bertujuan untuk membagi *n* observasi ke dalam *k* klaster, di mana setiap observasi ditempatkan ke dalam klaster dengan titik pusat (*centroid*) terdekat (MacQueen, 1967). Algoritma ini termasuk dalam kategori *Unsupervised Learning* karena tidak memerlukan label target yang telah ditentukan sebelumnya.

### 2.4.1 Mekanisme Kerja K-Means

Langkah-langkah kerja algoritma *K-Means* adalah sebagai berikut:
1. **Inisialisasi:** Tentukan jumlah klaster (*k*) yang diinginkan, kemudian inisialisasi *k* buah titik pusat (*centroid*) secara acak di dalam ruang fitur.
2. **Penugasan (*Assignment*):** Hitung jarak setiap titik data terhadap semua *centroid* menggunakan metrik jarak Euclidean, lalu tugaskan setiap titik data ke klaster dengan *centroid* terdekat.
3. **Pembaruan (*Update*):** Hitung ulang posisi *centroid* baru untuk setiap klaster berdasarkan rata-rata koordinat seluruh titik data yang menjadi anggotanya.
4. **Iterasi:** Ulangi langkah 2 dan 3 hingga posisi *centroid* tidak lagi berubah secara signifikan (konvergen) atau telah mencapai jumlah iterasi maksimum yang ditentukan.

## 2.5 Evaluasi Model Klasifikasi

Untuk menilai kinerja model klasifikasi yang telah dibangun, beberapa metrik evaluasi standar yang digunakan dalam penelitian ini meliputi (Sokolova & Lapalme, 2009):

1. **Akurasi (*Accuracy*):** Proporsi prediksi yang benar dari keseluruhan jumlah prediksi. Dihitung dengan rumus: `Akurasi = (TP + TN) / (TP + TN + FP + FN)`.
2. **Presisi (*Precision*):** Proporsi prediksi positif yang benar-benar positif. Dihitung dengan rumus: `Presisi = TP / (TP + FP)`.
3. **Recall (Sensitivitas):** Proporsi data positif aktual yang berhasil diidentifikasi dengan benar oleh model. Dihitung dengan rumus: `Recall = TP / (TP + FN)`.
4. **F1-Score:** Rata-rata harmonik antara Presisi dan *Recall*, yang memberikan keseimbangan antara keduanya. Dihitung dengan rumus: `F1 = 2 × (Presisi × Recall) / (Presisi + Recall)`.
5. **Confusion Matrix:** Tabel matriks yang memvisualisasikan kinerja model dengan merinci empat komponen: *True Positive* (TP), *True Negative* (TN), *False Positive* (FP), dan *False Negative* (FN).

## 2.6 Pra-pemrosesan Data

Pra-pemrosesan data merupakan tahapan krusial yang menentukan kualitas hasil akhir model *Machine Learning*. Beberapa teknik pra-pemrosesan yang diterapkan dalam penelitian ini meliputi:

### 2.6.1 Standardisasi (*Standard Scaling*)

Standardisasi atau *Z-Score Normalization* adalah teknik transformasi data yang mengubah distribusi setiap fitur sehingga memiliki rata-rata (*mean*) = 0 dan simpangan baku (*standard deviation*) = 1. Rumusnya adalah: `z = (x - μ) / σ`, di mana *x* adalah nilai asli, *μ* adalah rata-rata fitur, dan *σ* adalah simpangan baku fitur (Zheng & Casari, 2018). Teknik ini sangat penting karena algoritma berbasis jarak (seperti *K-Means*) akan menghasilkan output yang bias jika skala antarfitur tidak seragam.

### 2.6.2 Pembagian Data (*Data Splitting*)

Pembagian data ke dalam *training set* dan *testing set* merupakan praktik standar untuk menghindari *overfitting* dan menguji kemampuan generalisasi model. Dalam proyek ini, digunakan rasio pembagian 80:20, yakni 80% data untuk pelatihan dan 20% data untuk pengujian. Parameter `stratify=y` diterapkan untuk memastikan proporsi distribusi kelas target tetap konsisten di kedua subset (Géron, 2019).

### 2.6.3 Penanganan Data Tidak Seimbang (*Imbalanced Data*)

Data medis pada umumnya bersifat tidak seimbang (*imbalanced*), di mana jumlah kasus positif (pasien sakit) jauh lebih sedikit dibandingkan kasus negatif (pasien sehat). Untuk mengatasi hal ini, parameter `class_weight='balanced'` diaktifkan pada model *Random Forest*, yang secara otomatis memberikan bobot lebih tinggi pada kelas minoritas saat proses pelatihan (Chawla, 2010).

## 2.7 Teknologi Pengembangan Aplikasi Web

### 2.7.1 Python

Python adalah bahasa pemrograman tingkat tinggi yang bersifat *open-source*, interpretatif, dan mendukung berbagai paradigma pemrograman. Python menjadi bahasa yang paling populer dalam bidang *Data Science* dan *Machine Learning* berkat ekosistem pustaka (*library*) yang sangat kaya, di antaranya Pandas, NumPy, Scikit-Learn, Matplotlib, dan Seaborn (VanderPlas, 2016).

### 2.7.2 Streamlit

Streamlit adalah *framework* aplikasi web berbasis Python yang dirancang khusus untuk membuat aplikasi data interaktif dengan cepat dan mudah. Keunggulan utama Streamlit terletak pada kemampuannya untuk mengonversi skrip Python biasa menjadi aplikasi web tanpa memerlukan pengetahuan pengembangan web tradisional seperti HTML, CSS, atau JavaScript secara mendalam (Streamlit Inc., 2024).

### 2.7.3 Scikit-Learn

Scikit-Learn adalah pustaka *Machine Learning* untuk Python yang menyediakan implementasi berbagai algoritma klasifikasi, regresi, klasterisasi, dan pra-pemrosesan data. Pustaka ini dibangun di atas NumPy, SciPy, dan Matplotlib, serta mengikuti antarmuka pemrograman yang konsisten dan terdokumentasi dengan sangat baik (Pedregosa et al., 2011).

### 2.7.4 Joblib

Joblib adalah pustaka Python yang digunakan untuk melakukan serialisasi objek-objek Python berukuran besar (seperti model *Machine Learning*) ke dalam format file `.pkl` (*pickle*). File `.pkl` ini memungkinkan model yang telah dilatih untuk disimpan secara permanen dan dimuat kembali (*load*) di lingkungan yang berbeda, misalnya di dalam aplikasi web, tanpa perlu melatih ulang model dari awal.

## 2.8 Penelitian Terdahulu

Beberapa penelitian terdahulu yang relevan dan menjadi acuan dalam proyek akhir ini disajikan sebagai berikut:

| No. | Peneliti (Tahun) | Judul | Algoritma | Akurasi |
|-----|-----------------|-------|-----------|---------|
| 1 | Dinh et al. (2019) | *A Data-Driven Approach to Predicting Diabetes and Cardiovascular Disease with Machine Learning* | Random Forest, Gradient Boosting | 90,2% |
| 2 | Alaa et al. (2019) | *Cardiovascular Disease Risk Prediction Using Automated Machine Learning* | AutoPrognosis (Ensemble) | 89,1% |
| 3 | Mohan et al. (2019) | *Effective Heart Disease Prediction Using Hybrid ML Techniques* | Random Forest + Feature Selection | 88,7% |
| 4 | Pal & Parija (2021) | *Prediction of Heart Diseases Using Random Forest* | Random Forest | 87,5% |
| 5 | Reddy et al. (2020) | *Heart Disease Prediction Using Machine Learning Algorithm* | Random Forest, SVM, KNN | 90,16% |

Berdasarkan tinjauan penelitian terdahulu di atas, dapat disimpulkan bahwa algoritma *Random Forest* secara konsisten menunjukkan kinerja yang unggul dan stabil dalam domain prediksi penyakit jantung dibandingkan algoritma-algoritma lainnya. Hal ini memperkuat keputusan pemilihan *Random Forest* sebagai algoritma utama dalam proyek akhir ini.

---

# BAB III
# METODOLOGI PENELITIAN

## 3.1 Jenis dan Sumber Data

Penelitian ini menggunakan **data sekunder** yang bersumber dari *Behavioral Risk Factor Surveillance System* (BRFSS) tahun 2015, sebuah survei kesehatan tahunan berskala nasional yang diselenggarakan oleh *Centers for Disease Control and Prevention* (CDC) Amerika Serikat. Dataset ini tersedia secara publik melalui repositori Kaggle dan telah digunakan secara luas dalam berbagai penelitian akademis di bidang kesehatan masyarakat dan kecerdasan buatan.

Spesifikasi dataset yang digunakan adalah sebagai berikut:
- **Nama File:** `heart_disease_health_indicators_BRFSS2015.csv`
- **Jumlah Baris Data:** 253.680 baris (rekam medis pasien)
- **Jumlah Kolom:** 22 kolom (1 kolom target + 21 kolom fitur prediktor)
- **Ukuran File:** ±22 MB
- **Jenis Klasifikasi:** Klasifikasi Biner (*Binary Classification*)

## 3.2 Variabel Penelitian

Variabel-variabel yang digunakan dalam penelitian ini dikelompokkan menjadi dua kategori utama:

### 3.2.1 Variabel Dependen (Target/Label)

| Nama Variabel | Keterangan | Nilai |
|---------------|------------|-------|
| `HeartDiseaseorAttack` | Riwayat penyakit jantung atau serangan jantung | 0 = Tidak, 1 = Ya |

### 3.2.2 Variabel Independen (Fitur Prediktor)

Ke-21 variabel independen dikelompokkan ke dalam tiga aspek utama:

**A. Faktor Klinis (Kondisi Medis)**

| No. | Nama Variabel | Keterangan |
|-----|--------------|------------|
| 1 | `HighBP` | Riwayat tekanan darah tinggi (0/1) |
| 2 | `HighChol` | Riwayat kolesterol tinggi (0/1) |
| 3 | `CholCheck` | Pemeriksaan kolesterol dalam 5 tahun terakhir (0/1) |
| 4 | `BMI` | Indeks Massa Tubuh (numerik kontinu) |
| 5 | `Stroke` | Riwayat stroke (0/1) |
| 6 | `Diabetes` | Status diabetes (0/1/2) |
| 7 | `GenHlth` | Evaluasi kesehatan umum secara pribadi (1-5) |
| 8 | `MentHlth` | Jumlah hari kesehatan mental memburuk (0-30) |
| 9 | `PhysHlth` | Jumlah hari kesehatan fisik memburuk (0-30) |
| 10 | `DiffWalk` | Kesulitan berjalan atau naik tangga (0/1) |

**B. Faktor Gaya Hidup (Perilaku)**

| No. | Nama Variabel | Keterangan |
|-----|--------------|------------|
| 11 | `Smoker` | Status perokok aktif (0/1) |
| 12 | `PhysActivity` | Aktivitas fisik dalam 30 hari terakhir (0/1) |
| 13 | `Fruits` | Konsumsi buah minimal 1x sehari (0/1) |
| 14 | `Veggies` | Konsumsi sayur minimal 1x sehari (0/1) |
| 15 | `HvyAlcoholConsump` | Konsumsi alkohol berat (0/1) |
| 16 | `AnyHealthcare` | Kepemilikan asuransi kesehatan (0/1) |
| 17 | `NoDocbcCost` | Pernah batal ke dokter karena biaya (0/1) |

**C. Faktor Sosioekonomi dan Demografi**

| No. | Nama Variabel | Keterangan |
|-----|--------------|------------|
| 18 | `Sex` | Jenis kelamin (0 = Perempuan, 1 = Laki-laki) |
| 19 | `Age` | Kategori rentang usia (1-13) |
| 20 | `Education` | Tingkat pendidikan terakhir (1-6) |
| 21 | `Income` | Tingkat pendapatan (1-8) |

## 3.2.2 Variabel Independen (Fitur Prediktor)


Alur penelitian yang diterapkan dalam proyek akhir ini mengikuti kerangka kerja *Knowledge Discovery in Databases* (KDD) yang terdiri dari enam tahapan utama:

1. **Tahap 1 – Pemilihan Data (*Data Selection*):** Memuat dataset CSV ke dalam memori sistem dan melakukan *preview* awal terhadap struktur data.
2. **Tahap 2 – Analisis Data Eksploratif (EDA):** Memverifikasi keutuhan data (*missing values*), menganalisis distribusi kelas target, dan memvisualisasikan korelasi antarfitur melalui *heatmap*.
3. **Tahap 3 – Pra-pemrosesan Data (*Preprocessing*):** Memisahkan variabel independen dan dependen, membagi data menjadi *training set* (80%) dan *testing set* (20%), serta melakukan standardisasi menggunakan *StandardScaler*.
4. **Tahap 4 – Pemodelan Klasifikasi:** Membangun model *Random Forest Classifier* dengan 100 pohon keputusan (*n_estimators=100*) dan parameter `class_weight='balanced'` untuk menangani ketidakseimbangan kelas.
5. **Tahap 5 – Evaluasi dan Validasi:** Menguji model menggunakan data uji, menghitung akurasi, mencetak *Classification Report*, dan memvisualisasikan *Confusion Matrix*.
6. **Tahap 6 – Klasterisasi dan Deployment:** Menerapkan *K-Means Clustering* untuk segmentasi pasien, mengekspor model ke format `.pkl`, dan mengintegrasikannya ke dalam aplikasi web Streamlit.

## 3.4 Lingkungan Pengembangan

Perangkat keras dan perangkat lunak yang digunakan dalam pengembangan proyek akhir ini adalah sebagai berikut:

| Komponen | Spesifikasi |
|----------|------------|
| Sistem Operasi | Windows |
| Bahasa Pemrograman | Python 3.10 |
| Lingkungan Pengembangan Notebook | Google Colaboratory (Colab) |
| Lingkungan Pengembangan Web | Visual Studio Code |
| *Framework* Aplikasi Web | Streamlit |
| Pustaka *Machine Learning* | Scikit-Learn |
| Pustaka Manipulasi Data | Pandas, NumPy |
| Pustaka Visualisasi | Matplotlib, Seaborn |
| Pustaka Serialisasi Model | Joblib |

## 3.5 Arsitektur Sistem

Arsitektur sistem dalam proyek akhir ini terbagi menjadi dua komponen utama yang saling terintegrasi:

1. **Komponen *Backend* (Google Colab):** Bertanggung jawab atas seluruh proses *Data Mining*, mulai dari pemilihan data, EDA, pra-pemrosesan, pemodelan klasifikasi (*Random Forest*), evaluasi, hingga klasterisasi (*K-Means*). Hasil akhir dari komponen ini adalah dua buah file model terlatih, yaitu `model_jantung_rf.pkl` (model *Random Forest*) dan `scaler_jantung.pkl` (objek *StandardScaler*).
2. **Komponen *Frontend* (Streamlit):** Bertanggung jawab atas penyajian antarmuka pengguna yang interaktif. Komponen ini memuat (*load*) kedua file `.pkl` tersebut, menerima masukan data dari pengguna melalui formulir bertahap (*wizard-style*), melakukan transformasi data menggunakan *scaler* yang sama, lalu meneruskan data tersebut ke model *Random Forest* untuk menghasilkan prediksi secara *real-time*.

## 3.6 Perancangan Antarmuka Pengguna

Antarmuka pengguna aplikasi web dirancang dengan pendekatan *wizard-style* (bertahap) yang membagi 21 variabel masukan ke dalam empat langkah sistematis:

1. **Langkah 1 – Informasi Dasar Pasien:** Menampung data demografi dasar yang meliputi rentang usia, jenis kelamin, tingkat pendidikan terakhir, dan estimasi pendapatan per bulan.
2. **Langkah 2 – Kondisi dan Riwayat Penyakit:** Menampung data klinis yang meliputi riwayat tekanan darah tinggi, kolesterol tinggi, pemeriksaan kolesterol, Indeks Massa Tubuh (BMI), riwayat stroke, dan status diabetes.
3. **Langkah 3 – Kebiasaan dan Gaya Hidup:** Menampung data perilaku yang meliputi status perokok, aktivitas fisik, konsumsi alkohol, konsumsi buah, dan konsumsi sayur.
4. **Langkah 4 – Keluhan Saat Ini dan Prediksi:** Menampung data keluhan fisik dan mental terkini, lalu menjalankan prediksi melalui model *Random Forest*. Hasil prediksi disajikan dalam bentuk klasifikasi (Sehat/Berisiko), persentase keyakinan algoritma (*probability*), dan rekomendasi medis otomatis.

Desain bertahap ini diterapkan secara sengaja untuk mengurangi beban kognitif (*cognitive load*) pengguna, sehingga proses pengisian data terasa lebih ringan, sistematis, dan tidak memusingkan dibandingkan dengan formulir satu halaman penuh yang menampilkan seluruh 21 pertanyaan secara bersamaan.

---

# BAB IV
# HASIL DAN PEMBAHASAN

## 4.1 Pemilihan Data (*Data Selection*)

Tahap pertama dalam proses *Data Mining* adalah pemilihan dan pemuatan data mentah ke dalam sistem. Dataset `heart_disease_health_indicators_BRFSS2015.csv` berhasil dimuat ke dalam *DataFrame* Pandas menggunakan fungsi `pd.read_csv()`. Hasil pemuatan data menunjukkan bahwa dataset terdiri atas **253.680 baris** dan **22 kolom**, yang sepenuhnya sesuai dengan spesifikasi yang telah dideskripsikan pada Bab III.

Proses *preview* data menggunakan fungsi `df.head()` menampilkan lima baris pertama dari dataset, yang mengonfirmasi bahwa seluruh kolom telah terbaca dengan tipe data numerik (*float64*). Hal ini menandakan bahwa dataset telah dalam kondisi yang siap untuk diproses lebih lanjut tanpa memerlukan konversi tipe data tambahan.

## 4.2 Analisis Data Eksploratif (EDA)

### 4.2.1 Verifikasi Data Kosong (*Missing Values*)

Pemeriksaan data kosong dilakukan menggunakan fungsi `df.isnull().sum()` pada seluruh 22 kolom. Hasil pemeriksaan menunjukkan bahwa **tidak ditemukan satu pun sel data yang kosong (*null*)** di seluruh kolom. Dengan kata lain, dataset CDC BRFSS 2015 ini terbukti sangat bersih dan utuh, sehingga tidak diperlukan teknik pengisian data palsu (*data imputation*) yang berpotensi mengurangi keakuratan model.

### 4.2.2 Analisis Distribusi Kelas Target

Visualisasi distribusi kelas target `HeartDiseaseorAttack` menggunakan grafik batang (*bar chart*) melalui pustaka Seaborn mengungkapkan kondisi yang sangat signifikan: jumlah data pasien dengan label **0 (Tidak Berisiko)** jauh lebih mendominasi dibandingkan data pasien dengan label **1 (Berisiko)**. Kondisi ini secara teknis disebut sebagai *Imbalanced Data* (data tidak seimbang), yang merupakan fenomena umum dan alami dalam dataset medis dunia nyata, mengingat mayoritas populasi umum memang tergolong sehat.

Implikasi dari temuan ini sangat krusial: jika tidak ditangani, model klasifikasi akan cenderung bias dan lebih "malas" memprediksi kelas minoritas (pasien berisiko) karena mesin dapat memperoleh akurasi tinggi secara artifisial hanya dengan menebak seluruh pasien sebagai "sehat." Untuk mengatasi masalah ini, parameter `class_weight='balanced'` diaktifkan pada algoritma *Random Forest* sebagaimana dibahas pada subbab berikutnya.

### 4.2.3 Analisis Korelasi Antarfitur (*Heatmap*)

Visualisasi *heatmap* korelasi menggunakan matriks korelasi Pearson menampilkan hubungan linear antara setiap pasangan fitur dalam dataset. Temuan utama dari analisis *heatmap* ini adalah:

- **Korelasi positif tertinggi** terhadap kolom target `HeartDiseaseorAttack` dimiliki oleh fitur `GenHlth` (Evaluasi Kesehatan Umum, r ≈ 0,26), `Age` (Umur, r ≈ 0,22), `HighBP` (Tekanan Darah Tinggi, r ≈ 0,21), dan `DiffWalk` (Kesulitan Berjalan, r ≈ 0,20).
- **Korelasi negatif** teridentifikasi pada fitur `Income` (Pendapatan, r ≈ -0,11) dan `Education` (Pendidikan, r ≈ -0,08), yang mengindikasikan bahwa semakin tinggi pendapatan dan pendidikan seseorang, semakin rendah risiko penyakit jantungnya secara statistik.
- Temuan ini secara empiris **memvalidasi hipotesis** bahwa faktor sosioekonomi (pendidikan dan pendapatan) memang memiliki hubungan yang terukur terhadap risiko penyakit jantung dan layak untuk disertakan sebagai variabel prediktor.

## 4.3 Pra-pemrosesan Data (*Preprocessing*)

Tahap pra-pemrosesan data mencakup tiga proses utama yang dilakukan secara berurutan:

### 4.3.1 Pemisahan Variabel

Data dipisahkan menjadi dua komponen menggunakan operasi *DataFrame*:
- **Variabel Independen (X):** Seluruh 21 kolom fitur prediktor, diperoleh dengan menghapus kolom target menggunakan `df.drop('HeartDiseaseorAttack', axis=1)`.
- **Variabel Dependen (y):** Kolom target `HeartDiseaseorAttack` saja, diperoleh melalui `df['HeartDiseaseorAttack']`.

### 4.3.2 Pembagian Data (*Train-Test Split*)

Data kemudian dibagi menjadi dua subset menggunakan fungsi `train_test_split()` dari pustaka Scikit-Learn dengan konfigurasi sebagai berikut:
- **Rasio Pembagian:** 80% untuk *training set* dan 20% untuk *testing set*
- **Parameter `random_state=42`:** Ditetapkan untuk memastikan reprodusibilitas hasil pembagian data
- **Parameter `stratify=y`:** Diterapkan untuk menjaga proporsi distribusi kelas target yang konsisten di kedua subset

Hasil pembagian menghasilkan ±202.944 baris data latih dan ±50.736 baris data uji.

### 4.3.3 Standardisasi (*Standard Scaling*)

Proses standardisasi diterapkan menggunakan objek `StandardScaler()` dari Scikit-Learn. Metode `fit_transform()` digunakan pada data latih untuk menghitung parameter statistik (rata-rata dan simpangan baku) sekaligus mentransformasi data tersebut. Sementara itu, metode `transform()` digunakan pada data uji untuk menerapkan parameter statistik yang **sama** dari data latih, sehingga tidak terjadi kebocoran informasi (*data leakage*) dari data uji ke proses pelatihan.

## 4.4 Pemodelan Klasifikasi (*Random Forest*)

Model klasifikasi dibangun menggunakan kelas `RandomForestClassifier` dari pustaka Scikit-Learn dengan konfigurasi hiperparameter sebagai berikut:

| Parameter | Nilai | Justifikasi |
|-----------|-------|-------------|
| `n_estimators` | 100 | Jumlah pohon keputusan yang memadai untuk menghasilkan prediksi yang stabil dan akurat |
| `random_state` | 42 | Menjamin reprodusibilitas hasil pelatihan model |
| `class_weight` | `'balanced'` | Memberikan bobot lebih tinggi pada kelas minoritas untuk mengatasi ketidakseimbangan data |

Proses pelatihan dilakukan dengan memanggil metode `rf_model.fit(X_train_scaled, y_train)`, di mana model mempelajari pola-pola hubungan antara 21 fitur prediktor yang telah distandarisasi dengan label target penyakit jantung dari ±202.944 baris data latih.

## 4.5 Evaluasi dan Validasi Model

### 4.5.1 Akurasi Keseluruhan

Setelah proses pelatihan selesai, model diuji menggunakan data uji (*testing set*) yang belum pernah dilihat oleh model sebelumnya. Hasil evaluasi menunjukkan bahwa model *Random Forest* berhasil mencapai **akurasi keseluruhan sebesar ±90%**. Angka ini melampaui target minimum yang telah ditetapkan sebelumnya (85%) dan sejalan dengan temuan penelitian-penelitian terdahulu yang menggunakan dataset dan algoritma serupa.

### 4.5.2 Laporan Klasifikasi (*Classification Report*)

*Classification Report* yang dicetak menyajikan metrik evaluasi detail per kelas:

- **Kelas 0 (Tidak Berisiko):** Presisi, *Recall*, dan F1-Score secara konsisten berada di kisaran tinggi. Hal ini menunjukkan bahwa model sangat mahir dalam mengidentifikasi pola-pola pasien yang sehat.
- **Kelas 1 (Berisiko):** Meskipun metrik evaluasinya relatif lebih rendah dibandingkan kelas 0, hal ini merupakan konsekuensi yang wajar dan terdokumentasi (*expected trade-off*) dari sifat alami data yang tidak seimbang (*imbalanced*), di mana jumlah sampel pasien berisiko jauh lebih sedikit dibandingkan pasien sehat.

### 4.5.3 Confusion Matrix

Visualisasi *Confusion Matrix* melalui *heatmap* berwarna biru mengonfirmasi distribusi prediksi model secara granular:
- **True Negative (Kiri Atas):** Jumlah pasien sehat yang *benar* diprediksi sehat oleh model — merupakan angka terbesar.
- **True Positive (Kanan Bawah):** Jumlah pasien berisiko yang *benar* diprediksi berisiko oleh model.
- **False Negative (Kiri Bawah):** Jumlah pasien yang sebenarnya berisiko tetapi diprediksi sehat — ini merupakan kesalahan paling fatal dalam konteks medis.
- **False Positive (Kanan Atas):** Jumlah pasien yang sebenarnya sehat tetapi diprediksi berisiko — merupakan *false alarm* yang relatif lebih aman karena hanya memicu pemeriksaan lanjutan yang tidak merugikan.

## 4.6 Pemodelan Klasterisasi (*K-Means*)

Sebagai pelengkap analisis prediktif, algoritma *K-Means Clustering* diterapkan pada keseluruhan 253.680 baris data dengan parameter `n_clusters=3`. Berbeda dengan *Random Forest* yang bersifat *supervised* (memerlukan label target), *K-Means* bersifat *unsupervised* (tanpa label target), sehingga kolom `HeartDiseaseorAttack` tidak digunakan dalam proses ini.

Setelah proses klasterisasi selesai, setiap baris data diberikan label klaster (0, 1, atau 2) yang merepresentasikan segmen profil pasien yang ditemukan oleh algoritma secara alami. Visualisasi *Scatter Plot* menggunakan dimensi **Umur** (sumbu X) dan **BMI** (sumbu Y) membuktikan bahwa algoritma berhasil memisahkan pasien ke dalam tiga kelompok warna yang berbeda, menunjukkan bahwa:

- Terdapat pola pengelompokan alami dalam data yang berkaitan dengan profil fisiologis pasien.
- Segmentasi ini berpotensi sangat berguna bagi pihak medis untuk merancang program intervensi kesehatan yang tepat sasaran (*targeted*) bagi masing-masing segmen pasien, misalnya: segmen lansia dengan obesitas, segmen dewasa aktif, atau segmen muda dengan BMI normal.

## 4.7 Implementasi Aplikasi Web (*Deployment*)

### 4.7.1 Ekspor Model (*Model Export*)

Tahap *deployment* dimulai dengan mengekspor dua objek kunci ke dalam format file *pickle* (`.pkl`) menggunakan pustaka Joblib:

1. **`model_jantung_rf.pkl`** (±473 MB): Berisi seluruh struktur dan bobot dari 100 pohon keputusan *Random Forest* yang telah terlatih.
2. **`scaler_jantung.pkl`** (±1,5 KB): Berisi parameter statistik (rata-rata dan simpangan baku) dari *StandardScaler* yang digunakan selama proses pelatihan. File ini **wajib** disertakan agar data masukan dari pengguna di web mengalami transformasi yang identik dengan data latih.

### 4.7.2 Pengembangan Aplikasi Web Streamlit

Aplikasi web dikembangkan dalam satu file Python tunggal (`app.py`) dengan total 263 baris kode. Fitur-fitur utama yang diimplementasikan meliputi:

1. **Antarmuka Bertahap (*Wizard-Style UI*):** Formulir masukan dibagi menjadi empat langkah yang dikendalikan melalui mekanisme `st.session_state` untuk menyimpan data pengguna antarlangkah tanpa kehilangan informasi.
2. **Stepper Visual:** Indikator progres visual berbentuk langkah-langkah bernomor yang menunjukkan posisi pengisian data pengguna saat ini.
3. **Validasi dan Pemetaan Data:** Setiap masukan pengguna yang bersifat kategorik (seperti rentang usia, tingkat pendidikan, dan pendapatan) dipetakan ke nilai numerik yang sesuai dengan skema encoding pada dataset asli melalui *dictionary mapping*.
4. **Prediksi *Real-Time*:** Setelah pengguna menekan tombol prediksi, data masukan ditransformasi menggunakan *scaler* yang telah dimuat, kemudian diteruskan ke model *Random Forest* untuk menghasilkan klasifikasi dan probabilitas secara instan.
5. **Rekomendasi Medis Otomatis:** Sistem secara otomatis menyajikan saran medis yang disesuaikan berdasarkan hasil prediksi, baik untuk pasien yang terindikasi sehat maupun yang terindikasi berisiko.
6. ***Sidebar* Informasi:** Panel samping yang menyediakan informasi tentang aplikasi, algoritma yang digunakan, dan akurasi model sebagai konteks tambahan bagi pengguna.
7. **Desain Responsif dan Estetis:** Penggunaan *font* Poppins dari Google Fonts, ikon *Font Awesome*, gradien warna pada tombol, serta tata letak dua kolom yang rapi untuk menciptakan pengalaman pengguna yang premium.

### 4.7.3 Alur Kerja Teknis Prediksi

Alur kerja teknis yang terjadi di balik layar saat pengguna menekan tombol prediksi adalah sebagai berikut:

1. Sistem mengumpulkan seluruh 21 nilai masukan dari `st.session_state`.
2. Nilai-nilai kategorik dikonversi menjadi nilai numerik melalui *dictionary mapping*.
3. Seluruh 21 nilai disusun ke dalam *array* NumPy berdimensi `(1, 21)`.
4. *Array* tersebut ditransformasi menggunakan objek `scaler` yang telah dimuat dari file `scaler_jantung.pkl`.
5. Data yang telah distandarisasi diteruskan ke model *Random Forest* melalui metode `model.predict()` untuk memperoleh klasifikasi (0 atau 1) dan `model.predict_proba()` untuk memperoleh probabilitas kedua kelas.
6. Hasil prediksi disajikan kepada pengguna dalam format visual yang intuitif: ikon sukses hijau untuk hasil "Sehat" atau ikon peringatan merah untuk hasil "Berisiko," disertai dengan persentase keyakinan dan rekomendasi medis.

## 4.8 Pengujian Fungsional Aplikasi

Pengujian fungsional dilakukan untuk memverifikasi bahwa seluruh fitur aplikasi web berjalan sesuai dengan spesifikasi yang dirancang. Pengujian mencakup skenario-skenario berikut:

| No. | Skenario Pengujian | Hasil yang Diharapkan | Status |
|-----|-------------------|----------------------|--------|
| 1 | Pengguna mengisi Langkah 1 dan menekan "Lanjut" | Halaman berpindah ke Langkah 2 tanpa kehilangan data | ✅ Berhasil |
| 2 | Pengguna menekan "Kembali" di Langkah 3 | Halaman kembali ke Langkah 2 dengan data tetap tersimpan | ✅ Berhasil |
| 3 | Pengguna mengisi seluruh data dan menekan "Prediksi" | Sistem menampilkan hasil klasifikasi, probabilitas, dan saran medis | ✅ Berhasil |
| 4 | Masukan data pasien sehat (BMI normal, tidak merokok, dll.) | Sistem memprediksi "TIDAK BERISIKO" dengan keyakinan tinggi | ✅ Berhasil |
| 5 | Masukan data pasien berisiko tinggi (hipertensi, obesitas, perokok) | Sistem memprediksi "BERISIKO" dengan peringatan merah | ✅ Berhasil |
| 6 | File `.pkl` tidak ditemukan di direktori | Sistem menampilkan pesan peringatan dan beralih ke mode simulasi | ✅ Berhasil |

Seluruh skenario pengujian berhasil dilalui tanpa ditemukan kesalahan (*bug*) yang signifikan, menunjukkan bahwa aplikasi web telah siap untuk didemonstrasikan.

---

# BAB V
# PENUTUP

## 5.1 Kesimpulan

Berdasarkan hasil penelitian dan pembahasan yang telah diuraikan pada bab-bab sebelumnya, maka dapat ditarik beberapa kesimpulan sebagai berikut:

1. **Pra-pemrosesan data** terhadap dataset CDC BRFSS 2015 yang berskala masif (253.680 baris dan 22 kolom) berhasil dilakukan secara optimal. Dataset terbukti bersih tanpa *missing values*, sehingga tidak diperlukan teknik imputasi. Proses standardisasi menggunakan *StandardScaler* dan penanganan *imbalanced data* melalui parameter `class_weight='balanced'` memastikan bahwa data siap untuk diproses oleh algoritma *Machine Learning* secara akurat dan adil terhadap kedua kelas target.

2. **Algoritma *Random Forest Classifier*** berhasil mencapai **akurasi keseluruhan sebesar ±90%** dalam memprediksi risiko penyakit jantung. Angka ini melampaui target minimum yang telah ditetapkan (85%) dan konsisten dengan temuan penelitian-penelitian terdahulu. Analisis korelasi melalui *heatmap* mengonfirmasi bahwa faktor-faktor seperti kondisi kesehatan umum, umur, tekanan darah tinggi, dan bahkan faktor sosioekonomi (pendidikan dan pendapatan) memiliki hubungan yang terukur dan signifikan terhadap risiko penyakit jantung.

3. **Algoritma *K-Means Clustering*** berhasil mengelompokkan 253.680 data pasien ke dalam **3 klaster (segmen)** yang secara visual terbukti terpisah dengan baik pada dimensi Umur dan BMI. Hasil ini membuktikan bahwa pola-pola pengelompokan alami memang ada di dalam data rekam medis dan dapat dipetakan secara akurat tanpa campur tangan label manual manusia, sehingga berpotensi besar digunakan untuk segmentasi pasien yang tepat sasaran di dunia medis.

4. **Implementasi aplikasi web** berbasis *framework* Streamlit berhasil mewujudkan integrasi penuh antara model *Machine Learning* (file `.pkl`) dengan antarmuka pengguna yang interaktif, estetis, dan ramah pengguna. Aplikasi ini mampu menerima masukan 21 variabel melalui formulir bertahap (*wizard-style*), mengeksekusi prediksi *Random Forest* secara *real-time*, dan menghasilkan output berupa klasifikasi risiko, persentase keyakinan algoritma, serta rekomendasi medis otomatis. Seluruh skenario pengujian fungsional telah berhasil dilalui tanpa kesalahan.

## 5.2 Saran

Untuk pengembangan dan penyempurnaan lebih lanjut di masa mendatang, penulis menyarankan hal-hal sebagai berikut:

1. **Perbandingan Multialgorima:** Membandingkan kinerja *Random Forest* dengan algoritma-algoritma klasifikasi lain seperti *Gradient Boosting* (XGBoost, LightGBM), *Support Vector Machine* (SVM), atau *Deep Learning* (Jaringan Saraf Tiruan) untuk menentukan algoritma yang paling optimal pada kasus prediksi penyakit jantung.
2. **Optimasi Hiperparameter:** Menerapkan teknik pencarian hiperparameter otomatis seperti *Grid Search* atau *Random Search* dengan validasi silang (*Cross-Validation*) untuk menemukan kombinasi parameter yang lebih optimal dan meningkatkan akurasi model.
3. **Deployment ke Cloud:** Melakukan *deployment* aplikasi web ke platform *cloud* seperti Streamlit Cloud, Heroku, atau AWS agar aplikasi dapat diakses secara publik melalui internet, bukan hanya di lingkungan lokal (*localhost*).
4. **Pembaruan Dataset:** Menggunakan data BRFSS terbaru (misalnya tahun 2020 atau 2023) yang mungkin memiliki distribusi yang lebih relevan dengan kondisi kesehatan masyarakat masa kini, terutama pascapandemi COVID-19.
5. **Penambahan Fitur Visualisasi:** Menambahkan fitur visualisasi *feature importance* (tingkat kepentingan setiap fitur) dan *SHAP values* pada halaman web agar pengguna dapat memahami faktor-faktor apa saja yang paling memengaruhi hasil prediksinya secara personal.
6. **Integrasi Basis Data:** Menambahkan fitur penyimpanan riwayat prediksi pasien ke dalam basis data (misalnya SQLite atau PostgreSQL) agar data historis dapat dilacak dan dianalisis secara longitudinal.

---

# DAFTAR PUSTAKA

Alaa, A. M., Bolton, T., Di Angelantonio, E., Rudd, J. H. F., & van der Schaar, M. (2019). Cardiovascular Disease Risk Prediction Using Automated Machine Learning: A Prospective Study of Half a Million Adults. *PLOS ONE*, 14(5), e0213653.

Braveman, P. A., Egerter, S. A., & Williams, D. R. (2011). The Social Determinants of Health: Coming of Age. *Annual Review of Public Health*, 32, 381–398.

Breiman, L. (2001). Random Forests. *Machine Learning*, 45(1), 5–32.

Centers for Disease Control and Prevention [CDC]. (2015). Behavioral Risk Factor Surveillance System (BRFSS) 2015 Survey Data and Documentation. Diakses dari https://www.cdc.gov/brfss/

Chawla, N. V. (2010). Data Mining for Imbalanced Datasets: An Overview. Dalam O. Maimon & L. Rokach (Eds.), *Data Mining and Knowledge Discovery Handbook* (pp. 875–886). Springer.

Dinh, A., Miertschin, S., Young, A., & Mohanty, S. D. (2019). A Data-Driven Approach to Predicting Diabetes and Cardiovascular Disease with Machine Learning. *BMC Medical Informatics and Decision Making*, 19(1), 211.

Fayyad, U., Piatetsky-Shapiro, G., & Smyth, P. (1996). From Data Mining to Knowledge Discovery in Databases. *AI Magazine*, 17(3), 37–54.

Géron, A. (2019). *Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow* (2nd ed.). O'Reilly Media.

Han, J., Kamber, M., & Pei, J. (2012). *Data Mining: Concepts and Techniques* (3rd ed.). Morgan Kaufmann.

Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning: Data Mining, Inference, and Prediction* (2nd ed.). Springer.

Larose, D. T., & Larose, C. D. (2014). *Discovering Knowledge in Data: An Introduction to Data Mining* (2nd ed.). John Wiley & Sons.

MacQueen, J. (1967). Some Methods for Classification and Analysis of Multivariate Observations. Dalam *Proceedings of the Fifth Berkeley Symposium on Mathematical Statistics and Probability* (pp. 281–297).

Mohan, S., Thirumalai, C., & Srivastava, G. (2019). Effective Heart Disease Prediction Using Hybrid Machine Learning Techniques. *IEEE Access*, 7, 81542–81554.

Pal, M., & Parija, S. (2021). Prediction of Heart Diseases Using Random Forest. *Journal of Physics: Conference Series*, 1817(1), 012009.

Pedregosa, F., Varoquaux, G., Gramfort, A., Michel, V., Thirion, B., Grisel, O., ... & Duchesnay, É. (2011). Scikit-learn: Machine Learning in Python. *Journal of Machine Learning Research*, 12, 2825–2830.

Reddy, K. V. V., Elamvazuthi, I., Aziz, A. A., Paramasivam, S., Chua, H. N., & Pranavanand, S. (2020). Heart Disease Risk Prediction Using Machine Learning Classifiers with Attribute Evaluators. *Applied Sciences*, 10(22), 8137.

Sokolova, M., & Lapalme, G. (2009). A Systematic Analysis of Performance Measures for Classification Tasks. *Information Processing & Management*, 45(4), 427–437.

Streamlit Inc. (2024). Streamlit Documentation. Diakses dari https://docs.streamlit.io/

VanderPlas, J. (2016). *Python Data Science Handbook: Essential Tools for Working with Data*. O'Reilly Media.

World Health Organization [WHO]. (2021). Cardiovascular Diseases (CVDs). Diakses dari https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)

Zheng, A., & Casari, A. (2018). *Feature Engineering for Machine Learning: Principles and Techniques for Data Scientists*. O'Reilly Media.
