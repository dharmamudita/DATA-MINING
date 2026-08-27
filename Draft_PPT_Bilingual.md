# Draf Presentasi PPT (Bilingual - English & Indonesia)

*Dokumen ini berisi draf teks untuk slide PPT Anda dalam dua bahasa. Pengisian dokumen ini dilakukan secara bertahap (per slide) sesuai permintaan Anda.*

---

## Slide 1: Judul Utama (Title Slide)
*Gunakan teks ini untuk halaman sampul/depan presentasi Anda.*

**🇬🇧 English:**
> **Predicting Heart Disease Risk Based on Lifestyle Using Random Forest and K-Means Clustering Algorithms**

**🇮🇩 Indonesia:**
> **Prediksi Risiko Penyakit Jantung Berdasarkan Gaya Hidup Menggunakan Algoritma Random Forest dan K-Means Clustering**

---

## Slide 2: Latar Belakang (Background)
*Gunakan teks ini untuk menggantikan kotak "Lorem ipsum" di slide Latar Belakang (Teks ini panjangnya sudah disesuaikan agar pas di kotak Canva).*

**🇬🇧 English:**
> Heart disease is a leading cause of death that often shows no early clinical symptoms. This project implements Data Mining techniques using a massive dataset (over 250,000 medical records) from the US CDC to predict this disease risk early. Unlike conventional systems, this analysis innovatively integrates Socio-Economic factors (Income and Education) which are medically proven to significantly influence a patient's lifestyle, nutritional quality, and daily stress levels.

**🇮🇩 Indonesia:**
> Penyakit jantung merupakan penyebab kematian utama yang seringkali tidak menunjukkan gejala klinis pada tahap awal. Proyek ini mengimplementasikan teknik Data Mining menggunakan dataset berskala masif (lebih dari 250.000 rekam medis) dari CDC Amerika Serikat untuk memprediksi risiko penyakit tersebut secara dini. Berbeda dengan sistem konvensional, analisis ini secara inovatif mengintegrasikan faktor Sosio-Ekonomi (Gaji dan Pendidikan) yang secara medis terbukti memengaruhi gaya hidup, kualitas gizi, dan tingkat stres harian pasien.

---

## Slide 3: Rumusan Masalah (Problem Formulation)
*Gunakan teks ini untuk slide Rumusan Masalah berbentuk paragraf.*

**🇬🇧 English:**
> Based on this background, this research formulates three main problems to be solved using a Data Mining approach. First, how to effectively pre-process 250 thousand large-scale medical records so they are ready for machine learning. Second, how to measure the accuracy of the Random Forest classification algorithm in predicting heart disease risk. Third, how to automatically map patient segmentation using the K-Means clustering algorithm based on their profile and lifestyle dimensions.

**🇮🇩 Indonesia:**
> Berdasarkan latar belakang tersebut, penelitian ini merumuskan tiga masalah utama yang harus diselesaikan melalui pendekatan Data Mining. Pertama, bagaimana melakukan pra-pemrosesan (cleaning) terhadap 250 ribu rekam medis berskala besar agar siap dipelajari oleh mesin. Kedua, bagaimana mengukur tingkat akurasi algoritma klasifikasi Random Forest dalam memprediksi risiko penyakit jantung secara akurat. Ketiga, bagaimana cara memetakan segmentasi pasien secara otomatis menggunakan algoritma klasterisasi K-Means berdasarkan dimensi profil dan gaya hidup mereka.

---
## Slide 4: DATA SELECTION (Memasukkan Data)
*Ganti tulisan "Menguji Hipotesis Untuk Penelitian" dengan teks di bawah ini:*
**Sub-judul:** Importing Libraries and Raw Dataset

