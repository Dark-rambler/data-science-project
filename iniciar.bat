@echo off
echo ========================================
echo  Sistema de Prediccion de Diabetes
echo ========================================
echo.

echo [1/3] Verificando modelo entrenado...
if not exist "data\diabetes_012_model.pkl" (
    echo [!] Modelo no encontrado. Entrenando modelo...
    py train_diabetes_012_model.py
    echo [OK] Modelo entrenado exitosamente!
) else (
    echo [OK] Modelo encontrado!
)

echo.
echo [2/3] Iniciando Backend (Flask)...
start "Backend Flask" cmd /k "cd /d %~dp0 && py app.py"
timeout /t 3 /nobreak > nul

echo.
echo [3/3] Iniciando Frontend (React)...
start "Frontend React" cmd /k "cd /d %~dp0front && npm run dev"

echo.
echo ========================================
echo  Servidores iniciados!
echo ========================================
echo.
echo Backend:  http://127.0.0.1:5000
echo Frontend: http://localhost:5173
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
