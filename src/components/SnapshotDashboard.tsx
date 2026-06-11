import React, { useState } from 'react';
import { CalculationResult, FireInputs, SnapshotInputs } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { SnapshotMetrics, formatCompact } from '../utils/snapshotCalculator';

interface SnapshotDashboardProps {
  snapshot: SnapshotInputs;
  metrics: SnapshotMetrics;
  result: CalculationResult;
  inputs: FireInputs;
  onInputChange: (field: keyof FireInputs, value: any) => void;
  onEditGoal: () => void;
  onEditSnapshot: () => void;
  onViewFullAnalysis: () => void;
  showFullAnalysis: boolean;
}

const DonutGauge: React.FC<{ pct: number; label: string; size?: number }> = ({
  pct,
  label,
  size = 156,
}) => {
  const r = size / 2 - 13;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const clampedPct = Math.min(Math.max(pct, 0), 1);
  const dashOffset = circumference * (1 - clampedPct);
  const displayPct = Math.round(pct * 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90, ${cx}, ${cy})`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eef1f5" strokeWidth={13} />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={clampedPct >= 1 ? '#16a34a' : '#2563eb'}
          strokeWidth={13}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </g>
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontSize={size >= 140 ? 36 : 26}
        fontWeight={900}
        fill="#0f172a"
      >
        {displayPct}%
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3b82f6">
        {label}
      </text>
    </svg>
  );
};

const SafetyBanner: React.FC<{
  rate: number;
  safetyHigh: string;
  safetyOk: string;
  safetyLow: string;
  withdrawalSafety: string;
  language: string;
}> = ({ rate, safetyHigh, safetyOk, safetyLow, withdrawalSafety, language }) => {
  const pct = (rate * 100).toFixed(1);

  if (rate <= 0.04) {
    return (
      <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-[13px] px-4 py-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-lg">
          ✅
        </div>
        <div>
          <p className="text-[13px] font-bold text-green-800">
            {withdrawalSafety}：{safetyLow}
          </p>
          <p className="text-[11px] text-green-700 mt-0.5">
            {language === 'zh-TW'
              ? `若現在退休 = ${pct}% 提領率，在安全範圍內 ≤ 4%`
              : `Retiring now = ${pct}% withdrawal rate, within safe range ≤ 4%`}
          </p>
        </div>
      </div>
    );
  } else if (rate <= 0.05) {
    return (
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-[13px] px-4 py-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-lg">
          ⚠️
        </div>
        <div>
          <p className="text-[13px] font-bold text-amber-800">
            {withdrawalSafety}：{safetyOk}
          </p>
          <p className="text-[11px] text-amber-700 mt-0.5">
            {language === 'zh-TW'
              ? `若現在退休 = ${pct}% 提領率，建議 ≤ 4%`
              : `Retiring now = ${pct}% withdrawal rate, recommended ≤ 4%`}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-[13px] px-4 py-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-lg">
          ⚠️
        </div>
        <div>
          <p className="text-[13px] font-bold text-amber-800">
            {withdrawalSafety}：{safetyHigh}
          </p>
          <p className="text-[11px] text-amber-700 mt-0.5">
            {language === 'zh-TW'
              ? `若現在退休 = ${pct}% 提領率，建議 ≤ 4%`
              : `Retiring now = ${pct}% withdrawal rate, recommended ≤ 4%`}
          </p>
        </div>
      </div>
    );
  }
};

const SnapshotDashboard: React.FC<SnapshotDashboardProps> = ({
  snapshot,
  metrics,
  result,
  inputs,
  onInputChange,
  onEditGoal,
  onEditSnapshot,
  onViewFullAnalysis,
  showFullAnalysis,
}) => {
  const { t, language } = useLanguage();
  const [tuneOpen, setTuneOpen] = useState(false);

  const withdrawalMin = language === 'zh-TW' ? 300000 : 10000;
  const withdrawalMax = language === 'zh-TW' ? 5000000 : 200000;
  const withdrawalStep = language === 'zh-TW' ? 100000 : 5000;

  const formatCurrency = (v: number) => {
    const locale = language === 'zh-TW' ? 'zh-TW' : 'en-US';
    const currency = language === 'zh-TW' ? 'TWD' : 'USD';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(v);
  };

  return (
    <div className="pb-6">
      {/* Edit pills */}
      <div className="flex gap-2 px-5 mb-4">
        <button
          onClick={onEditGoal}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-blue-600 border border-blue-200 bg-blue-50 rounded-[8px] active:opacity-80"
        >
          ✎ {t.editGoal}
        </button>
        <button
          onClick={onEditSnapshot}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-blue-600 border border-blue-200 bg-blue-50 rounded-[8px] active:opacity-80"
        >
          ✎ {t.editSnapshot}
        </button>
      </div>

      {/* Hero donut gauge */}
      <div className="flex flex-col items-center px-5 mb-4">
        <DonutGauge
          pct={metrics.fireAchievementPct}
          label={t.fireAchievement}
          size={156}
        />

        {/* Gap / years */}
        {metrics.gapToTarget > 0 ? (
          <div className="text-center mt-2">
            <p className="text-[22px] font-black text-amber-600">
              {formatCompact(metrics.gapToTarget, language)}
            </p>
            <p className="text-[12px] text-slate-400 mt-0.5">
              {metrics.estYearsToFire > 0 && metrics.estYearsToFire < 999
                ? language === 'zh-TW'
                  ? `依目前儲蓄速度，預估約 ${metrics.estYearsToFire} 年達成`
                  : `At current savings pace, est. ${metrics.estYearsToFire} years to FIRE`
                : language === 'zh-TW'
                ? '距離 FIRE 目標的缺口'
                : 'Gap to FIRE target'}
            </p>
          </div>
        ) : (
          <div className="text-center mt-2">
            <p className="text-[22px] font-black text-green-600">
              {language === 'zh-TW' ? '已達成 FIRE！' : 'FIRE Achieved!'}
            </p>
            <p className="text-[12px] text-slate-400 mt-0.5">
              {language === 'zh-TW'
                ? '你的淨資產已超過目標'
                : 'Your net worth exceeds the target'}
            </p>
          </div>
        )}
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 px-5 mb-4">
        <div className="bg-slate-50 border border-slate-200 rounded-[13px] px-3.5 py-3">
          <p className="text-[11px] font-semibold text-slate-500 mb-1">
            {language === 'zh-TW' ? '所需起始資產' : 'Required Assets'}
          </p>
          <p className="text-[16px] font-black text-slate-900 leading-tight">
            {formatCompact(metrics.targetRequired, language)}
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-[13px] px-3.5 py-3">
          <p className="text-[11px] font-semibold text-slate-500 mb-1">
            {t.netWorth}
            <span className="ml-1 text-blue-500 font-bold">
              ({Math.round(metrics.fireAchievementPct * 100)}%)
            </span>
          </p>
          <p className="text-[16px] font-black text-slate-900 leading-tight">
            {formatCompact(metrics.netWorth, language)}
          </p>
        </div>
      </div>

      {/* Withdrawal safety banner */}
      <div className="px-5 mb-4">
        <SafetyBanner
          rate={metrics.currentWithdrawalRate}
          safetyHigh={t.safetyHigh}
          safetyOk={t.safetyOk}
          safetyLow={t.safetyLow}
          withdrawalSafety={t.withdrawalSafety}
          language={language}
        />
      </div>

      {/* Tune parameters bottom sheet */}
      <div className="mx-5 mb-4 bg-white rounded-[22px] shadow-[0_-4px_20px_rgba(15,23,42,0.10)] border border-slate-100 overflow-hidden">
        <button
          onClick={() => setTuneOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 rounded-full bg-slate-300" />
            <span className="text-[16px] font-black text-slate-900">{t.tuneParameters}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              {t.liveUpdating}
            </span>
            <span className="text-slate-400 text-sm">{tuneOpen ? '▲' : '▼'}</span>
          </div>
        </button>

        {tuneOpen && (
          <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-3">
            {/* Withdrawal slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[12px] font-semibold text-slate-600">
                  {language === 'zh-TW' ? '每年目標提領' : 'Annual Target Withdrawal'}
                </span>
                <span className="text-[13px] font-bold text-blue-600">
                  {formatCurrency(inputs.withdrawal)}
                </span>
              </div>
              <input
                type="range"
                min={withdrawalMin}
                max={withdrawalMax}
                step={withdrawalStep}
                value={inputs.withdrawal}
                onChange={(e) => onInputChange('withdrawal', Number(e.target.value))}
                className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Years slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[12px] font-semibold text-slate-600">
                  {language === 'zh-TW' ? '規劃年期' : 'Planned Years'}
                </span>
                <span className="text-[13px] font-bold text-blue-600">
                  {inputs.years} {language === 'zh-TW' ? '年' : 'yrs'}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={1}
                value={inputs.years}
                onChange={(e) => onInputChange('years', Number(e.target.value))}
                className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Stock allocation slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[12px] font-semibold text-slate-600">
                  {language === 'zh-TW' ? '股票配置' : 'Stock Allocation'}
                </span>
                <span className="text-[13px] font-bold text-blue-600">
                  {inputs.stockAllocation}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={inputs.stockAllocation}
                onChange={(e) => onInputChange('stockAllocation', Number(e.target.value))}
                className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-50 rounded-[9px] px-3 py-2">
              <span className="text-blue-500 text-sm">ⓘ</span>
              <p className="text-[11px] text-slate-500">
                {language === 'zh-TW'
                  ? '蒙地卡羅模擬較耗時，調整後請另外點「重新模擬」'
                  : 'Monte Carlo simulation is slow — click "Re-simulate" after adjusting'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* View full analysis CTA */}
      {!showFullAnalysis && (
        <div className="px-5">
          <button
            onClick={onViewFullAnalysis}
            className="w-full py-4 bg-blue-600 text-white text-[16px] font-black rounded-[13px] shadow-[0_8px_18px_rgba(37,99,235,0.28)] active:opacity-90 transition-opacity"
          >
            {t.viewFullAnalysis}
          </button>
        </div>
      )}
    </div>
  );
};

export default SnapshotDashboard;