**🇬🇧 English (Teks Paragraf untuk dimasukkan ke slide Canva):**
> This phase initiates the Data Mining process by importing essential libraries such as Pandas and Scikit-Learn. Subsequently, the system loads the raw dataset, specifically the BRFSS 2015 records from the CDC, containing over 250,000 instances. This massive dataset is securely imported into the Google Colab environment as a DataFrame, ready for complex medical pattern extraction.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Pada tahap pertama Data Selection, saya mengimpor library utama dan memuat data mentah CDC ke dalam memori. Bisa dilihat pada kode di layar, sistem berhasil membaca 250 ribu baris rekam medis dengan 21 fitur prediktor. Data ini siap untuk dieksplorasi lebih lanjut."

---

## Slide 5: EXPLORATORY DATA ANALYSIS (EDA)
*Pasang screenshot Colab bagian pengecekan data kosong (df.isnull) di slide ini.*
**Sub-judul:** Data Integrity and Missing Values Check

**🇬🇧 English (Teks Paragraf untuk dimasukkan ke slide Canva):**
> Following the data import, an Exploratory Data Analysis (EDA) is conducted to verify the dataset's completeness. Using programmatic checks, the system scans all 250,000+ records for any missing or null values. The output confirms that the CDC dataset is exceptionally clean with zero missing data across all 21 features, eliminating the need for complex data imputation and ensuring the absolute integrity of the predictive modeling.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Tahap selanjutnya adalah proses EDA. Di sini saya memprogram sistem untuk memindai apakah ada rekam medis pasien yang kosong atau hilang. Berdasarkan hasil output di layar, dataset dari CDC ini terbukti sangat bersih dengan 'nol' data kosong. Artinya, keseluruhan 250 ribu data tersebut utuh dan kita bisa langsung memprosesnya tanpa khawatir mesin akan *error* akibat data cacat."

## Slide 6: TARGET DISTRIBUTION (Grafik Kelas Target)
*Pasang screenshot Colab bagian 1.2 (Grafik Batang Imbalanced Data) di slide ini.*
**Judul Besar Slide Canva:** TARGET DISTRIBUTION
**Sub-judul:** Visualizing Class Imbalance

**🇬🇧 English (Teks Paragraf untuk dimasukkan ke slide Canva):**
> A critical phase of the Exploratory Data Analysis involves visualizing the target class distribution using a bar chart. This reveals a significant class imbalance within the dataset, where healthy respondents drastically outnumber those diagnosed with heart disease. Identifying this imbalance early is crucial, as it dictates the necessity for specialized weighted algorithms during the machine learning phase to prevent predictive bias toward the majority class.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Selanjutnya, saya memvisualisasikan data target pasien menggunakan grafik batang. Seperti yang terlihat, terdapat ketidakseimbangan kelas (*imbalanced data*) yang sangat drastis; jumlah orang sehat jauh melebihi orang yang terkena penyakit jantung. Menemukan fakta ini di awal sangatlah krusial, karena ini membuktikan bahwa kita harus menggunakan teknik penyeimbangan algoritma khusus nantinya agar AI kita tidak bias dan menebak 'sehat' terus-menerus."

---
## Slide 7: FEATURE CORRELATION (Grafik Heatmap)
*Pasang screenshot Colab bagian 1.3 (Grafik Heatmap) di slide ini.*
**Judul Besar Slide Canva:** FEATURE CORRELATION
**Sub-judul:** Visualizing Inter-Variable Relationships

**🇬🇧 English (Teks Paragraf untuk dimasukkan ke slide Canva):**
> To deeply understand the intricate relationships between variables, a Correlation Heatmap is generated. This visual matrix calculates how strongly each feature influences the target variable and interacts with one another. The heatmap distinctly highlights that factors such as High Blood Pressure and Age possess strong positive correlations with heart disease. Interestingly, it also visually proves the negative correlation of Socio-Economic features, indicating that higher education and income levels are mathematically associated with lower disease risks.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Tahap eksplorasi data terakhir adalah membuat *Heatmap* Korelasi. Matriks warna-warni ini menghitung hubungan sebab-akibat antar variabel secara matematis. Semakin gelap merah warnanya, semakin kuat pengaruhnya. Dari matriks ini, terbukti bahwa Darah Tinggi dan Umur memiliki pengaruh terbesar terhadap serangan jantung. Fakta yang paling menarik: *Heatmap* ini membuktikan secara matematis bahwa Tingkat Pendidikan dan Gaji memiliki korelasi negatif. Artinya, semakin tinggi pendidikan dan pendapatan pasien, semakin kecil risiko mereka terkena penyakit jantung."

