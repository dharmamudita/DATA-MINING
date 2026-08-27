"""Retrain model Random Forest dengan jumlah pohon lebih sedikit (20)
agar ukuran file .pkl cukup kecil untuk Vercel deployment."""

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

print("=" * 60)
print("RETRAINING MODEL (n_estimators=20, optimized for Vercel)")
print("=" * 60)

print("\n[1/5] Membaca data CSV...")
df = pd.read_csv('heart_disease_health_indicators_BRFSS2015.csv')
print(f"      Dataset: {df.shape[0]} baris x {df.shape[1]} kolom")

print("[2/5] Menyiapkan data...")
X = df.drop('HeartDiseaseorAttack', axis=1)
y = df['HeartDiseaseorAttack']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("[3/5] Standardisasi data...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("[4/5] Melatih Random Forest (20 pohon)...")
rf_model = RandomForestClassifier(
    n_estimators=20,
    random_state=42,
    class_weight='balanced',
    n_jobs=-1
)
rf_model.fit(X_train_scaled, y_train)

# Evaluasi
y_pred = rf_model.predict(X_test_scaled)
akurasi = accuracy_score(y_test, y_pred)
print(f"\n      [OK] Akurasi: {akurasi * 100:.2f}%")
print(f"\n      Classification Report:")
print(classification_report(y_test, y_pred))

print("[5/5] Menyimpan model ke file .pkl...")
joblib.dump(rf_model, 'model_rf_small.pkl')
joblib.dump(scaler, 'scaler_small.pkl')

model_size = os.path.getsize('model_rf_small.pkl') / (1024 * 1024)
scaler_size = os.path.getsize('scaler_small.pkl') / 1024
print(f"\n      Model size: {model_size:.1f} MB")
print(f"      Scaler size: {scaler_size:.1f} KB")
print(f"\n{'=' * 60}")
print("SELESAI! Model siap untuk Vercel deployment.")
print(f"{'=' * 60}")
