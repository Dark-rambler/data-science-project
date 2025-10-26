
import { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    HighBP: '',
    HighChol: '',
    CholCheck: '',
    BMI: '',
    Smoker: '',
    Stroke: '',
    HeartDiseaseorAttack: '',
    PhysActivity: '',
    Fruits: '',
    Veggies: '',
    HvyAlcoholConsump: '',
    AnyHealthcare: '',
    NoDocbcCost: '',
    GenHlth: '',
    MentHlth: '',
    PhysHlth: '',
    DiffWalk: '',
    Sex: '',
    Age: '',
    Education: '',
    Income: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          HighBP: Number(form.HighBP),
          HighChol: Number(form.HighChol),
          CholCheck: Number(form.CholCheck),
          BMI: Number(form.BMI),
          Smoker: Number(form.Smoker),
          Stroke: Number(form.Stroke),
          HeartDiseaseorAttack: Number(form.HeartDiseaseorAttack),
          PhysActivity: Number(form.PhysActivity),
          Fruits: Number(form.Fruits),
          Veggies: Number(form.Veggies),
          HvyAlcoholConsump: Number(form.HvyAlcoholConsump),
          AnyHealthcare: Number(form.AnyHealthcare),
          NoDocbcCost: Number(form.NoDocbcCost),
          GenHlth: Number(form.GenHlth),
          MentHlth: Number(form.MentHlth),
          PhysHlth: Number(form.PhysHlth),
          DiffWalk: Number(form.DiffWalk),
          Sex: Number(form.Sex),
          Age: Number(form.Age),
          Education: Number(form.Education),
          Income: Number(form.Income)
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Error al conectar con la API.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 via-blue-800 to-slate-900 p-8 text-white">
            <h1 className="text-5xl font-bold text-center mb-3 drop-shadow-lg">🩺 Predicción de Diabetes</h1>
            <p className="text-center text-lg text-slate-200">Complete el formulario para evaluar su riesgo de diabetes</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Sección: Información de Salud General */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-700 mb-4 pb-2 border-b-2 border-slate-300">
                  📋 Información de Salud General
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Presión Alta</label>
                    <select name="HighBP" value={form.HighBP} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Colesterol Alto</label>
                    <select name="HighChol" value={form.HighChol} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Chequeo de Colesterol (5 años)</label>
                    <select name="CholCheck" value={form.CholCheck} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">IMC (Índice de Masa Corporal)</label>
                    <input type="number" step="0.1" name="BMI" value={form.BMI} onChange={handleChange} required placeholder="Ej: 25.5" className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Salud General (1-5)</label>
                    <select name="GenHlth" value={form.GenHlth} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="1">Excelente</option>
                      <option value="2">Muy Buena</option>
                      <option value="3">Buena</option>
                      <option value="4">Regular</option>
                      <option value="5">Mala</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Días de Salud Mental (0-30)</label>
                    <input type="number" min="0" max="30" name="MentHlth" value={form.MentHlth} onChange={handleChange} required placeholder="Días con mala salud mental" className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Días de Salud Física (0-30)</label>
                    <input type="number" min="0" max="30" name="PhysHlth" value={form.PhysHlth} onChange={handleChange} required placeholder="Días con mala salud física" className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md" />
                  </div>
                </div>
              </div>

              {/* Sección: Historial Médico */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-300">
                  🏥 Historial Médico
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Derrame Cerebral</label>
                    <select name="Stroke" value={form.Stroke} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Enfermedad Cardíaca</label>
                    <select name="HeartDiseaseorAttack" value={form.HeartDiseaseorAttack} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Dificultad para Caminar</label>
                    <select name="DiffWalk" value={form.DiffWalk} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sección: Estilo de Vida */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
                <h3 className="text-2xl font-bold text-teal-800 mb-4 pb-2 border-b-2 border-teal-300">
                  🏃 Estilo de Vida
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Fumador (100+ cigarrillos)</label>
                    <select name="Smoker" value={form.Smoker} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Consumo Excesivo de Alcohol</label>
                    <select name="HvyAlcoholConsump" value={form.HvyAlcoholConsump} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Actividad Física (30 días)</label>
                    <select name="PhysActivity" value={form.PhysActivity} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Consume Frutas Diariamente</label>
                    <select name="Fruits" value={form.Fruits} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Consume Verduras Diariamente</label>
                    <select name="Veggies" value={form.Veggies} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sección: Acceso a Cuidado de Salud */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
                <h3 className="text-2xl font-bold text-indigo-800 mb-4 pb-2 border-b-2 border-indigo-300">
                  💊 Acceso a Cuidado de Salud
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">¿Tiene Seguro Médico?</label>
                    <select name="AnyHealthcare" value={form.AnyHealthcare} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">¿No pudo ver doctor por costo?</label>
                    <select name="NoDocbcCost" value={form.NoDocbcCost} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sección: Información Demográfica */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-400">
                  👤 Información Demográfica
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Sexo</label>
                    <select name="Sex" value={form.Sex} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="0">Mujer</option>
                      <option value="1">Hombre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Edad (Categoría 1-13)</label>
                    <select name="Age" value={form.Age} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="1">18-24 años</option>
                      <option value="2">25-29 años</option>
                      <option value="3">30-34 años</option>
                      <option value="4">35-39 años</option>
                      <option value="5">40-44 años</option>
                      <option value="6">45-49 años</option>
                      <option value="7">50-54 años</option>
                      <option value="8">55-59 años</option>
                      <option value="9">60-64 años</option>
                      <option value="10">65-69 años</option>
                      <option value="11">70-74 años</option>
                      <option value="12">75-79 años</option>
                      <option value="13">80+ años</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nivel Educativo (1-6)</label>
                    <select name="Education" value={form.Education} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="1">Nunca asistió o solo Kinder</option>
                      <option value="2">Primaria</option>
                      <option value="3">Secundaria</option>
                      <option value="4">Preparatoria</option>
                      <option value="5">Universidad</option>
                      <option value="6">Universidad graduado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ingreso (1-8)</label>
                    <select name="Income" value={form.Income} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white shadow-sm hover:shadow-md">
                      <option value="">Seleccione</option>
                      <option value="1">Menos de $10,000</option>
                      <option value="2">$10,000 - $15,000</option>
                      <option value="3">$15,000 - $20,000</option>
                      <option value="4">$20,000 - $25,000</option>
                      <option value="5">$25,000 - $35,000</option>
                      <option value="6">$35,000 - $50,000</option>
                      <option value="7">$50,000 - $75,000</option>
                      <option value="8">$75,000 o más</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botón Submit */}
              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xl font-bold rounded-lg shadow-xl hover:from-blue-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analizando datos...
                    </span>
                  ) : (
                    '🔍 Calcular Riesgo de Diabetes'
                  )}
                </button>
              </div>
            </form>

            {/* Resultados */}
            {result && (
              <div className="mt-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl p-8 shadow-2xl border-4 border-purple-300 animate-fadeIn">
                {result.error ? (
                  <div className="text-center bg-red-100 p-6 rounded-xl border-2 border-red-300">
                    <span className="text-red-600 font-bold text-xl">❌ {result.error}</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-6">📊 Resultados del Análisis</h3>
                    
                    {/* Predicción Principal */}
                    <div className={`rounded-2xl p-8 shadow-xl border-4 transform hover:scale-105 transition-all duration-300 ${
                      result.prediction === 2 ? 'bg-gradient-to-br from-red-100 to-red-200 border-red-400' : 
                      result.prediction === 1 ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400' : 
                      'bg-gradient-to-br from-green-100 to-green-200 border-green-400'
                    }`}>
                      <p className="text-center text-xl mb-3 text-gray-700 font-semibold">Diagnóstico Predictivo:</p>
                      <p className="text-center text-4xl font-extrabold drop-shadow-lg">
                        <span className={result.prediction === 2 ? 'text-red-700' : result.prediction === 1 ? 'text-yellow-700' : 'text-green-700'}>
                          {result.prediction === 2 ? '⚠️ Diabetes' : result.prediction === 1 ? '⚡ Prediabetes' : '✅ Sin Diabetes'}
                        </span>
                      </p>
                    </div>

                    {/* Probabilidades */}
                    <div className="space-y-4">
                      {/* No Diabetes */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">Sin Diabetes</span>
                          <span className="text-sm font-bold text-green-600">{((result.prob_no_diabetes ?? 0) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500" style={{ width: `${((result.prob_no_diabetes ?? 0) * 100).toFixed(2)}%` }}></div>
                        </div>
                      </div>

                      {/* Prediabetes */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">Prediabetes</span>
                          <span className="text-sm font-bold text-yellow-600">{((result.prob_prediabetes ?? 0) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full transition-all duration-500" style={{ width: `${((result.prob_prediabetes ?? 0) * 100).toFixed(2)}%` }}></div>
                        </div>
                      </div>

                      {/* Diabetes */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">Diabetes</span>
                          <span className="text-sm font-bold text-red-600">{((result.prob_diabetes ?? 0) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div className="bg-gradient-to-r from-red-400 to-red-600 h-full rounded-full transition-all duration-500" style={{ width: `${((result.prob_diabetes ?? 0) * 100).toFixed(2)}%` }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Nota Importante */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="text-sm text-yellow-800">
                        <strong>⚠️ Nota Importante:</strong> Este es un análisis preliminar. Consulte con un profesional de la salud para un diagnóstico completo.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