---
## Slide 8: DATA PRE-PROCESSING (Pemrosesan Data)
*Karena bentuk Canva Anda terbagi dua, ganti teks di kotak hijau sebelah kiri dengan teks berikut:*
**Ganti tulisan kuning (Oleh: Olivia Wilson) menjadi:** DATA PRE-PROCESSING

**🇬🇧 English (Teks Paragraf pendek untuk diketik di kotak kiri):**
> To properly prepare the raw data for machine learning, the dataset is mathematically split into an 80% training set and a 20% testing set. Additionally, a Standard Scaler technique is applied to normalize all numerical features, ensuring optimum algorithmic stability.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Setelah selesai meneliti data, kita masuk ke Tahap 2 yaitu Pemrosesan Data atau *Pre-processing*. Pertama, data dipecah secara acak menjadi 80% untuk bahan belajar mesin, dan 20% sisanya disimpan sebagai ujian kemampuannya nanti. Terakhir, saya melakukan standardisasi angka. Ini wajib dilakukan agar angka Umur yang bernilai belasan bisa setara dengan BMI yang bernilai puluhan, sehingga mesin tidak keliru menafsirkan prioritas atribut."

---
---
## Slide 9: RANDOM FOREST CLASSIFICATION (Tahap 3 & 4)
*Ganti teks di kotak hijau sebelah kanan dengan teks berikut:*
**Ganti tulisan putih (OLEH: OLIVIA WILSON) menjadi:** RANDOM FOREST CLASSIFICATION

**🇬🇧 English (Teks Paragraf pendek untuk diketik di kotak kanan):**
> The core predictive engine utilizes the Random Forest algorithm. By intelligently learning from the 80% training data, this ensemble method constructs multiple decision trees to accurately classify patient risk, which is subsequently validated against the unseen testing dataset.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Kini kita masuk ke tahap pemodelan (*Modeling*). Sebagai 'otak' dari kecerdasan buatan ini, saya memilih algoritma *Random Forest*. Mesin ini mempelajari pola tersembunyi dari 200 ribu data latih dengan cara membangun puluhan Pohon Keputusan secara bersamaan. Setelah mesin selesai berlatih, saya langsung mengevaluasinya menggunakan sisa 20% data ujian yang belum pernah ia lihat sama sekali untuk menguji kehebatannya secara objektif."

---
## Slide 10: MODEL EVALUATION & ACCURACY (Tahap 4 - Evaluasi)
*Ganti teks di kotak hijau sebelah kiri dengan teks berikut:*
**Ganti tulisan putih (OLEH: OLIVIA WILSON) menjadi:** MODEL EVALUATION & ACCURACY

**🇬🇧 English (Teks Paragraf pendek untuk diketik di kotak kiri):**
> The evaluation phase demonstrates a robust overall predictive accuracy of 90%. The detailed Classification Report confirms that the Random Forest algorithm successfully learned the complex medical patterns, proving the high feasibility of utilizing socio-economic and lifestyle data for early disease detection.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Tibalah kita di pembuktian hasil akhirnya. Seperti yang tertera pada *Classification Report* di layar, evaluasi membuktikan bahwa sistem kita berhasil meraih tingkat Akurasi Keseluruhan sebesar 90%! Mesin ini mampu menebak rekam medis dari 'Data Ujian' dengan sangat cerdas. Angka 90% ini sekaligus mengonfirmasi hipotesis awal kita: perpaduan data gaya hidup dan data Sosio-Ekonomi (Pendidikan & Gaji) ternyata sangat valid dan efektif jika digunakan untuk memprediksi risiko penyakit jantung secara dini."

