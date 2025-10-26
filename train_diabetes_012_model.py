import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import pickle

# Cargar datos
df = pd.read_csv('data/diabetes_012_health_indicators_BRFSS2015.csv')

# Seleccionar las 21 variables relevantes
features = [
    'HighBP', 'HighChol', 'CholCheck', 'BMI', 'Smoker',
    'Stroke', 'HeartDiseaseorAttack', 'PhysActivity', 'Fruits',
    'Veggies', 'HvyAlcoholConsump', 'AnyHealthcare', 'NoDocbcCost',
    'GenHlth', 'MentHlth', 'PhysHlth', 'DiffWalk', 'Sex', 'Age',
    'Education', 'Income'
]
X = df[features]
y = df['Diabetes_012']

# Verificar valores faltantes
print("Valores faltantes en X_train:")
print(X.isnull().sum())
print("\nValores faltantes en X_test:")
print(X.isnull().sum())

# Dividir en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Escalar variables numéricas
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Entrenar modelo multiclase
model = LogisticRegression(multi_class='multinomial', max_iter=1000)
model.fit(X_train_scaled, y_train)

# Evaluar modelo
preds = model.predict(X_test_scaled)
print('Accuracy:', accuracy_score(y_test, preds))
print(classification_report(y_test, preds))

# Guardar modelo y scaler
with open('data/diabetes_012_model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open('data/diabetes_012_scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)
