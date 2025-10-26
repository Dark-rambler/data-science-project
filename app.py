from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
# Configurar CORS para permitir solicitudes desde el frontend
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Cargar modelo y scaler
def load_model():
    with open('data/diabetes_012_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('data/diabetes_012_scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    return model, scaler

model, scaler = load_model()

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    # Manejar solicitudes OPTIONS para CORS
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        data = request.get_json()
        print(f"Datos recibidos: {data}")  # Para debug
        
        # Verificar que todos los campos estén presentes
        required_fields = [
            'HighBP', 'HighChol', 'CholCheck', 'BMI', 'Smoker',
            'Stroke', 'HeartDiseaseorAttack', 'PhysActivity', 'Fruits',
            'Veggies', 'HvyAlcoholConsump', 'AnyHealthcare', 'NoDocbcCost',
            'GenHlth', 'MentHlth', 'PhysHlth', 'DiffWalk', 'Sex', 'Age',
            'Education', 'Income'
        ]
        
        # Validar campos
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo faltante: {field}'}), 400
        
        # Variables esperadas en el JSON (21 características en el orden correcto)
        features = [
            data['HighBP'],
            data['HighChol'],
            data['CholCheck'],
            data['BMI'],
            data['Smoker'],
            data['Stroke'],
            data['HeartDiseaseorAttack'],
            data['PhysActivity'],
            data['Fruits'],
            data['Veggies'],
            data['HvyAlcoholConsump'],
            data['AnyHealthcare'],
            data['NoDocbcCost'],
            data['GenHlth'],
            data['MentHlth'],
            data['PhysHlth'],
            data['DiffWalk'],
            data['Sex'],
            data['Age'],
            data['Education'],
            data['Income']
        ]
        
        print(f"Features: {features}")  # Para debug
        
        X = np.array(features).reshape(1, -1)
        X_scaled = scaler.transform(X)
        probas = model.predict_proba(X_scaled)[0]
        pred = model.predict(X_scaled)[0]
        
        # Probabilidades para cada clase
        result = {
            'prob_no_diabetes': float(probas[0]),
            'prob_prediabetes': float(probas[1]),
            'prob_diabetes': float(probas[2]),
            'prediction': int(pred)
        }
        
        print(f"Resultado: {result}")  # Para debug
        return jsonify(result)
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Para debug
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
