import sys
import warnings
warnings.filterwarnings('ignore')
import json
import os
import numpy as np
import joblib

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

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input provided"}))
        return

    try:
        raw_input = sys.argv[1].strip("'\"")
        features = json.loads(raw_input)

        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)

        user_data = np.array(features).reshape(1, -1)
        user_data_scaled = scaler.transform(user_data)
        prediction = int(model.predict(user_data_scaled)[0])
        probabilities = model.predict_proba(user_data_scaled)[0]
        probability = float(probabilities[prediction])

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

        print(json.dumps({
            "prediction": prediction,
            "probability": probability,
            "recommendation": recommendation
        }))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == '__main__':
    main()
