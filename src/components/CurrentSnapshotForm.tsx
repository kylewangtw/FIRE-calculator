import React from 'react';
import { SnapshotInputs } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { formatCompact } from '../utils/snapshotCalculator';

interface CurrentSnapshotFormProps {
  snapshot: SnapshotInputs;
  onSnapshotChange: (field: keyof SnapshotInputs, value: number) => void;
  onNext: () => void;
}

const CurrentSnapshotForm: React.FC<CurrentSnapshotFormProps> = ({
  snapshot,
  onSnapshotChange,
  onNext,
}) => {
  const { t, language } = useLanguage();

  const netWorth = snapshot.totalAssets - snapshot.totalLiabilities;

  const parseNumber = (value: string): number =>
    parseFloat(value.replace(/,/g, '')) || 0;

  const formatNumber = (value: number): string =>
    value === 0 ? '' : value.toLocaleString(language === 'zh-TW' ? 'zh-TW' : 'en-US');

  const placeholder = language === 'zh-TW' ? '26,100,000' : '800,000';
  const savingsPlaceholder = language === 'zh-TW' ? '1,000,000' : '30,000';
  const currencyPrefix = language === 'zh-TW' ? 'NT$' : '$';

  const inputClass =
    'w-full px-3 py-2.5 border border-slate-300 rounded-[10px] text-[15px] font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12';
  const labelClass = 'block text-[12px] font-semibold text-slate-600 mb-1.5';

  return (
    <div className="px-5 pb-6">
      <div className="mb-5">
        <h2 className="text-[17px] font-black text-slate-900 mb-1">
          {t.yourFinancialStatus}
        </h2>
        <p className="text-[12px] text-slate-500">
          {language === 'zh-TW'
            ? '填入現況，計算距離 FIRE 還有多遠'
            : 'Enter your current situation to see how far you are from FIRE'}
        </p>
      </div>

      <div className="space-y-3 mb-5">
        {/* Total Assets */}
        <div>
          <label className={labelClass}>{t.totalAssets}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-slate-400">
              {currencyPrefix}
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(snapshot.totalAssets)}
              onChange={(e) => onSnapshotChange('totalAssets', parseNumber(e.target.value))}
              className={inputClass}
              placeholder={placeholder}
            />
          </div>
        </div>

        {/* Total Liabilities */}
        <div>
          <label className={labelClass}>{t.totalLiabilities}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-slate-400">
              {currencyPrefix}
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(snapshot.totalLiabilities)}
              onChange={(e) => onSnapshotChange('totalLiabilities', parseNumber(e.target.value))}
              className={inputClass}
              placeholder={language === 'zh-TW' ? '0' : '0'}
            />
          </div>
        </div>

        {/* Annual Savings */}
        <div>
          <label className={labelClass}>
            {t.annualSavings}
            <span className="ml-1 text-slate-400 font-normal">
              {language === 'zh-TW' ? '/年' : '/yr'}
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-slate-400">
              {currencyPrefix}
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(snapshot.annualSavings)}
              onChange={(e) => onSnapshotChange('annualSavings', parseNumber(e.target.value))}
              className={inputClass}
              placeholder={savingsPlaceholder}
            />
          </div>
        </div>
      </div>

      {/* Net Worth Card */}
      {snapshot.totalAssets > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-[14px] px-4 py-3 mb-5">
          <p className="text-[12px] font-bold text-blue-500 mb-0.5">{t.netWorth}</p>
          <p className="text-[28px] font-black text-blue-900 leading-tight">
            {formatCompact(netWorth, language)}
          </p>
          <p className="text-[12px] text-blue-400 mt-0.5">
            {t.netWorthNote} = {netWorth.toLocaleString(language === 'zh-TW' ? 'zh-TW' : 'en-US')}
          </p>
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={onNext}
        className="w-full py-4 bg-blue-600 text-white text-[16px] font-black rounded-[13px] shadow-[0_8px_18px_rgba(37,99,235,0.28)] active:opacity-90 transition-opacity"
      >
        {t.viewMyFireResult}
      </button>
    </div>
  );
};

export default CurrentSnapshotForm;
