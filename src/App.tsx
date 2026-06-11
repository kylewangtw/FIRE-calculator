import React, { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import Results from './components/Results';
import LanguageSwitcher from './components/LanguageSwitcher';
import MonteCarloSimulation from './components/MonteCarloSimulation';
import AccountComparison from './components/AccountComparison';
import CurrentSnapshotForm from './components/CurrentSnapshotForm';
import SnapshotDashboard from './components/SnapshotDashboard';
import { FireInputs, CalculationResult, MonteCarloResult, SnapshotInputs } from './types';
import { FireCalculator } from './utils/calculator';
import { calcSnapshotMetrics } from './utils/snapshotCalculator';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import './App.css';

const getDefaultInputs = (language: 'zh-TW' | 'en-US'): FireInputs => {
  const isTaiwan = language === 'zh-TW';
  return {
    withdrawal: isTaiwan ? 1500000 : 50000,
    inflation: 2.0,
    dividendYield: 2.0,
    priceGrowth: 3.0,
    years: 30,
    timing: 'end',
    feeRate: 0.25,
    accountType: 'taxable',
    dividendTaxRate: isTaiwan ? 28.0 : 15.0,
    capitalGainsTaxRate: 15.0,
    withdrawalTaxRate: 20.0,
    targetMode: 'gross',
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
    useRealEstate: false,
    propertyValue: isTaiwan ? 15000000 : 500000,
    annualRent: isTaiwan ? 360000 : 24000,
    vacancyRate: 10.0,
    maintenanceRate: 1.5,
    propertyGrowthRate: 3.0,
    propertyVolatility: 6.0,
    mortgageAmount: isTaiwan ? 10000000 : 400000,
    mortgageRate: 2.0,
    mortgageYears: 20,
    rentTaxRate: 15.0,
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

const getDefaultSnapshot = (language: 'zh-TW' | 'en-US'): SnapshotInputs => ({
  totalAssets: 0,
  totalLiabilities: 0,
  annualSavings: language === 'zh-TW' ? 1000000 : 30000,
});

// Step indicator for mobile wizard
const StepIndicator: React.FC<{ currentStep: number; labels: string[] }> = ({
  currentStep,
  labels,
}) => (
  <div className="flex items-center justify-center px-6 py-3">
    {labels.map((label, i) => (
      <React.Fragment key={i}>
        <div className="flex flex-col items-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
              ${i < currentStep
                ? 'bg-green-600 text-white'
                : i === currentStep
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-400'}`}
          >
            {i < currentStep ? '✓' : i + 1}
          </div>
          <span
            className={`text-[10px] mt-1 font-semibold
              ${i === currentStep ? 'text-blue-600' : 'text-slate-400'}`}
          >
            {label}
          </span>
        </div>
        {i < labels.length - 1 && (
          <div
            className={`h-0.5 flex-1 mx-2 mb-4 transition-colors
              ${i < currentStep ? 'bg-green-600' : 'bg-slate-200'}`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

type DesktopTab = 'results' | 'montecarlo';

const AppContent: React.FC = () => {
  const { t, language } = useLanguage();

  const [inputs, setInputs] = useState<FireInputs>(getDefaultInputs(language));
  const [snapshot, setSnapshot] = useState<SnapshotInputs>(getDefaultSnapshot(language));
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [monteCarloResult, setMonteCarloResult] = useState<MonteCarloResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Mobile step wizard state
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  // Desktop tab state
  const [activeTab, setActiveTab] = useState<DesktopTab>('results');

  // Reset inputs when language changes
  React.useEffect(() => {
    setInputs(getDefaultInputs(language));
    setSnapshot(getDefaultSnapshot(language));
  }, [language]);

  const handleInputChange = useCallback((field: keyof FireInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSnapshotChange = useCallback((field: keyof SnapshotInputs, value: number) => {
    setSnapshot((prev) => ({ ...prev, [field]: value }));
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

  React.useEffect(() => {
    calculate();
  }, [calculate]);

  React.useEffect(() => {
    if (inputs.useRiskHeatmap) {
      calculate();
    }
  }, [inputs.useRiskHeatmap, calculate]);

  const annualReturn =
    (inputs.dividendYield + inputs.priceGrowth) / 100 - inputs.feeRate / 100;

  const metrics =
    result
      ? calcSnapshotMetrics(
          snapshot,
          result,
          inputs.accountType,
          inputs.withdrawal,
          Math.max(annualReturn, 0.01)
        )
      : null;

  const stepLabels = [t.stepGoal, t.stepSnapshot, t.stepResult];

  // ── Mobile wizard ──────────────────────────────────────────────────────────

  const MobileLayout = () => (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-5 py-3">
          <h1 className="text-[17px] font-black text-slate-900">{t.title}</h1>
          <LanguageSwitcher />
        </div>
        <StepIndicator currentStep={currentStep} labels={stepLabels} />
      </div>

      <div className="max-w-lg mx-auto pt-2 pb-24">
        {/* Step 0 — Goal inputs */}
        {currentStep === 0 && (
          <div className="bg-white rounded-[20px] shadow-[0_18px_44px_rgba(15,23,42,0.08)] mx-4 mt-4 overflow-hidden">
            <InputForm
              inputs={inputs}
              onInputChange={handleInputChange}
              onCalculate={calculate}
              isCalculating={isCalculating}
            />
            <div className="px-5 pb-5">
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full py-4 bg-blue-600 text-white text-[16px] font-black rounded-[13px] shadow-[0_8px_18px_rgba(37,99,235,0.28)] active:opacity-90"
              >
                {t.nextEnterSnapshot}
              </button>
            </div>
          </div>
        )}

        {/* Step 1 — Snapshot inputs */}
        {currentStep === 1 && (
          <div className="bg-white rounded-[20px] shadow-[0_18px_44px_rgba(15,23,42,0.08)] mx-4 mt-4 overflow-hidden">
            <CurrentSnapshotForm
              snapshot={snapshot}
              onSnapshotChange={handleSnapshotChange}
              onNext={() => setCurrentStep(2)}
            />
          </div>
        )}

        {/* Step 2 — Dashboard + optional full analysis */}
        {currentStep === 2 && (
          <div className="space-y-4 mt-4">
            {metrics ? (
              <div className="bg-white rounded-[20px] shadow-[0_18px_44px_rgba(15,23,42,0.08)] mx-4 overflow-hidden">
                <SnapshotDashboard
                  snapshot={snapshot}
                  metrics={metrics}
                  result={result!}
                  inputs={inputs}
                  onInputChange={handleInputChange}
                  onEditGoal={() => { setCurrentStep(0); setShowFullAnalysis(false); }}
                  onEditSnapshot={() => { setCurrentStep(1); setShowFullAnalysis(false); }}
                  onViewFullAnalysis={() => setShowFullAnalysis(true)}
                  showFullAnalysis={showFullAnalysis}
                />
              </div>
            ) : (
              <div className="bg-white rounded-[20px] mx-4 px-5 py-6 text-center text-slate-500">
                {isCalculating ? t.calculating : t.calculationError}
              </div>
            )}

            {/* Full analysis */}
            {showFullAnalysis && result && (
              <div className="mx-4 space-y-4">
                <AccountComparison result={result} />
                <Results
                  result={result}
                  error={error}
                  isCalculating={isCalculating}
                  inputs={inputs}
                  onInputChange={handleInputChange}
                  onCalculate={calculate}
                />
                <div className="bg-white rounded-[20px] shadow-[0_18px_44px_rgba(15,23,42,0.08)] overflow-hidden">
                  <MonteCarloSimulation onResultChange={setMonteCarloResult} />
                </div>
              </div>
            )}

            {error && !metrics && (
              <div className="mx-4 bg-red-50 border border-red-200 rounded-[14px] p-4 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile footer */}
      <footer className="text-center text-slate-500 text-xs px-4 pb-8 mt-6">
        <p>{t.disclaimer}</p>
      </footer>
    </div>
  );

  // ── Desktop two-column layout ───────────────────────────────────────────────

  const DesktopLayout = () => (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top tab bar */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h1 className="text-[18px] font-black text-slate-900 mr-6">{t.title}</h1>
            {(
              [
                { key: 'results', label: t.stepResult + ' & ' + t.stepGoal },
                { key: 'montecarlo', label: t.monteCarloSimulation },
              ] as { key: DesktopTab; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors
                  ${activeTab === key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {activeTab === 'results' && (
        <div className="flex flex-1 max-w-7xl mx-auto w-full">
          {/* Left column — inputs */}
          <div className="w-80 flex-shrink-0 border-r border-slate-200 bg-white overflow-y-auto">
            <div className="py-4">
              <InputForm
                inputs={inputs}
                onInputChange={handleInputChange}
                onCalculate={calculate}
                isCalculating={isCalculating}
              />
              <div className="px-5 pt-2 border-t border-slate-100">
                <p className="text-[12px] font-bold text-slate-400 mb-3">{t.currentSnapshot}</p>
                <CurrentSnapshotForm
                  snapshot={snapshot}
                  onSnapshotChange={handleSnapshotChange}
                  onNext={() => {}}
                />
              </div>
            </div>
          </div>

          {/* Right column — results */}
          <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="p-6 space-y-5 max-w-3xl">
              {isCalculating && (
                <div className="flex items-center gap-3 bg-white rounded-[14px] px-4 py-3 text-slate-500 text-sm shadow-sm">
                  <svg className="animate-spin h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t.calculating}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-[14px] px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Dashboard card */}
              {metrics && result && (
                <div className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(15,23,42,0.07)] overflow-hidden">
                  <div className="flex items-center gap-4 px-6 py-5">
                    {/* Smaller donut for desktop */}
                    <div className="flex-shrink-0">
                      <svg width={104} height={104} viewBox="0 0 104 104">
                        {(() => {
                          const sz = 104;
                          const r = sz / 2 - 9;
                          const cx = sz / 2;
                          const cy = sz / 2;
                          const circ = 2 * Math.PI * r;
                          const pct = Math.min(Math.max(metrics.fireAchievementPct, 0), 1);
                          const offset = circ * (1 - pct);
                          return (
                            <g transform={`rotate(-90, ${cx}, ${cy})`}>
                              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eef1f5" strokeWidth={9} />
                              <circle
                                cx={cx} cy={cy} r={r} fill="none"
                                stroke={pct >= 1 ? '#16a34a' : '#2563eb'}
                                strokeWidth={9}
                                strokeLinecap="round"
                                strokeDasharray={circ}
                                strokeDashoffset={offset}
                              />
                            </g>
                          );
                        })()}
                        <text x={52} y={48} textAnchor="middle" fontSize={22} fontWeight={900} fill="#0f172a">
                          {Math.round(metrics.fireAchievementPct * 100)}%
                        </text>
                        <text x={52} y={64} textAnchor="middle" fontSize={9} fontWeight={700} fill="#3b82f6">
                          {t.fireAchievement}
                        </text>
                      </svg>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div>
                        <p className="text-[11px] font-semibold text-slate-500">{t.gapToTarget}</p>
                        <p className={`text-[20px] font-black ${metrics.gapToTarget > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                          {metrics.gapToTarget > 0
                            ? `−${new Intl.NumberFormat(language === 'zh-TW' ? 'zh-TW' : 'en-US', {
                                style: 'currency',
                                currency: language === 'zh-TW' ? 'TWD' : 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(metrics.gapToTarget)}`
                            : language === 'zh-TW' ? '✓ 已達成' : '✓ Achieved'}
                        </p>
                      </div>
                      {metrics.estYearsToFire > 0 && metrics.estYearsToFire < 999 && (
                        <p className="text-[12px] text-slate-400">
                          {language === 'zh-TW'
                            ? `預估約 ${metrics.estYearsToFire} 年達成`
                            : `Est. ${metrics.estYearsToFire} years to FIRE`}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Three number cards */}
                  <div className="grid grid-cols-3 gap-3 px-6 pb-5">
                    <div className="bg-slate-50 rounded-[12px] border border-slate-200 px-3 py-2.5">
                      <p className="text-[10px] font-semibold text-slate-500 mb-1">
                        {language === 'zh-TW' ? '所需起始資產' : 'Required Assets'}
                      </p>
                      <p className="text-[14px] font-black text-slate-900">
                        {new Intl.NumberFormat(language === 'zh-TW' ? 'zh-TW' : 'en-US', {
                          style: 'currency',
                          currency: language === 'zh-TW' ? 'TWD' : 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                          notation: 'compact',
                        }).format(metrics.targetRequired)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-[12px] border border-slate-200 px-3 py-2.5">
                      <p className="text-[10px] font-semibold text-slate-500 mb-1">{t.netWorth}</p>
                      <p className="text-[14px] font-black text-slate-900">
                        {new Intl.NumberFormat(language === 'zh-TW' ? 'zh-TW' : 'en-US', {
                          style: 'currency',
                          currency: language === 'zh-TW' ? 'TWD' : 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                          notation: 'compact',
                        }).format(metrics.netWorth)}
                      </p>
                    </div>
                    <div
                      className={`rounded-[12px] border px-3 py-2.5
                        ${metrics.currentWithdrawalRate <= 0.04
                          ? 'bg-green-50 border-green-200'
                          : metrics.currentWithdrawalRate <= 0.05
                          ? 'bg-amber-50 border-amber-200'
                          : 'bg-red-50 border-red-200'}`}
                    >
                      <p className="text-[10px] font-semibold text-slate-500 mb-1">
                        {t.withdrawalSafety}
                      </p>
                      <p className={`text-[14px] font-black
                        ${metrics.currentWithdrawalRate <= 0.04
                          ? 'text-green-700'
                          : metrics.currentWithdrawalRate <= 0.05
                          ? 'text-amber-700'
                          : 'text-red-700'}`}
                      >
                        {metrics.currentWithdrawalRate <= 0.04
                          ? t.safetyLow
                          : metrics.currentWithdrawalRate <= 0.05
                          ? t.safetyOk
                          : t.safetyHigh}
                        {' '}({(metrics.currentWithdrawalRate * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Account comparison */}
              {result && <AccountComparison result={result} />}

              {/* Detailed results (fees, taxes, 4% rule, yearly table) */}
              {result && (
                <Results
                  result={result}
                  error={null}
                  isCalculating={isCalculating}
                  inputs={inputs}
                  onInputChange={handleInputChange}
                  onCalculate={calculate}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'montecarlo' && (
        <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
          <MonteCarloSimulation onResultChange={setMonteCarloResult} />
        </div>
      )}

      <footer className="text-center text-slate-500 text-xs px-4 py-4 border-t border-slate-200 bg-white">
        {t.disclaimer}
      </footer>
    </div>
  );

  return (
    <>
      {/* Mobile (< lg) */}
      <div className="lg:hidden">
        <MobileLayout />
      </div>

      {/* Desktop (≥ lg) */}
      <div className="hidden lg:block">
        <DesktopLayout />
      </div>
    </>
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
