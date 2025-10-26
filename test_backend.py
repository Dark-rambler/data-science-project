import requests
import json

# URL del backend
url = "http://127.0.0.1:5000/predict"

# Datos de prueba (todas las 21 características)
test_data = {
    "HighBP": 1,
    "HighChol": 1,
    "CholCheck": 1,
    "BMI": 28.5,
    "Smoker": 0,
    "Stroke": 0,
    "HeartDiseaseorAttack": 0,
    "PhysActivity": 1,
    "Fruits": 1,
    "Veggies": 1,
    "HvyAlcoholConsump": 0,
    "AnyHealthcare": 1,
    "NoDocbcCost": 0,
    "GenHlth": 3,
    "MentHlth": 5,
    "PhysHlth": 5,
    "DiffWalk": 0,
    "Sex": 1,
    "Age": 7,
    "Education": 5,
    "Income": 6
}

print("=" * 50)
print("🧪 PRUEBA DEL BACKEND - Predicción de Diabetes")
print("=" * 50)
print("\n📋 Datos de entrada:")
print(json.dumps(test_data, indent=2))

try:
    print("\n🔄 Enviando solicitud al backend...")
    response = requests.post(url, json=test_data)
    
    if response.status_code == 200:
        result = response.json()
        print("\n✅ ¡Backend funcionando correctamente!")
        print("\n📊 Resultados:")
        print(f"  • Probabilidad Sin Diabetes: {result['prob_no_diabetes']*100:.2f}%")
        print(f"  • Probabilidad Prediabetes:  {result['prob_prediabetes']*100:.2f}%")
        print(f"  • Probabilidad Diabetes:     {result['prob_diabetes']*100:.2f}%")
        print(f"\n🎯 Predicción: ", end="")
        
        if result['prediction'] == 0:
            print("✅ Sin Diabetes")
        elif result['prediction'] == 1:
            print("⚡ Prediabetes")
        else:
            print("⚠️ Diabetes")
    else:
        print(f"\n❌ Error: Status code {response.status_code}")
        print(f"Respuesta: {response.text}")
        
except requests.exceptions.ConnectionError:
    print("\n❌ ERROR: No se pudo conectar al backend")
    print("   Asegúrate de que el backend esté corriendo:")
    print("   > py app.py")
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")

print("\n" + "=" * 50)
