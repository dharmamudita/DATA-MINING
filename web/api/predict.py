"""Vercel Python Serverless Function for Heart Disease Prediction."""

from http.server import BaseHTTPRequestHandler
import warnings
warnings.filterwarnings('ignore')
import json
import os
import numpy as np
import joblib

# Robust path resolution for model files
base_dir = os.path.dirname(os.path.abspath(__file__))
potential_model_paths = [
    os.path.join(base_dir, 'model', 'model_rf_small.pkl'),
    os.path.join(base_dir, '..', 'model', 'model_rf_small.pkl'),
    os.path.join(os.getcwd(), 'model', 'model_rf_small.pkl'),
    os.path.join(os.getcwd(), 'api', 'model', 'model_rf_small.pkl'),
]

potential_scaler_paths = [
    os.path.join(base_dir, 'model', 'scaler_small.pkl'),
    os.path.join(base_dir, '..', 'model', 'scaler_small.pkl'),
    os.path.join(os.getcwd(), 'model', 'scaler_small.pkl'),
    os.path.join(os.getcwd(), 'api', 'model', 'scaler_small.pkl'),
]

MODEL_PATH = next((p for p in potential_model_paths if os.path.exists(p)), potential_model_paths[0])
SCALER_PATH = next((p for p in potential_scaler_paths if os.path.exists(p)), potential_scaler_paths[0])

model = None
scaler = None

def load_model():
    global model, scaler
    if model is None:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            load_model()
            
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body)
            
            features = data.get('features', [])
            if len(features) != 21:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'error': f'Expected 21 features, got {len(features)}'
                }).encode())
                return
            
            # Transform and predict
            user_data = np.array(features).reshape(1, -1)
            user_data_scaled = scaler.transform(user_data)
            prediction = int(model.predict(user_data_scaled)[0])
            probabilities = model.predict_proba(user_data_scaled)[0]
            
            probability = float(probabilities[prediction])
            
            # Generate recommendation
            if prediction == 1:
                recommendation = (
                    "Berdasarkan analisis algoritma Random Forest terhadap data Anda, "
                    "terdapat indikasi risiko penyakit jantung. Sangat disarankan untuk "
                    "segera berkonsultasi dengan dokter spesialis jantung, mengurangi "
                    "konsumsi makanan berlemak dan garam berlebih, serta merutinkan "
                    "aktivitas fisik minimal 30 menit per hari."
                )
            else:
                recommendation = (
                    "Kabar baik! Berdasarkan analisis algoritma Random Forest terhadap "
                    "data Anda, tidak terdeteksi indikasi risiko penyakit jantung saat ini. "
                    "Pertahankan gaya hidup sehat Anda dengan menjaga pola makan bergizi, "
                    "rutin berolahraga, dan melakukan pemeriksaan kesehatan berkala."
                )
            
            response = {
                'prediction': prediction,
                'probability': probability,
                'recommendation': recommendation
            }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': str(e)
            }).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
