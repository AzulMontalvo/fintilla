import { useState, useEffect } from 'react';
import type { GenerationOptions, NumberResult } from '../../domain/methods/randomAmount';
import {
  validateInputs,
  createNumberResult,
  loadHistoryFromStorage,
  saveHistoryToStorage,
  addToHistory
} from '../../domain/methods/randomAmount';

const RandomNumberGenerator = () => {
  const [history, setHistory] = useState<NumberResult[]>([]);
  const [currentResult, setCurrentResult] = useState<NumberResult | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  const [formData, setFormData] = useState<GenerationOptions>({
    total: 100,
    count: 5,
    useLimits: false,
    minValue: 0,
    maxValue: 100,
    numberType: 'any',
    multipleOf: 5
  });

  useEffect(() => {
    setHistory(loadHistoryFromStorage());
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      saveHistoryToStorage(history);
    }
  }, [history]);

  const handleGenerate = () => {
    const validation = validateInputs(formData);
    
    if (!validation.isValid) {
      setError(validation.message);
      setSuccess('');
      return;
    }

    const result = createNumberResult(formData);
    setCurrentResult(result);
    setHistory(prev => addToHistory(prev, result));
    setSuccess('¡Números generados correctamente!');
    setError('');
  };

  const handleInputChange = (field: keyof GenerationOptions, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
          Generador de Números Aleatorios
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Configuración</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total (suma objetivo)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.total}
                  onChange={(e) => handleInputChange('total', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad de números
                </label>
                <input
                  type="number"
                  value={formData.count}
                  onChange={(e) => handleInputChange('count', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.useLimits}
                    onChange={(e) => handleInputChange('useLimits', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Usar límites personalizados</span>
                </label>
              </div>

              {formData.useLimits && (
                <div className="space-y-4 pl-6 border-l-2 border-indigo-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor mínimo
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.minValue}
                      onChange={(e) => handleInputChange('minValue', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor máximo
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.maxValue}
                      onChange={(e) => handleInputChange('maxValue', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de número
                </label>
                <select
                  value={formData.numberType}
                  onChange={(e) => handleInputChange('numberType', e.target.value as 'any' | 'multiple')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="any">Cualquier número</option>
                  <option value="multiple">Múltiplos de...</option>
                </select>
              </div>

              {formData.numberType === 'multiple' && (
                <div className="pl-6 border-l-2 border-indigo-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Múltiplo de
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.multipleOf}
                    onChange={(e) => handleInputChange('multipleOf', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              )}

              <button
                onClick={handleGenerate}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors duration-200"
              >
                Generar Números
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                {success}
              </div>
            )}
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {currentResult && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resultado Actual</h2>
                
                <div className="mb-4 p-4 bg-indigo-50 rounded-md">
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><strong>Total configurado:</strong> {currentResult.options.total}</div>
                    <div><strong>Cantidad de números:</strong> {currentResult.options.count}</div>
                    <div><strong>Tipo:</strong> {currentResult.options.numberType === 'any' ? 'Cualquier número' : `Múltiplos de ${currentResult.options.multipleOf}`}</div>
                  </div>
                  <div className="mt-3 text-xl font-bold text-indigo-700">
                    Suma real: {currentResult.sum.toFixed(2)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {currentResult.numbers.map((num, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-lg text-center font-semibold shadow-md"
                    >
                      {num.toFixed(2)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Historial */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Historial</h2>
              
              {history.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Los resultados generados aparecerán aquí.</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {history.map((result, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold text-gray-800">Generación #{index + 1}</div>
                          <div className="text-xs text-gray-500">
                            {result.timestamp.toLocaleDateString()} {result.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-indigo-700">Total: {result.options.total}</div>
                          <div className="text-xs text-gray-500">{result.options.count} números</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-1 my-2">
                        {result.numbers.map((num, i) => (
                          <div key={i} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs text-center font-medium">
                            {num.toFixed(2)}
                          </div>
                        ))}
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Suma:</strong> {result.sum.toFixed(2)} | <strong>Tipo:</strong> {result.options.numberType === 'any' ? 'Cualquier número' : `Múltiplos de ${result.options.multipleOf}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomNumberGenerator;