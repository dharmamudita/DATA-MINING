import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib

print("Membaca data CSV...")
df = pd.read_csv('heart_disease_health_indicators_BRFSS2015.csv')

print("Menyiapkan data (ini butuh waktu sekitar 15-30 detik, mohon tunggu)...")
X = df.drop('HeartDiseaseorAttack', axis=1)
y = df['HeartDiseaseorAttack']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Membangun Model
rf_model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
print("Sedang melatih kecerdasan buatan (Machine Learning)...")
rf_model.fit(X_train_scaled, y_train)

print("Menyimpan model ke dalam file .pkl...")
joblib.dump(rf_model, 'model_jantung_rf.pkl')
joblib.dump(scaler, 'scaler_jantung.pkl')

print("BERHASIL! File model_jantung_rf.pkl dan scaler_jantung.pkl sudah dibuat di folder Anda.")