## Slide 11: CONFUSION MATRIX (Tahap 4.1)
*Ganti teks di kotak hijau sebelah kanan dengan teks berikut:*
**Ganti tulisan putih (OLEH: OLIVIA WILSON) menjadi:** CONFUSION MATRIX ANALYSIS

**🇬🇧 English (Teks Paragraf pendek untuk diketik di kotak kanan):**
> To deeply analyze the predictive errors, a Confusion Matrix is visually generated. This matrix provides absolute transparency into exactly where the algorithm excels or struggles, mapping the true positives and false negatives to ensure clinical reliability.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Untuk membedah dari mana angka Akurasi 90% tadi berasal, saya memvisualisasikannya ke dalam bentuk *Confusion Matrix*. Melalui matriks biru ini, kita bisa melihat rincian spesifik jumlah orang sakit yang berhasil ditebak sakit, maupun yang keliru ditebak sehat oleh mesin. Transparansi tingkat *error* seperti ini sangat wajib dilampirkan dalam penelitian sistem medis agar dokter tahu persis batasan kemampuan AI-nya."

---
## Slide 12: K-MEANS CLUSTERING (Tahap 5)
*Ganti teks di kotak sebelah kanan dengan teks berikut:*
**Ganti judul hijau besar menjadi:** K-MEANS CLUSTERING
**Ganti sub-judul hijau kecil menjadi:** Unsupervised Patient Segmentation

**🇬🇧 English (Teks Paragraf pendek untuk diketik di kotak kanan):**
> Moving beyond predictive classification, an unsupervised K-Means Clustering algorithm is applied to automatically discover hidden patient segments. The system successfully divides the 250,000 instances into distinct groups based purely on mathematical similarities in their lifestyle and health metrics, without relying on any predefined target labels.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Sebagai pelengkap analisis, saya juga menerapkan algoritma K-Means Clustering. Berbeda dengan mesin sebelumnya yang diberi 'kunci jawaban' (*supervised*), algoritma K-Means ini dibiarkan 'buta' tanpa label target (*unsupervised*). Mesin dipaksa menganalisis mandiri dan secara otomatis membagi 250 ribu pasien tersebut ke dalam beberapa segmen atau 'klaster' berdasarkan kesamaan gaya hidup mereka. Segmentasi ini sangat berguna bagi pihak medis untuk merancang program kesehatan yang tepat sasaran."

---
## Slide 13: CLUSTERING VISUALIZATION (Tahap 5.1)
*Ganti teks di kotak sebelah kiri dengan teks berikut:*
**Ganti judul hijau besar menjadi:** CLUSTERING VISUALIZATION
**Ganti sub-judul hijau kecil menjadi:** Scatter Plot Analysis

**🇬🇧 English (Teks Paragraf pendek untuk diketik di kotak kiri):**
> To practically interpret the K-Means results, a scatter plot visualization is generated, projecting patients across two key dimensions: Age and BMI. The color-coded data points distinctly illustrate how the machine naturally grouped individuals with similar physiological profiles, providing actionable insights for targeted medical interventions.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Untuk membuktikan keberhasilan mesin K-Means, saya membuat visualisasi *Scatter Plot* ini. Setiap titik mewakili pasien, dan warnanya menunjukkan segmen klaster mereka. Menggunakan sumbu Umur dan BMI sebagai contoh, terbukti secara visual bahwa mesin berhasil memisahkan kelompok pasien ke dalam warna yang berbeda murni berdasarkan kemiripan fisiknya. Pengelompokan cerdas ini sangat bermanfaat bagi pihak rumah sakit untuk merancang kampanye pencegahan yang sangat spesifik untuk tiap klaster pasien."

---
*(Kirimkan screenshot halaman Canva selanjutnya jika Anda sudah siap untuk masuk ke babak pamer Sistem Prediksi Web / Streamlit!)*

<br>
<br>

