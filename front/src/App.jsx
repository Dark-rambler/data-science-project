
import { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    Diabetes_012: '',
    HighBP: '',
    HighChol: '',
    CholCheck: '',
    BMI: '',
    Smoker: '',
    Stroke: '',
    HeartDiseaseorAttack: '',
    PhysActivity: '',
    Fruits: ''
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
          Diabetes_012: Number(form.Diabetes_012),
          HighBP: Number(form.HighBP),
          HighChol: Number(form.HighChol),
          CholCheck: Number(form.CholCheck),
          BMI: Number(form.BMI),
          Smoker: Number(form.Smoker),
          Stroke: Number(form.Stroke),
          HeartDiseaseorAttack: Number(form.HeartDiseaseorAttack),
          PhysActivity: Number(form.PhysActivity),
          Fruits: Number(form.Fruits)
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Predicción de Diabetes</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Diabetes (0: No, 1: Prediabetes, 2: Diabetes)</label>
            <input type="number" name="Diabetes_012" value={form.Diabetes_012} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Presión alta (0: No, 1: Sí)</label>
            <input type="number" name="HighBP" value={form.HighBP} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Colesterol alto (0: No, 1: Sí)</label>
            <input type="number" name="HighChol" value={form.HighChol} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Chequeo de colesterol en 5 años (0: No, 1: Sí)</label>
            <input type="number" name="CholCheck" value={form.CholCheck} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">IMC</label>
            <input type="number" step="any" name="BMI" value={form.BMI} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">¿Ha fumado al menos 100 cigarrillos? (0: No, 1: Sí)</label>
            <input type="number" name="Smoker" value={form.Smoker} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">¿Ha tenido un derrame cerebral? (0: No, 1: Sí)</label>
            <input type="number" name="Stroke" value={form.Stroke} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">¿Ha tenido enfermedad cardíaca o ataque? (0: No, 1: Sí)</label>
            <input type="number" name="HeartDiseaseorAttack" value={form.HeartDiseaseorAttack} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Actividad física en últimos 30 días (0: No, 1: Sí)</label>
            <input type="number" name="PhysActivity" value={form.PhysActivity} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Consume fruta 1+ veces al día (0: No, 1: Sí)</label>
            <input type="number" name="Fruits" value={form.Fruits} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
            {loading ? 'Calculando...' : 'Predecir'}
          </button>
        </form>
        {result && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow">
            {result.error ? (
              <span className="text-red-600 font-bold">{result.error}</span>
            ) : (
              <>
                <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-red-500" style={{ width: `${((result.prob_diabetes ?? 0) * 100).toFixed(2)}%` }}></div>
                </div>
                <p className="text-lg font-bold text-blue-700 mb-2">Probabilidad de diabetes: {((result.prob_diabetes ?? 0) * 100).toFixed(2)}%</p>
                <p className="text-md font-semibold text-gray-700">Probabilidad de no diabetes: {((result.prob_no_diabetes ?? 0) * 100).toFixed(2)}%</p>
                <p className="text-md font-semibold text-gray-700">Probabilidad de prediabetes: {((result.prob_prediabetes ?? 0) * 100).toFixed(2)}%</p>
                <p className="text-md font-semibold text-gray-700">Predicción: <span className={result.prediction === 2 ? 'text-red-600' : result.prediction === 1 ? 'text-yellow-600' : 'text-green-600'}>{result.prediction === 2 ? 'Diabetes' : result.prediction === 1 ? 'Prediabetes' : 'No diabetes'}</span></p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
