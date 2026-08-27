import streamlit as st
import pandas as pd
import numpy as np
import joblib
import os

# --- KONFIGURASI HALAMAN ---
st.set_page_config(
    page_title="Sistem Prediksi Penyakit Jantung",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- INIT SESSION STATE (Menyimpan Data Antar Langkah) ---
if 'step' not in st.session_state:
    st.session_state.step = 1

# Inisialisasi semua variabel form agar tidak hilang saat pindah halaman
default_keys = {
    'age_input': "18-24 Tahun", 'sex_input': "Perempuan", 'edu_input': "Lulus SMA / Sederajat", 'income_input': "Rp 2 - 5 Juta",
    'highbp_input': "Tidak", 'highchol_input': "Tidak", 'cholcheck_input': "Tidak", 'bmi_input': 25.0,
    'stroke_input': "Tidak", 'diabetes_input': "Tidak Punya",
    'smoker_input': "Tidak", 'physactivity_input': "Tidak", 'alcohol_input': "Tidak", 'fruits_input': "Tidak", 'veggies_input': "Tidak",
    'genhlth_input': "Baik (Good)", 'diffwalk_input': "Tidak", 'healthcare_input': "Ya",
    'menthlth_input': 0, 'physhlth_input': 0, 'nodoc_input': "Tidak"
}
for key, val in default_keys.items():
    if key not in st.session_state:
        st.session_state[key] = val

def next_step():
    st.session_state.step += 1

def prev_step():
    st.session_state.step -= 1

# --- IMPORT FONT AWESOME & CUSTOM CSS ---
st.markdown("""
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
    html, body, [class*="css"]  { font-family: 'Poppins', sans-serif; }
    
    /* Hapus warna teks paksa agar menyesuaikan Dark/Light Mode bawaan Streamlit */
    .main-header { font-size: 2.2rem; font-weight: 800; text-align: center; margin-bottom: 5px; }
    .main-header i { color: #EF4444; margin-right: 15px; }
    .sub-header { font-size: 1.1rem; font-weight: 300; text-align: center; margin-bottom: 30px; opacity: 0.8; }
    
    /* Tombol Navigasi */
    div[data-testid="stButton"] button {
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    /* Stepper UI */
    .stepper { display: flex; justify-content: space-between; margin-bottom: 30px; padding: 20px; background-color: rgba(128,128,128,0.1); border-radius: 10px; }
    .step-item { text-align: center; font-weight: 600; opacity: 0.5; flex: 1; }
    .step-active { opacity: 1; color: #3B82F6; font-weight: 800; border-bottom: 3px solid #3B82F6; padding-bottom: 10px; }
</style>
""", unsafe_allow_html=True)

# --- HEADER ---
st.markdown('<div class="main-header"><i class="fa-solid fa-heart-pulse"></i>Sistem Prediksi Risiko Penyakit Jantung</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-header">Berbasis Machine Learning (Random Forest Classifier)</div>', unsafe_allow_html=True)

# Memakai st.info bawaan streamlit agar otomatis menyesuaikan warna (memperbaiki bug text putih di dark mode)
st.info("Selamat Datang! Sistem cerdas ini memprediksi risiko penyakit jantung secara real-time dengan mempertimbangkan 21 faktor. Agar lebih terarah, silakan lengkapi data secara berurutan dari Langkah 1 hingga Langkah 4.")

# --- SIDEBAR ---
with st.sidebar:
    st.image("https://cdn-icons-png.flaticon.com/512/3004/3004458.png", width=100)
    st.title("Tentang Aplikasi")
    st.markdown("""
    Aplikasi ini ditenagai oleh **Algoritma Random Forest** yang dilatih menggunakan lebih dari **250.000 data rekam medis pasien** dari CDC Amerika Serikat.
    
    **Akurasi Model:** ~90%
    """)
    st.divider()
    st.caption("© 2026 | Proyek Akhir Data Mining")

# --- STEPPER UI DISPLAY ---
s1_class = "step-active" if st.session_state.step == 1 else ""
s2_class = "step-active" if st.session_state.step == 2 else ""
s3_class = "step-active" if st.session_state.step == 3 else ""
s4_class = "step-active" if st.session_state.step == 4 else ""

st.markdown(f"""
<div class="stepper">
    <div class="step-item {s1_class}">1. Demografi Pasien</div>
    <div class="step-item {s2_class}">2. Riwayat Medis</div>
    <div class="step-item {s3_class}">3. Gaya Hidup</div>
    <div class="step-item {s4_class}">4. Prediksi Akhir</div>
</div>
""", unsafe_allow_html=True)

# --- FORMULIR INPUT BERDASARKAN STEP ---

if st.session_state.step == 1:
    st.markdown('<h3><i class="fa-solid fa-address-card" style="margin-right:10px; color:#3B82F6;"></i>Langkah 1: Informasi Dasar Pasien</h3>', unsafe_allow_html=True)
    col1, col2 = st.columns(2)
    with col1:
        age_mapping = {"18-24 Tahun": 1, "25-29 Tahun": 2, "30-34 Tahun": 3, "35-39 Tahun": 4, "40-44 Tahun": 5, "45-49 Tahun": 6, "50-54 Tahun": 7, "55-59 Tahun": 8, "60-64 Tahun": 9, "65-69 Tahun": 10, "70-74 Tahun": 11, "75-79 Tahun": 12, "80 Tahun ke atas": 13}
        st.selectbox("Rentang Usia", list(age_mapping.keys()), key="age_input")
        st.selectbox("Jenis Kelamin", ["Perempuan", "Laki-laki"], key="sex_input")
    with col2:
        edu_mapping = {"Tidak Lulus SMA / SD / SMP": 1, "Lulus SMA / Sederajat": 2, "Pernah Kuliah (Drop Out)": 3, "Lulus Sarjana (S1/S2/S3)": 4, "Lainnya": 2}
        st.selectbox("Tingkat Pendidikan Terakhir", list(edu_mapping.keys()), help="Literasi Kesehatan. Meski bukan jaminan mutlak, tingkat pendidikan memengaruhi pemahaman pasien terhadap risiko medis. Namun, pendidikan tinggi (pekerja kantoran) juga rentan terhadap penyakit akibat kurang gerak (Sedentary Lifestyle).", key="edu_input")
        income_mapping = {"< Rp 2 Juta": 1, "Rp 2 - 5 Juta": 3, "Rp 5 - 10 Juta": 5, "> Rp 10 Juta": 8}
        st.selectbox("Estimasi Pendapatan per Bulan", list(income_mapping.keys()), help="Faktor Ekonomi. Pendapatan tinggi memberi akses medis yang baik, namun seringkali diikuti pola makan buruk (junk food) dan stres pekerjaan tinggi. Sebaliknya, pendapatan rendah rentan terhadap minimnya asuransi dan gizi buruk.", key="income_input")
    
    st.write("") # spasi
    if st.button("Lanjut ke Langkah 2 ➔", type="primary", use_container_width=True):
        next_step()
        st.rerun()

elif st.session_state.step == 2:
    st.markdown('<h3><i class="fa-solid fa-notes-medical" style="margin-right:10px; color:#3B82F6;"></i>Langkah 2: Kondisi & Riwayat Penyakit</h3>', unsafe_allow_html=True)
    col1, col2 = st.columns(2)
    with col1:
        st.radio("Memiliki Tekanan Darah Tinggi (Hipertensi)?", ["Tidak", "Ya"], horizontal=True, key="highbp_input")
        st.radio("Memiliki Kolesterol Tinggi?", ["Tidak", "Ya"], horizontal=True, key="highchol_input")
        st.radio("Pernah Cek Kolesterol dalam 5 Tahun Terakhir?", ["Tidak", "Ya"], horizontal=True, key="cholcheck_input")
    with col2:
        st.number_input("Indeks Massa Tubuh (BMI)", min_value=10.0, max_value=90.0, help="BMI mengukur rasio berat (kg) terhadap tinggi badan (m²). Kategori: Normal (18.5 - 24.9), Berlebih (25 - 29.9), Obesitas (>= 30). Angka BMI tinggi menandakan obesitas yang membebani kerja pembuluh darah dan jantung.", key="bmi_input")
        st.radio("Pernah Mengalami Stroke?", ["Tidak", "Ya"], horizontal=True, key="stroke_input")
        st.selectbox("Riwayat Diabetes", ["Tidak Punya", "Pre-Diabetes / Borderline", "Punya Diabetes"], key="diabetes_input")
    
    st.write("") # spasi
    col_prev, col_next = st.columns(2)
    with col_prev:
        if st.button("⬅️ Kembali", use_container_width=True):
            prev_step()
            st.rerun()
    with col_next:
        if st.button("Lanjut ke Langkah 3 ➔", type="primary", use_container_width=True):
            next_step()
            st.rerun()

elif st.session_state.step == 3:
    st.markdown('<h3><i class="fa-solid fa-person-running" style="margin-right:10px; color:#3B82F6;"></i>Langkah 3: Kebiasaan & Gaya Hidup</h3>', unsafe_allow_html=True)
    col1, col2 = st.columns(2)
    with col1:
        st.radio("Perokok? (Telah merokok > 100 batang seumur hidup)", ["Tidak", "Ya"], horizontal=True, key="smoker_input")
        st.radio("Melakukan Aktivitas Fisik / Olahraga berat dalam 30 hari terakhir?", ["Tidak", "Ya"], horizontal=True, key="physactivity_input")
        st.radio("Peminum Alkohol Rutin / Berat?", ["Tidak", "Ya"], horizontal=True, key="alcohol_input")
    with col2:
        st.radio("Konsumsi Buah segar minimal 1x sehari?", ["Tidak", "Ya"], horizontal=True, key="fruits_input")
        st.radio("Konsumsi Sayur segar minimal 1x sehari?", ["Tidak", "Ya"], horizontal=True, key="veggies_input")
    
    st.write("") # spasi
    col_prev, col_next = st.columns(2)
    with col_prev:
        if st.button("⬅️ Kembali", use_container_width=True):
            prev_step()
            st.rerun()
    with col_next:
        if st.button("Lanjut ke Langkah Terakhir ➔", type="primary", use_container_width=True):
            next_step()
            st.rerun()

elif st.session_state.step == 4:
    st.markdown('<h3><i class="fa-solid fa-stethoscope" style="margin-right:10px; color:#3B82F6;"></i>Langkah 4: Keluhan Saat Ini</h3>', unsafe_allow_html=True)
    col1, col2 = st.columns(2)
    with col1:
        genhlth_mapping = {"Sangat Baik (Excellent)": 1, "Baik (Good)": 2, "Cukup (Fair)": 3, "Buruk (Poor)": 4, "Sangat Buruk": 5}
        st.selectbox("Evaluasi Kesehatan Umum Secara Pribadi", list(genhlth_mapping.keys()), key="genhlth_input")
        st.radio("Kesulitan Berjalan atau Naik Tangga?", ["Tidak", "Ya"], horizontal=True, key="diffwalk_input")
        st.radio("Memiliki Asuransi Kesehatan (BPJS/Swasta)?", ["Tidak", "Ya"], horizontal=True, key="healthcare_input")
    with col2:
        st.slider("Berapa hari kesehatan MENTAL dirasa memburuk (30 hari terakhir)?", 0, 30, key="menthlth_input")
        st.slider("Berapa hari kesehatan FISIK terasa sakit (30 hari terakhir)?", 0, 30, key="physhlth_input")
        st.radio("Pernah batal ke Dokter karena alasan biaya (1 tahun terakhir)?", ["Tidak", "Ya"], horizontal=True, key="nodoc_input")
    
    col_prev, col_blank = st.columns([1, 1])
    with col_prev:
        if st.button("⬅️ Kembali", use_container_width=True):
            prev_step()
            st.rerun()
        
    st.divider()
    
    # --- TOMBOL PREDIKSI KHUSUS DI TAHAP 4 ---
    st.markdown("""
    <style>
    .pred-btn button {
        background: linear-gradient(135deg, #10B981 0%, #059669 100%) !important;
        color: white !important;
        font-size: 1.2rem !important;
        padding: 15px !important;
        border: none !important;
    }
    .pred-btn button:hover {
        background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
    }
    </style>
    """, unsafe_allow_html=True)
    
    st.markdown('<div class="pred-btn">', unsafe_allow_html=True)
    if st.button("🔍 LAKUKAN PREDIKSI RISIKO SEKARANG", use_container_width=True):
        
        age_mapping = {"18-24 Tahun": 1, "25-29 Tahun": 2, "30-34 Tahun": 3, "35-39 Tahun": 4, "40-44 Tahun": 5, "45-49 Tahun": 6, "50-54 Tahun": 7, "55-59 Tahun": 8, "60-64 Tahun": 9, "65-69 Tahun": 10, "70-74 Tahun": 11, "75-79 Tahun": 12, "80 Tahun ke atas": 13}
        edu_mapping = {"Tidak Lulus SMA / SD / SMP": 1, "Lulus SMA / Sederajat": 2, "Pernah Kuliah (Drop Out)": 3, "Lulus Sarjana (S1/S2/S3)": 4, "Lainnya": 2}
        income_mapping = {"< Rp 2 Juta": 1, "Rp 2 - 5 Juta": 3, "Rp 5 - 10 Juta": 5, "> Rp 10 Juta": 8}
        
        try:
            input_data = [
                1 if st.session_state.highbp_input == "Ya" else 0,
                1 if st.session_state.highchol_input == "Ya" else 0,
                1 if st.session_state.cholcheck_input == "Ya" else 0,
                st.session_state.bmi_input,
                1 if st.session_state.smoker_input == "Ya" else 0,
                1 if st.session_state.stroke_input == "Ya" else 0,
                0 if st.session_state.diabetes_input == "Tidak Punya" else (1 if st.session_state.diabetes_input == "Pre-Diabetes / Borderline" else 2),
                1 if st.session_state.physactivity_input == "Ya" else 0,
                1 if st.session_state.fruits_input == "Ya" else 0,
                1 if st.session_state.veggies_input == "Ya" else 0,
                1 if st.session_state.alcohol_input == "Ya" else 0,
                1 if st.session_state.healthcare_input == "Ya" else 0,
                1 if st.session_state.nodoc_input == "Ya" else 0,
                genhlth_mapping[st.session_state.genhlth_input],
                st.session_state.menthlth_input,
                st.session_state.physhlth_input,
                1 if st.session_state.diffwalk_input == "Ya" else 0,
                1 if st.session_state.sex_input == "Laki-laki" else 0,
                age_mapping[st.session_state.age_input],
                edu_mapping[st.session_state.edu_input],
                income_mapping[st.session_state.income_input]
            ]
            user_data = np.array(input_data).reshape(1, -1)
            
            with st.spinner('Memproses pola rekam medis...'):
                if os.path.exists('model_jantung_rf.pkl') and os.path.exists('scaler_jantung.pkl'):
                    model = joblib.load('model_jantung_rf.pkl')
                    scaler = joblib.load('scaler_jantung.pkl')
                    
                    user_data_scaled = scaler.transform(user_data)
                    prediksi = model.predict(user_data_scaled)[0]
                    probabilitas = model.predict_proba(user_data_scaled)[0]
                    
                    st.markdown('<h3 style="margin-top:30px;"><i class="fa-solid fa-chart-simple" style="margin-right:10px; color:#1E3A8A;"></i>Hasil Analisis Prediksi</h3>', unsafe_allow_html=True)
                    
                    if prediksi == 1:
                        st.error(f"[PERINGATAN] Berdasarkan pola data, pasien terindikasi BERISIKO mengalami penyakit jantung.")
                        st.markdown(f"**Tingkat Keyakinan Sistem: {probabilitas[1]*100:.1f}%**")
                        st.info("Saran Medis: Segera konsultasikan ke dokter spesialis, perbaiki diet, dan rutinkan olahraga.")
                    else:
                        st.success(f"[KABAR BAIK] Berdasarkan pola data, pasien TIDAK BERISIKO (SEHAT).")
                        st.markdown(f"**Tingkat Keyakinan Sistem: {probabilitas[0]*100:.1f}%**")
                        st.info("Saran Medis: Pertahankan gaya hidup sehat Anda! Lanjutkan konsumsi makanan bergizi.")
                else:
                    st.warning("[SISTEM] File Model .pkl Belum Terpasang! (Mode Simulasi)")
                    import random, time
                    time.sleep(1)
                    simulasi_hasil = random.choice([0, 1])
                    if simulasi_hasil == 1:
                        st.error("[SIMULASI] Pasien terindikasi BERISIKO mengalami penyakit jantung.")
                    else:
                        st.success("[SIMULASI] Pasien TIDAK BERISIKO (SEHAT).")
        except Exception as e:
            st.error(f"Sistem Gagal Memproses: {e}")
    st.markdown('</div>', unsafe_allow_html=True)
