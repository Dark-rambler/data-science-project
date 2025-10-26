# 🩺 Sistema de Predicción de Diabetes

Sistema completo de Machine Learning para predecir el riesgo de diabetes utilizando 21 características de salud.

## 📋 Características del Sistema

El modelo utiliza **21 variables** para realizar predicciones:

### Información de Salud General
- **HighBP**: Presión arterial alta (0/1)
- **HighChol**: Colesterol alto (0/1)
- **CholCheck**: Chequeo de colesterol en últimos 5 años (0/1)
- **BMI**: Índice de Masa Corporal
- **GenHlth**: Salud general (1-5, 1=Excelente, 5=Mala)
- **MentHlth**: Días con mala salud mental en últimos 30 días (0-30)
- **PhysHlth**: Días con mala salud física en últimos 30 días (0-30)

### Historial Médico
- **Stroke**: Ha tenido derrame cerebral (0/1)
- **HeartDiseaseorAttack**: Enfermedad cardíaca o ataque (0/1)
- **DiffWalk**: Dificultad para caminar (0/1)

### Estilo de Vida
- **Smoker**: Ha fumado 100+ cigarrillos (0/1)
- **HvyAlcoholConsump**: Consumo excesivo de alcohol (0/1)
- **PhysActivity**: Actividad física últimos 30 días (0/1)
- **Fruits**: Consume frutas diariamente (0/1)
- **Veggies**: Consume verduras diariamente (0/1)

### Acceso a Salud
- **AnyHealthcare**: Tiene seguro médico (0/1)
- **NoDocbcCost**: No pudo ver doctor por costo (0/1)

### Información Demográfica
- **Sex**: Sexo (0=Mujer, 1=Hombre)
- **Age**: Categoría de edad (1-13)
- **Education**: Nivel educativo (1-6)
- **Income**: Nivel de ingresos (1-8)

## 🚀 Cómo Correr el Backend

### Requisitos Previos
- Python 3.7 o superior
- pip (gestor de paquetes de Python)

### Paso 1: Instalar Dependencias

```bash
cd d:\mchineLearning
py -m pip install pandas scikit-learn numpy flask flask-cors
```

### Paso 2: Reentrenar el Modelo (Opcional)

Si deseas reentrenar el modelo con datos actualizados:

```bash
py train_diabetes_012_model.py
```

Este script:
- Carga los datos desde `data/diabetes_012_health_indicators_BRFSS2015.csv`
- Entrena un modelo de Regresión Logística Multinomial
- Guarda el modelo en `data/diabetes_012_model.pkl`
- Guarda el scaler en `data/diabetes_012_scaler.pkl`

### Paso 3: Iniciar el Servidor Backend

```bash
py app.py
```

El servidor estará disponible en: **http://127.0.0.1:5000**

El backend expone el endpoint:
- **POST /predict**: Recibe 21 características y devuelve probabilidades

#### Ejemplo de Request:
```json
{
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
  "PhysHlth": 2,
  "DiffWalk": 0,
  "Sex": 1,
  "Age": 7,
  "Education": 4,
  "Income": 5
}
```

#### Ejemplo de Response:
```json
{
  "prob_no_diabetes": 0.65,
  "prob_prediabetes": 0.25,
  "prob_diabetes": 0.10,
  "prediction": 0
}
```

## 🎨 Cómo Correr el Frontend

### Requisitos Previos
- Node.js 14 o superior
- npm (gestor de paquetes de Node)

### Paso 1: Instalar Dependencias

```bash
cd d:\mchineLearning\front
npm install
```

### Paso 2: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

### Características del Frontend
- ✨ Diseño moderno y responsivo con Tailwind CSS
- 📊 Visualización de probabilidades con barras de progreso animadas
- 🎯 Formulario organizado por secciones
- ⚡ Validación en tiempo real
- 🎨 Interfaz intuitiva con emojis y colores

## 📁 Estructura del Proyecto

```
mchineLearning/
├── app.py                              # Backend Flask API
├── train_diabetes_012_model.py         # Script de entrenamiento
├── data/
│   ├── diabetes_012_model.pkl          # Modelo entrenado
│   ├── diabetes_012_scaler.pkl         # Scaler para normalización
│   └── diabetes_012_health_indicators_BRFSS2015.csv
└── front/
    ├── src/
    │   └── App.jsx                     # Componente principal React
    ├── package.json
    └── vite.config.js
```

## 🔧 Comandos Rápidos

### Backend
```bash
# Iniciar backend
cd d:\mchineLearning
py app.py

# Reentrenar modelo
py train_diabetes_012_model.py
```

### Frontend
```bash
# Iniciar frontend
cd d:\mchineLearning\front
npm run dev

# Build para producción
npm run build
```

## 🐛 Solución de Problemas

### El backend no inicia
- Verifica que Python esté instalado: `py --version`
- Verifica que todas las dependencias estén instaladas
- Asegúrate de que el puerto 5000 no esté ocupado

### El frontend no se conecta al backend
- Verifica que el backend esté corriendo en http://127.0.0.1:5000
- Revisa la configuración de CORS en `app.py`
- Verifica la URL del fetch en `App.jsx`

### Error al reentrenar el modelo
- Verifica que el archivo CSV exista en `data/`
- Asegúrate de tener suficiente memoria RAM
- Verifica que pandas y scikit-learn estén instalados

## 📊 Rendimiento del Modelo

El modelo utiliza:
- **Algoritmo**: Regresión Logística Multinomial
- **Características**: 21 variables de salud y demografía
- **Clases**: 0 (Sin diabetes), 1 (Prediabetes), 2 (Diabetes)
- **Preprocesamiento**: StandardScaler para normalización

## ⚠️ Disclaimer

Este sistema es una herramienta de análisis preliminar y **NO** reemplaza el diagnóstico médico profesional. Siempre consulte con un profesional de la salud para evaluaciones completas.

## 📝 Licencia

Este proyecto es de uso educativo y de investigación.