# ==========================================
# 🌐 PRESENTASI 75% (SISTEM WEB STREAMLIT)
# ==========================================
*Gunakan panduan di bawah ini untuk presentasi kedua Anda yang berfokus memamerkan hasil akhir berupa Website.*

## Slide 1: JUDUL PRESENTASI (Slide Pembuka)
*Sesuai gambar web Anda (Halaman Seminar Proposal).*
**Ganti tulisan biru besar (SEMINAR PROPOSAL) menjadi:** HEART DISEASE PREDICTION SYSTEM
**Ganti tulisan (Universitas Rimberio) menjadi nama kampus Anda.**
*(Biarkan nama Anda "DHARMA MUDITA" tetap di bawah).*

**🇬🇧 English (Teks Paragraf untuk menggantikan 'Lorem ipsum' di bawah judul):**
> This presentation demonstrates the final deployment phase of the Data Mining project. It showcases an interactive Web Application powered by a Random Forest algorithm, designed to provide real-time, highly accurate cardiovascular disease risk assessments using clinical and lifestyle predictors.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk pembukaan presentasi):**
> "Selamat pagi Bapak/Ibu Dosen Penguji. Pada presentasi tahap 75% ini, saya sangat bangga untuk mendemonstrasikan hasil akhir dari proyek *Data Mining* saya. Jika pada presentasi tahap 50% sebelumnya kita berfokus melatih kecerdasan buatan (*Machine Learning*) di dalam layar hitam Google Colab, hari ini saya akan mempresentasikan bagaimana 'otak' AI tersebut berhasil saya wujudkan dan integrasikan menjadi sebuah Aplikasi Web interaktif yang siap pakai di dunia nyata."

---

## Slide 2: Latar Belakang & Urgensi Sistem Web
*Ganti gambar orang-orang di sebelah kanan dengan screenshot tampilan atas web Anda (Header / Langkah 1).*
**Ganti tulisan biru besar (KONTAK KAMI) menjadi:** WEB DEPLOYMENT BACKGROUND

**🇬🇧 English (Teks Paragraf panjang untuk diketik di bawah judul Canva):**
> Despite achieving an outstanding 90% predictive accuracy, a machine learning model inherently remains theoretical if it is confined to raw programming environments like Google Colab. Medical professionals, clinics, and the general public require accessible, intuitive tools rather than complex code. To solve this accessibility barrier, this project successfully deploys the trained Random Forest algorithm into a fully functional, interactive Web Application using the Streamlit framework. This system acts as a crucial bridge between complex artificial intelligence and practical healthcare, enabling anyone to conduct real-time disease risk assessments seamlessly.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Setelah berhasil melatih model AI hingga mencapai akurasi 90%, kita menyadari satu hal yang krusial: Sebuah model kecerdasan buatan, sehebat apapun akurasinya, tidak akan ada gunanya di dunia nyata jika hanya berupa barisan kode pemrograman yang rumit. Para dokter, perawat, ataupun masyarakat awam tentu tidak mengerti cara menjalankan Google Colab. Oleh karena itu, latar belakang utama presentasi saya hari ini adalah mengubah kode AI tersebut menjadi sebuah Aplikasi Web interaktif. Web ini dirancang agar sangat mudah digunakan (*user-friendly*), sehingga teknologi yang rumit tadi bisa menjembatani kebutuhan medis sehari-hari. Kini, siapa saja dapat menggunakannya untuk mendeteksi risiko penyakit jantung secara instan."

---
## Slide 3: USER INTERFACE DESIGN (Tampilan Form Web)
*Sesuai gambar web Anda (Langkah 1).*
**Ganti tulisan biru besar (PENDAHULUAN) menjadi:** USER INTERFACE DESIGN
**Ganti sub-judul (LATAR BELAKANG) menjadi:** Step-by-Step Data Input

