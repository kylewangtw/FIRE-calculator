import React, { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import Results from './components/Results';
import LanguageSwitcher from './components/LanguageSwitcher';
import { FireInputs, CalculationResult } from './types';
import { FireCalculator } from './utils/calculator';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import './App.css';

const defaultInputs: FireInputs = {
  withdrawal: 1500000,
  inflation: 2.0,
  dividendYield: 2.0,
  priceGrowth: 3.0,
  years: 30,
  timing: 'end',
  feeRate: 0.25,
  accountType: 'taxable',
  dividendTaxRate: 28.0,
  capitalGainsTaxRate: 15.0,
  withdrawalTaxRate: 20.0,
  targetMode: 'gross'
};

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<FireInputs>(defaultInputs);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof FireInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const calculate = useCallback(() => {
    try {
      setError(null);
      const calculator = new FireCalculator(inputs);
      const calculationResult = calculator.calculate();
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.genericError);
      setResult(null);
    }
  }, [inputs, t.genericError]);

  // 當輸入改變時自動重新計算
  React.useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600">
            {t.subtitle}
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          <InputForm inputs={inputs} onInputChange={handleInputChange} />
          <Results result={result} error={error} />
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p className="mb-4">
            {t.disclaimer}
          </p>
          <LanguageSwitcher />
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
