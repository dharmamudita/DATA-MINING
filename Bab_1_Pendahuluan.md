# BAB I: PENDAHULUAN

## 1.1 Latar Belakang
Penyakit jantung (*Cardiovascular Disease*) masih menjadi salah satu penyebab kematian tertinggi di dunia. Menurut berbagai literatur medis, penanganan yang terlambat dan gaya hidup yang buruk merupakan faktor utama tingginya angka fatalitas akibat serangan jantung. Sayangnya, banyak masyarakat yang tidak menyadari bahwa mereka memiliki risiko tinggi, karena gejalanya seringkali tidak terlihat secara kasat mata pada tahap awal.

Dengan berkembangnya pesat teknologi *Data Mining* dan *Machine Learning*, miliaran rekam medis elektronik kini dapat diolah untuk menemukan pola-pola tersembunyi penyebab penyakit. Dataset dari *Centers for Disease Control and Prevention* (CDC) Amerika Serikat yang bernama *Behavioral Risk Factor Surveillance System* (BRFSS) tahun 2015 menyimpan lebih dari 250.000 data responden. Data ini berisi informasi komprehensif terkait status kesehatan, gaya hidup, hingga kondisi sosioekonomi. Memanfaatkan data berskala besar ini, sebuah sistem prediksi cerdas sangat berpotensi untuk dikembangkan.

Berbeda dengan sistem prediksi konvensional, proyek penelitian ini dirancang untuk tidak hanya mempertimbangkan faktor klinis seperti tekanan darah atau kolesterol, tetapi juga mengintegrasikan faktor sosioekonomi seperti **Tingkat Pendidikan** dan **Pendapatan**. Berdasarkan temuan medis modern, faktor sosioekonomi berdampak langsung pada literasi kesehatan, kualitas gizi harian (konsumsi *junk food* akibat mobilitas kerja), tingkat stres, serta aksesibilitas terhadap fasilitas medis dan asuransi kesehatan.

Oleh karena itu, proyek akhir ini diusulkan untuk mengimplementasikan algoritma klasifikasi *Random Forest* untuk deteksi risiko dan algoritma klasterisasi *K-Means* untuk segmentasi profil pasien. Pada puncaknya, "otak" kecerdasan buatan ini tidak hanya dibiarkan berupa barisan kode, melainkan diimplementasikan (*Deployment*) ke dalam sebuah antarmuka *Website* yang premium agar dapat digunakan secara praktis dan *real-time* oleh masyarakat luas.

## 1.2 Rumusan Masalah
Berdasarkan latar belakang di atas, maka rumusan masalah dalam proyek akhir ini adalah sebagai berikut:
1. Bagaimana proses pra-pemrosesan data (*Data Pre-processing*) terhadap dataset CDC BRFSS 2015 yang berskala masif (253.680 baris data) agar optimal dipelajari oleh mesin?
2. Bagaimana kinerja dan tingkat akurasi algoritma *Random Forest Classifier* dalam memprediksi risiko penyakit jantung berdasarkan 21 fitur prediktor yang tersedia?
3. Bagaimana mengidentifikasi segmentasi pasien secara alami menggunakan algoritma *Unsupervised Learning* (Klasterisasi *K-Means*) pada dimensi Umur dan Indeks Massa Tubuh (BMI)?
4. Bagaimana cara mengintegrasikan model prediksi yang telah dilatih (.pkl) ke dalam sistem *Web Application* fungsional (Streamlit)?

## 1.3 Tujuan Penelitian
Tujuan dari pelaksanaan proyek akhir ini adalah:
1. Berhasil melakukan rekayasa dan standardisasi data pada skala besar, termasuk mitigasi data miring (*imbalanced data*).
2. Membangun model *Machine Learning* untuk mendeteksi potensi penyakit jantung dengan tingkat akurasi evaluasi yang teruji secara statistik (di atas 85%).
3. Menganalisis penyebaran klaster/segmen pasien untuk membuktikan bahwa penderita obesitas dapat dipetakan secara akurat tanpa campur tangan manusia.
4. Menciptakan produk akhir perangkat lunak (*Software*) berbentuk *Website* interaktif yang siap pakai dan ramah pengguna (*User-Friendly*).