**🇬🇧 English (Teks Paragraf panjang untuk diketik di kotak Canva):**
> To ensure seamless usability, the Web Application features a highly structured, wizard-style user interface built with Streamlit. The complex 21 predictor variables are intuitively categorized into four sequential steps, beginning with Basic Patient Demographics. This systematic design reduces cognitive load, allowing doctors and patients to input vital statistics such as Age and BMI efficiently without feeling overwhelmed by a massive questionnaire, thereby maximizing the system's practical implementation in fast-paced clinical environments.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Inilah wujud dari jembatan yang saya maksud: Aplikasi Web Prediksi Penyakit Jantung. Untuk memastikan web ini ramah pengguna, saya merancang antarmukanya secara bertahap atau *Step-by-Step*. Seperti yang terlihat di layar, 21 pertanyaan medis yang tadinya rumit, saya pecah menjadi empat langkah sederhana. Langkah pertama difokuskan khusus pada Demografi Dasar Pasien seperti Umur dan BMI. Desain bertahap ini sangat krusial di dunia medis agar dokter atau pasien tidak pusing melihat *form* pertanyaan yang terlalu panjang, sehingga proses *input* diagnosis berjalan lebih cepat, sistematis, dan nyaman."

---
## Slide 4: MEDICAL HISTORY INPUT (Langkah 2 di Web)
*Sesuai gambar web Anda (Langkah 2: Kondisi & Riwayat Penyakit).*
**Ganti tulisan biru besar (RUMUSAN MASALAH) menjadi:** MEDICAL HISTORY INPUT
**Tambahkan sub-judul kecil (jika muat):** Clinical Predictors Gathering

**🇬🇧 English (Teks Paragraf panjang untuk diketik di kotak Canva):**
> Progressing to the second phase, the interface dynamically transitions to capture the patient's underlying medical history. This step systematically gathers critical clinical indicators, such as High Blood Pressure and High Cholesterol, which the Exploratory Data Analysis previously identified as primary catalysts for heart disease. By integrating these specific inputs, the Web Application ensures that the underlying Random Forest algorithm receives the exact, high-weight variables it needs to compute a highly accurate risk probability.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Melanjutkan ke Langkah ke-2 pada aplikasi web, sistem mulai menanyakan kondisi klinis dan riwayat penyakit pasien, seperti riwayat tekanan darah tinggi dan kadar kolesterol. Mengapa form ini saya pisahkan secara khusus? Karena seperti yang sudah kita buktikan pada analisis *Heatmap* sebelumnya, faktor-faktor penyakit ini adalah penyumbang risiko paling tinggi. Dengan meminta data ini secara terstruktur, sistem memastikan bahwa 'otak' *Random Forest* di belakang layar mendapatkan asupan data terpenting untuk menghasilkan prediksi yang paling jitu."

---
## Slide 5: LIFESTYLE & HABITS INPUT (Langkah 3 di Web)
*Sesuai gambar web Anda (Langkah 3: Kebiasaan & Gaya Hidup).*
**Ganti tulisan biru besar (TUJUAN PENELITIAN) menjadi:** LIFESTYLE & HABITS INPUT
**Ganti sub-judul kecil menjadi:** Behavioral Risk Factors

**🇬🇧 English (Teks Paragraf untuk diketik di kotak Canva - *tambahkan Text Box jika tidak ada*):**
> The third stage captures the patient's behavioral and lifestyle choices, including smoking habits, physical activity, and dietary routines. Unlike clinical metrics, these variables represent the socio-behavioral dimensions of health. The Machine Learning model processes these daily habits to uncover hidden correlations, as our previous analysis demonstrated that lifestyle choices significantly impact the overall trajectory of cardiovascular risks.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Masuk ke Langkah ke-3, *form* beralih menanyakan seputar kebiasaan dan gaya hidup pasien sehari-hari, seperti apakah mereka perokok aktif, aktivitas fisik, hingga pola makan. Mengapa gaya hidup ditanyakan ke AI? Karena berdasarkan eksperimen Klasterisasi kita sebelumnya, pola hidup sehari-hari ini terbukti secara matematis sangat memengaruhi kesehatan pasien. Dengan menyertakan faktor gaya hidup, tebakan kecerdasan buatan kita menjadi jauh lebih 'manusiawi' dan komprehensif, layaknya diagnosis holistik dari seorang dokter sungguhan."

