import React, { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import Results from './components/Results';
import LanguageSwitcher from './components/LanguageSwitcher';
import MonteCarloSimulation from './components/MonteCarloSimulation';
import { FireInputs, CalculationResult, MonteCarloResult } from './types';
import { FireCalculator } from './utils/calculator';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import './App.css';

const getDefaultInputs = (language: 'zh-TW' | 'en-US'): FireInputs => {
  // 根據語言設定不同的預設稅率
  const isTaiwan = language === 'zh-TW';
  
  return {
    withdrawal: isTaiwan ? 1500000 : 50000, // 台灣：150萬台幣，美國：5萬美元
    inflation: 2.0,
    dividendYield: 2.0,
    priceGrowth: 3.0,
    years: 30,
    timing: 'end',
    feeRate: 0.25,
    accountType: 'taxable',
    dividendTaxRate: isTaiwan ? 28.0 : 15.0, // 台灣：28%，美國：15%
    capitalGainsTaxRate: isTaiwan ? 15.0 : 15.0, // 台灣：15%，美國：15%
    withdrawalTaxRate: 20.0,
    targetMode: 'gross',
    
    // v1.3 高擬真稅制
    useAdvancedTax: false,
    taxBrackets: isTaiwan ? [
      { minIncome: 0, maxIncome: 540000, rate: 5 },
      { minIncome: 540000, maxIncome: 1210000, rate: 12 },
      { minIncome: 1210000, maxIncome: 2420000, rate: 20 },
      { minIncome: 2420000, maxIncome: 4530000, rate: 30 },
      { minIncome: 4530000, maxIncome: 10310000, rate: 40 },
      { minIncome: 10310000, maxIncome: null, rate: 45 }
    ] : [
      { minIncome: 0, maxIncome: 11600, rate: 10 },
      { minIncome: 11600, maxIncome: 47150, rate: 12 },
      { minIncome: 47150, maxIncome: 100525, rate: 22 },
      { minIncome: 100525, maxIncome: 191950, rate: 24 },
      { minIncome: 191950, maxIncome: 243725, rate: 32 },
      { minIncome: 243725, maxIncome: 609350, rate: 35 },
      { minIncome: 609350, maxIncome: null, rate: 37 }
    ],
    exemptions: {
      personalExemption: isTaiwan ? 92000 : 0,
      standardDeduction: isTaiwan ? 124000 : 14600,
      dividendExemption: isTaiwan ? 270000 : 0,
      capitalGainsExemption: isTaiwan ? 600000 : 0
    },
    withholdingTax: {
      dividendWithholding: isTaiwan ? 30.0 : 15.0,
      foreignWithholding: 15.0,
      applyToForeign: false
    },
    
    // v2.0 房產模組
    useRealEstate: false,
    propertyValue: isTaiwan ? 15000000 : 500000, // 台灣：1500萬台幣，美國：50萬美元
    annualRent: isTaiwan ? 360000 : 24000, // 台灣：36萬台幣，美國：2.4萬美元
    vacancyRate: 10.0,
    maintenanceRate: 1.5,
    propertyGrowthRate: 3.0,
    propertyVolatility: 6.0,
    mortgageAmount: isTaiwan ? 10000000 : 400000, // 台灣：1000萬台幣，美國：40萬美元
    mortgageRate: 2.0,
    mortgageYears: 20,
    rentTaxRate: 15.0,

    // v2.0 風險熱圖
    useRiskHeatmap: false,
    stockAllocation: 60.0,
    bondAllocation: 40.0,
    stockReturn: 7.0,
    stockVolatility: 15.0,
    bondReturn: 3.0,
    bondVolatility: 6.0,
    stockBondCorrelation: 0.25,
    stockPropertyCorrelation: 0.40,
    bondPropertyCorrelation: 0.10
  };
};

const AppContent: React.FC = () => {
  const { t, language } = useLanguage();
  const [inputs, setInputs] = useState<FireInputs>(getDefaultInputs(language));
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [monteCarloResult, setMonteCarloResult] = useState<MonteCarloResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // 當語言改變時，更新預設值
  React.useEffect(() => {
    setInputs(getDefaultInputs(language));
  }, [language]);

  const handleInputChange = useCallback((field: keyof FireInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const calculate = useCallback(async () => {
    try {
      setError(null);
      setIsCalculating(true);
      
      const calculator = new FireCalculator(inputs);
      const calculationResult = calculator.calculate();
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.genericError);
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  }, [inputs, t.genericError]);

  // 當參數改變時自動重新計算
  React.useEffect(() => {
    calculate();
  }, [calculate]);

  // 當風險熱圖開關改變時，如果是啟用狀態則立即計算
  React.useEffect(() => {
    if (inputs.useRiskHeatmap) {
      calculate();
    }
  }, [inputs.useRiskHeatmap, calculate]);

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
          <InputForm 
            inputs={inputs} 
            onInputChange={handleInputChange} 
            onCalculate={calculate}
            isCalculating={isCalculating}
          />
          <Results 
            result={result} 
            error={error} 
            isCalculating={isCalculating}
            inputs={inputs}
            onInputChange={handleInputChange}
            onCalculate={calculate}
          />
          <MonteCarloSimulation 
            onResultChange={setMonteCarloResult}
          />
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
