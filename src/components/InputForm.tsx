import React, { useState } from 'react';
import { FireInputs } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import AdvancedTaxForm from './AdvancedTaxForm';
import RealEstateForm from './RealEstateForm';
import RiskHeatmapForm from './RiskHeatmapForm';
import Tooltip from './Tooltip';

interface InputFormProps {
  inputs: FireInputs;
  onInputChange: (field: keyof FireInputs, value: any) => void;
  onCalculate: () => Promise<void>;
  isCalculating: boolean;
}

interface CollapsibleSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  open,
  onToggle,
  children,
}) => (
  <div className="bg-slate-50 rounded-[12px] border border-slate-200 overflow-hidden mb-2">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3 text-left"
    >
      <span className="text-[12px] font-bold text-slate-500">{title}</span>
      <span className="text-[12px] text-slate-400">{open ? '收合 ▲' : '展開 ▼'}</span>
    </button>
    {open && (
      <div className="px-4 pb-4 border-t border-slate-200 pt-3">{children}</div>
    )}
  </div>
);

const InputForm: React.FC<InputFormProps> = ({ inputs, onInputChange, onCalculate, isCalculating }) => {
  const { t, language } = useLanguage();
  const [taxOpen, setTaxOpen] = useState(false);
  const [realEstateOpen, setRealEstateOpen] = useState(false);
  const [riskOpen, setRiskOpen] = useState(false);

  const formatNumber = (value: number): string =>
    value === 0 ? '' : value.toLocaleString(language === 'zh-TW' ? 'zh-TW' : 'en-US');

  const parseNumber = (value: string): number =>
    parseFloat(value.replace(/,/g, '')) || 0;

  const inputClass =
    'w-full px-3 py-2.5 border border-slate-300 rounded-[10px] text-[15px] font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white';
  const labelClass = 'block text-[12px] font-semibold text-slate-600 mb-1.5';
  const currencyPrefix = language === 'zh-TW' ? 'NT$' : '$';

  return (
    <div className="px-5 pb-4">
      {/* Title */}
      <div className="mb-5">
        <h2 className="text-[17px] font-black text-slate-900 mb-1">
          {t.yourRetirementGoal}
        </h2>
        <p className="text-[12px] text-slate-500">
          {language === 'zh-TW'
            ? '希望每年從投資組合提領多少？'
            : 'How much do you want to withdraw from your portfolio each year?'}
        </p>
      </div>

      {/* 4 Basic fields */}
      <div className="space-y-3 mb-5">
        {/* Withdrawal */}
        <div>
          <Tooltip content={t.firstYearWithdrawalTooltip}>
            <label className={`${labelClass} cursor-help flex items-center gap-1`}>
              {language === 'zh-TW' ? '第一年度目標提領' : 'First Year Target Withdrawal'}
              <span className="text-[10px] text-slate-400 font-normal border border-slate-300 rounded-full w-4 h-4 flex items-center justify-center">?</span>
            </label>
          </Tooltip>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-slate-400">
              {currencyPrefix}
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(inputs.withdrawal)}
              onChange={(e) => onInputChange('withdrawal', parseNumber(e.target.value))}
              className={`${inputClass} pl-12 pr-10`}
              placeholder={language === 'zh-TW' ? '1,500,000' : '50,000'}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">
              {language === 'zh-TW' ? '/年' : '/yr'}
            </span>
          </div>
        </div>

        {/* Years */}
        <div>
          <Tooltip content={t.yearsTooltip}>
            <label className={`${labelClass} cursor-help flex items-center gap-1`}>
              {language === 'zh-TW' ? '規劃年期' : 'Planned Years'}
              <span className="text-[10px] text-slate-400 font-normal border border-slate-300 rounded-full w-4 h-4 flex items-center justify-center">?</span>
            </label>
          </Tooltip>
          <div className="relative">
            <input
              type="number"
              value={inputs.years}
              onChange={(e) => onInputChange('years', parseInt(e.target.value))}
              className={`${inputClass} pr-10`}
              placeholder="30"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">
              {language === 'zh-TW' ? '年' : 'yrs'}
            </span>
          </div>
        </div>

        {/* Inflation */}
        <div>
          <Tooltip content={t.inflationRateTooltip}>
            <label className={`${labelClass} cursor-help flex items-center gap-1`}>
              {language === 'zh-TW' ? '通膨率' : 'Inflation Rate'}
              <span className="text-[10px] text-slate-400 font-normal border border-slate-300 rounded-full w-4 h-4 flex items-center justify-center">?</span>
            </label>
          </Tooltip>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={inputs.inflation}
              onChange={(e) => onInputChange('inflation', parseFloat(e.target.value))}
              className={`${inputClass} pr-8`}
              placeholder="2.0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">%</span>
          </div>
        </div>

        {/* Account Type */}
        <div>
          <Tooltip content={t.accountTypeTooltip}>
            <label className={`${labelClass} cursor-help flex items-center gap-1`}>
              {t.accountType}
              <span className="text-[10px] text-slate-400 font-normal border border-slate-300 rounded-full w-4 h-4 flex items-center justify-center">?</span>
            </label>
          </Tooltip>
          <select
            value={inputs.accountType}
            onChange={(e) => onInputChange('accountType', e.target.value)}
            className={inputClass}
          >
            <option value="taxable">{t.generalTaxable}</option>
            <option value="deferred">{t.taxDeferred}</option>
            <option value="taxfree">{t.taxFree}</option>
          </select>
        </div>
      </div>

      {/* Advanced Options header */}
      <p className="text-[12px] font-bold text-slate-400 mb-2">{t.advancedOptions}</p>

      {/* Collapsible: Tax & Fees */}
      <CollapsibleSection
        title={t.taxAndFees}
        open={taxOpen}
        onToggle={() => setTaxOpen((v) => !v)}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Tooltip content={t.dividendYieldTooltip}>
                <label className={`${labelClass} cursor-help`}>{t.dividendYield}</label>
              </Tooltip>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={inputs.dividendYield}
                  onChange={(e) => onInputChange('dividendYield', parseFloat(e.target.value))}
                  className={`${inputClass} pr-7`}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">%</span>
              </div>
            </div>
            <div>
              <Tooltip content={t.priceGrowthTooltip}>
                <label className={`${labelClass} cursor-help`}>{t.priceGrowth}</label>
              </Tooltip>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={inputs.priceGrowth}
                  onChange={(e) => onInputChange('priceGrowth', parseFloat(e.target.value))}
                  className={`${inputClass} pr-7`}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Tooltip content={t.totalFeeRateTooltip}>
                <label className={`${labelClass} cursor-help`}>{t.totalFeeRate}</label>
              </Tooltip>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={inputs.feeRate}
                  onChange={(e) => onInputChange('feeRate', parseFloat(e.target.value))}
                  className={`${inputClass} pr-7`}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">%</span>
              </div>
            </div>
            <div>
              <Tooltip content={t.targetAmountModeTooltip}>
                <label className={`${labelClass} cursor-help`}>{t.targetAmountMode}</label>
              </Tooltip>
              <select
                value={inputs.targetMode}
                onChange={(e) => onInputChange('targetMode', e.target.value)}
                className={inputClass}
              >
                <option value="gross">{t.preTaxWithdrawal}</option>
                <option value="net">{t.afterTaxWithdrawal}</option>
              </select>
            </div>
          </div>

          <div>
            <Tooltip content={t.withdrawalTimingTooltip}>
              <label className={`${labelClass} cursor-help`}>{t.withdrawalTiming}</label>
            </Tooltip>
            <select
              value={inputs.timing}
              onChange={(e) => onInputChange('timing', e.target.value)}
              className={inputClass}
            >
              <option value="end">{t.endOfPeriod}</option>
              <option value="begin">{t.beginningOfPeriod}</option>
            </select>
          </div>

          {inputs.accountType === 'taxable' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Tooltip content={t.dividendTaxRateTooltip}>
                  <label className={`${labelClass} cursor-help`}>{t.dividendTaxRate}</label>
                </Tooltip>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.dividendTaxRate}
                    onChange={(e) => onInputChange('dividendTaxRate', parseFloat(e.target.value))}
                    className={`${inputClass} pr-7`}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">%</span>
                </div>
              </div>
              <div>
                <Tooltip content={t.capitalGainsTaxRateTooltip}>
                  <label className={`${labelClass} cursor-help`}>{t.capitalGainsTaxRate}</label>
                </Tooltip>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.capitalGainsTaxRate}
                    onChange={(e) => onInputChange('capitalGainsTaxRate', parseFloat(e.target.value))}
                    className={`${inputClass} pr-7`}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">%</span>
                </div>
              </div>
            </div>
          )}

          {inputs.accountType === 'deferred' && (
            <div>
              <Tooltip content={t.withdrawalTaxRateTooltip}>
                <label className={`${labelClass} cursor-help`}>{t.withdrawalTaxRate}</label>
              </Tooltip>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={inputs.withdrawalTaxRate}
                  onChange={(e) => onInputChange('withdrawalTaxRate', parseFloat(e.target.value))}
                  className={`${inputClass} pr-7`}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">%</span>
              </div>
            </div>
          )}

          {/* Advanced Tax Toggle */}
          <div>
            <Tooltip content={t.useAdvancedTaxTooltip}>
              <label className="flex items-center gap-2 cursor-help">
                <input
                  type="checkbox"
                  checked={inputs.useAdvancedTax}
                  onChange={(e) => onInputChange('useAdvancedTax', e.target.checked)}
                  className="rounded"
                />
                <span className="text-[12px] font-semibold text-slate-600">{t.useAdvancedTax}</span>
              </label>
            </Tooltip>
          </div>

          {inputs.useAdvancedTax && (
            <AdvancedTaxForm inputs={inputs} onInputChange={onInputChange} />
          )}

          <div className="text-[11px] text-slate-500 space-y-0.5">
            <p>• {t.dividendPlusGrowth}</p>
            <p>• {t.taxRateRange}</p>
            <p>• {t.feeRateRange}</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Collapsible: Real Estate */}
      <CollapsibleSection
        title={t.realEstateModule}
        open={realEstateOpen}
        onToggle={() => setRealEstateOpen((v) => !v)}
      >
        <div className="space-y-3">
          <Tooltip content={t.useRealEstateTooltip}>
            <label className="flex items-center gap-2 cursor-help">
              <input
                type="checkbox"
                checked={inputs.useRealEstate}
                onChange={(e) => onInputChange('useRealEstate', e.target.checked)}
                className="rounded"
              />
              <span className="text-[12px] font-semibold text-slate-600">{t.useRealEstate}</span>
            </label>
          </Tooltip>
          {inputs.useRealEstate && <RealEstateForm inputs={inputs} onInputChange={onInputChange} />}
        </div>
      </CollapsibleSection>

      {/* Collapsible: Risk & Allocation */}
      <CollapsibleSection
        title={language === 'zh-TW' ? '風險與資產配置' : 'Risk & Allocation'}
        open={riskOpen}
        onToggle={() => setRiskOpen((v) => !v)}
      >
        <div className="space-y-3">
          <Tooltip content={t.useRiskHeatmapTooltip}>
            <label className="flex items-center gap-2 cursor-help">
              <input
                type="checkbox"
                checked={inputs.useRiskHeatmap}
                onChange={(e) => onInputChange('useRiskHeatmap', e.target.checked)}
                className="rounded"
              />
              <span className="text-[12px] font-semibold text-slate-600">{t.useRiskHeatmap}</span>
            </label>
          </Tooltip>
          {inputs.useRiskHeatmap && <RiskHeatmapForm inputs={inputs} onInputChange={onInputChange} />}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default InputForm;