---
---
## Slide 6: CURRENT SYMPTOMS INPUT (Langkah 4 di Web)
*Sesuai gambar web Anda (Langkah 4: Keluhan Saat Ini).*
**Ganti tulisan biru besar (METODOLOGI PENELITIAN) menjadi:** CURRENT SYMPTOMS INPUT
**Tambahkan sub-judul kecil (jika muat):** Final Risk Indicators

**🇬🇧 English (Teks Paragraf panjang untuk diketik di kotak Canva):**
> The final input phase is dedicated to capturing the patient's immediate physical complaints, such as difficulty climbing stairs or general health status. These acute symptoms serve as the most direct indicators of potential cardiovascular distress. By combining these immediate red flags with the previously gathered demographics, medical history, and lifestyle factors, the system successfully aggregates all 21 variables. Once this final step is completed, the data is seamlessly transmitted to the Random Forest engine to instantly calculate the definitive risk prediction.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Tibalah kita di Langkah ke-4 atau langkah terakhir pengisian data. Bagian ini sangat krusial karena berfokus pada keluhan fisik yang sedang dialami pasien saat ini, seperti kesulitan menaiki tangga. Gejala-gejala langsung ini ibarat 'lampu merah' utama bagi penyakit jantung. Setelah keempat langkah ini selesai, artinya ke-21 variabel rekam medis telah terkumpul secara utuh. Sistem kemudian akan membungkus data ini dan mengirimkannya ke dalam mesin *Random Forest* untuk diproses. Mari kita lihat apa yang terjadi saat tombol Prediksi ditekan di slide selanjutnya!"

---
*(Kirimkan screenshot Canva selanjutnya (Slide 7) agar saya bisa buatkan paragraf yang pas! Slide 7 pasti menunjukkan Hasil Prediksinya kan?)*

---
## Slide 7: REAL-TIME PREDICTION RESULTS (Hasil Web)
*Sesuai gambar web Anda (Bagian Hasil Analisis Prediksi).*
**Ganti tulisan biru besar (METODE PENELITIAN) menjadi:** REAL-TIME PREDICTION RESULTS
**Ganti sub-judul kecil menjadi:** Automated Medical Insights

**🇬🇧 English (Teks Paragraf untuk diketik di kotak Canva - *tambahkan Text Box jika tidak ada*):**
> Upon submitting the 21 parameters, the Random Forest model instantaneously computes the patient's cardiovascular profile. The system outputs a definitive classification accompanied by an exact probability percentage, ensuring transparency in its decision-making. Furthermore, the application generates automated, tailored medical recommendations based on the prediction. This transforms raw mathematical outputs into actionable health insights, effectively bridging the gap between artificial intelligence and practical patient care.

**🇮🇩 Indonesia (Teks Narasi / Lisan untuk Anda baca saat presentasi):**
> "Dan inilah hasil puncaknya! Begitu tombol ditekan, mesin *Random Forest* langsung memproses ke-21 data tersebut dalam hitungan milidetik. Di layar, sistem tidak hanya mengeluarkan hasil diagnosis (apakah pasien aman atau berisiko), tetapi juga menampilkan 'Tingkat Keyakinan' dalam bentuk persentase. Ini sangat penting agar dokter tahu seberapa yakin AI tersebut dengan tebakannya. Yang paling canggih, web ini secara otomatis meracik 'Saran Medis' di kotak biru bawah. Hal ini membuktikan bahwa sistem buatan kita bukan sekadar alat hitung angka, melainkan asisten cerdas yang siap membantu pencegahan penyakit di dunia nyata!"

---
*(Kirimkan pesan jika ini adalah slide terakhir, atau kirimkan screenshot Slide 8 jika masih ada slide penutup/kesimpulan!)*
