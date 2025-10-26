# 🩺 Sistema de Predicción de Diabetes - BRFSS 2015

Este proyecto utiliza Machine Learning para predecir el riesgo de diabetes basado en 21 indicadores de salud del conjunto de datos BRFSS 2015.

## 📋 Requisitos Previos

- Python 3.x instalado
- Node.js y npm instalados
- Dataset: `diabetes_012_health_indicators_BRFSS2015.csv` en la carpeta `data/`

## 🚀 Instalación

### 1. Instalar Dependencias de Python

```bash
cd d:\mchineLearning
py -m pip install pandas scikit-learn numpy flask flask-cors
```

### 2. Instalar Dependencias del Frontend

```bash
cd d:\mchineLearning\front
npm install
```

## 🎯 Entrenar el Modelo

Antes de correr el backend, debes entrenar el modelo con las 21 características:

```bash
cd d:\mchineLearning
py train_diabetes_012_model.py
```

Esto generará dos archivos en la carpeta `data/`:
- `diabetes_012_model.pkl` - Modelo entrenado
- `diabetes_012_scaler.pkl` - Scaler para normalizar datos

## 🖥️ Correr el Backend

### Opción 1: En una terminal nueva

```bash
cd d:\mchineLearning
py app.py
```

El backend estará disponible en: **http://127.0.0.1:5000**

### Opción 2: En segundo plano

```bash
cd d:\mchineLearning
start py app.py
```

## 🎨 Correr el Frontend

En una **terminal diferente**:

```bash
cd d:\mchineLearning\front
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

## ✅ Verificar que todo funciona

1. ✔️ Backend corriendo en puerto 5000
2. ✔️ Frontend corriendo en puerto 5173
3. ✔️ Abrir http://localhost:5173 en el navegador
4. ✔️ Completar el formulario y hacer clic en "Calcular Riesgo"

## 📊 Las 21 Características del Modelo

El modelo utiliza los siguientes 21 indicadores de salud:

### Salud General (7 características)
1. **HighBP** - Presión arterial alta (0: No, 1: Sí)
2. **HighChol** - Colesterol alto (0: No, 1: Sí)
3. **CholCheck** - Chequeo de colesterol en últimos 5 años (0: No, 1: Sí)
4. **BMI** - Índice de Masa Corporal (valor numérico)
5. **GenHlth** - Salud general (1: Excelente, 5: Mala)
6. **MentHlth** - Días con mala salud mental (0-30)
7. **PhysHlth** - Días con mala salud física (0-30)

### Historial Médico (3 características)
8. **Stroke** - Derrame cerebral (0: No, 1: Sí)
9. **HeartDiseaseorAttack** - Enfermedad cardíaca o ataque (0: No, 1: Sí)
10. **DiffWalk** - Dificultad para caminar (0: No, 1: Sí)

### Estilo de Vida (5 características)
11. **Smoker** - Fumador, 100+ cigarrillos (0: No, 1: Sí)
12. **HvyAlcoholConsump** - Consumo excesivo de alcohol (0: No, 1: Sí)
13. **PhysActivity** - Actividad física últimos 30 días (0: No, 1: Sí)
14. **Fruits** - Consume frutas diariamente (0: No, 1: Sí)
15. **Veggies** - Consume verduras diariamente (0: No, 1: Sí)

### Acceso a Salud (2 características)
16. **AnyHealthcare** - Tiene seguro médico (0: No, 1: Sí)
17. **NoDocbcCost** - No pudo ver doctor por costo (0: No, 1: Sí)

### Información Demográfica (4 características)
18. **Sex** - Sexo (0: Mujer, 1: Hombre)
19. **Age** - Categoría de edad (1-13)
20. **Education** - Nivel educativo (1-6)
21. **Income** - Nivel de ingresos (1-8)

## 🎨 Características del Formulario

- ✨ Diseño moderno con gradientes coloridos
- 📱 Responsive (se adapta a móviles y tablets)
- 🎯 Validación de campos
- 🌈 Secciones organizadas por categorías con colores distintivos:
  - 💜 Información de Salud General (Morado/Rosa)
  - ❤️ Historial Médico (Rojo/Naranja)
  - 💚 Estilo de Vida (Verde)
  - 💙 Acceso a Cuidado de Salud (Cyan/Azul)
  - 🧡 Información Demográfica (Ámbar/Amarillo)
- 📊 Visualización de resultados con barras de progreso animadas

## ⚠️ Solución de Problemas

### Error de CORS
Si ves un error de CORS, verifica que:
- El backend esté corriendo en el puerto 5000
- El archivo `app.py` tenga `CORS(app, resources={r"/*": {"origins": "*"}})` configurado

### Error "Module not found"
Instala las dependencias faltantes:
```bash
py -m pip install <nombre-del-paquete>
```

### El modelo no existe
Ejecuta primero el script de entrenamiento:
```bash
py train_diabetes_012_model.py
```

## 📝 Notas Importantes

- ⚕️ Este es un modelo predictivo con fines educativos
- 🏥 NO reemplaza el diagnóstico médico profesional
- 📊 Basado en datos de BRFSS 2015
- 🎯 Clasifica en: Sin Diabetes, Prediabetes, o Diabetes

## 🛠️ Stack Tecnológico

### Backend
- Python 3.x
- Flask (Framework web)
- Flask-CORS (Manejo de CORS)
- Scikit-learn (Machine Learning)
- Pandas (Procesamiento de datos)
- NumPy (Cálculos numéricos)

### Frontend
- React 18
- Vite (Build tool)
- TailwindCSS (Estilos)
- JavaScript ES6+

## 📧 Soporte

Si tienes problemas, verifica:
1. Que ambos servidores estén corriendo
2. Que los puertos 5000 y 5173 estén disponibles
3. Que el modelo esté entrenado y guardado en `data/`
4. Que todas las dependencias estén instaladas

---

✨ **¡Listo! Ahora puedes predecir el riesgo de diabetes con Machine Learning!** ✨
