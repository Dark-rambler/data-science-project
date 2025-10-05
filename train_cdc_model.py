import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import pickle

# Cargar datos
df = pd.read_csv('data/cdc_diabetes.csv')

# Codificar variables categóricas
le_sex = LabelEncoder()
df['Sex'] = le_sex.fit_transform(df['Sex'])
le_race = LabelEncoder()
df['Race'] = le_race.fit_transform(df['Race'])
le_smoking = LabelEncoder()
df['Smoking'] = le_smoking.fit_transform(df['Smoking'])
le_alcohol = LabelEncoder()
df['AlcoholDrinking'] = le_alcohol.fit_transform(df['AlcoholDrinking'])
le_activity = LabelEncoder()
df['PhysicalActivity'] = le_activity.fit_transform(df['PhysicalActivity'])
le_fruits = LabelEncoder()
df['Fruits'] = le_fruits.fit_transform(df['Fruits'])
le_vegetables = LabelEncoder()
df['Vegetables'] = le_vegetables.fit_transform(df['Vegetables'])
le_diabetic = LabelEncoder()
df['Diabetic'] = le_diabetic.fit_transform(df['Diabetic'])

# Separar variables independientes y dependiente
X = df.drop('Diabetic', axis=1)
y = df['Diabetic']

# Dividir en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Escalar variables numéricas
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Entrenar modelo
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# Evaluar modelo
preds = model.predict(X_test_scaled)
print('Accuracy:', accuracy_score(y_test, preds))
print(classification_report(y_test, preds))

# Guardar modelo y scaler
with open('data/cdc_diabetes_model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open('data/cdc_diabetes_scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)
