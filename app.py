from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Cargar modelo y scaler
def load_model():
    with open('data/diabetes_012_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('data/diabetes_012_scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    return model, scaler

model, scaler = load_model()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Variables esperadas en el JSON
    # HighBP, HighChol, CholCheck, BMI, Smoker, Stroke, HeartDiseaseorAttack, PhysActivity, Fruits
    features = [
        data['HighBP'],
        data['HighChol'],
        data['CholCheck'],
        data['BMI'],
        data['Smoker'],
        data['Stroke'],
        data['HeartDiseaseorAttack'],
        data['PhysActivity'],
        data['Fruits']
    ]
    X = np.array(features).reshape(1, -1)
    X_scaled = scaler.transform(X)
    probas = model.predict_proba(X_scaled)[0]
    pred = model.predict(X_scaled)[0]
    # Probabilidades para cada clase
    return jsonify({
        'prob_no_diabetes': float(probas[0]),
        'prob_prediabetes': float(probas[1]),
        'prob_diabetes': float(probas[2]),
        'prediction': int(pred)
    })

if __name__ == '__main__':
    app.run(debug=True)
