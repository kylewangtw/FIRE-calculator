import React from 'react';
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

const InputForm: React.FC<InputFormProps> = ({ inputs, onInputChange, onCalculate, isCalculating }) => {
  const { t } = useLanguage();
  
  const formatNumber = (value: number): string => {
    return value.toLocaleString(t.language === 'zh-TW' ? 'zh-TW' : 'en-US');
  };

  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.title}</h2>
      
      {/* 基本參數 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.basicParameters}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Tooltip content={t.firstYearWithdrawalTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.firstYearWithdrawal}
              </label>
            </Tooltip>
            <input
              type="text"
              value={formatNumber(inputs.withdrawal)}
              onChange={(e) => onInputChange('withdrawal', parseNumber(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t.language === 'zh-TW' ? "1,500,000" : "1,500,000"}
            />
          </div>
          
          <div>
            <Tooltip content={t.inflationRateTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.inflationRate}
              </label>
            </Tooltip>
            <input
              type="number"
              step="0.1"
              value={inputs.inflation}
              onChange={(e) => onInputChange('inflation', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2.0"
            />
          </div>
          
          <div>
            <Tooltip content={t.yearsTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.years}
              </label>
            </Tooltip>
            <input
              type="number"
              value={inputs.years}
              onChange={(e) => onInputChange('years', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
          </div>
          
          <div>
            <Tooltip content={t.dividendYieldTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.dividendYield}
              </label>
            </Tooltip>
            <input
              type="number"
              step="0.1"
              value={inputs.dividendYield}
              onChange={(e) => onInputChange('dividendYield', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2.0"
            />
          </div>
          
          <div>
            <Tooltip content={t.priceGrowthTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.priceGrowth}
              </label>
            </Tooltip>
            <input
              type="number"
              step="0.1"
              value={inputs.priceGrowth}
              onChange={(e) => onInputChange('priceGrowth', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="3.0"
            />
          </div>
          
          <div>
            <Tooltip content={t.withdrawalTimingTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.withdrawalTiming}
              </label>
            </Tooltip>
            <select
              value={inputs.timing}
              onChange={(e) => onInputChange('timing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="end">{t.endOfPeriod}</option>
              <option value="begin">{t.beginningOfPeriod}</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* 稅與費用 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.taxesAndFees}</h3>
        
        {/* 進階稅務功能開關 */}
        <div className="mb-4">
          <Tooltip content={t.useAdvancedTaxTooltip}>
            <label className="flex items-center cursor-help">
              <input
                type="checkbox"
                checked={inputs.useAdvancedTax}
                onChange={(e) => onInputChange('useAdvancedTax', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">{t.useAdvancedTax}</span>
            </label>
          </Tooltip>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Tooltip content={t.totalFeeRateTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.totalFeeRate}
              </label>
            </Tooltip>
            <input
              type="number"
              step="0.01"
              value={inputs.feeRate}
              onChange={(e) => onInputChange('feeRate', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.25"
            />
          </div>
          
          <div>
            <Tooltip content={t.accountTypeTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.accountType}
              </label>
            </Tooltip>
            <select
              value={inputs.accountType}
              onChange={(e) => onInputChange('accountType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="taxable">{t.generalTaxable}</option>
              <option value="deferred">{t.taxDeferred}</option>
              <option value="taxfree">{t.taxFree}</option>
            </select>
          </div>
          
          <div>
            <Tooltip content={t.targetAmountModeTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.targetAmountMode}
              </label>
            </Tooltip>
            <select
              value={inputs.targetMode}
              onChange={(e) => onInputChange('targetMode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gross">{t.preTaxWithdrawal}</option>
              <option value="net">{t.afterTaxWithdrawal}</option>
            </select>
          </div>
          
          {inputs.accountType === 'taxable' && (
            <>
              <div>
                <Tooltip content={t.dividendTaxRateTooltip}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                    {t.dividendTaxRate}
                  </label>
                </Tooltip>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.dividendTaxRate}
                  onChange={(e) => onInputChange('dividendTaxRate', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="28.0"
                />
              </div>
              
              <div>
                <Tooltip content={t.capitalGainsTaxRateTooltip}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                    {t.capitalGainsTaxRate}
                  </label>
                </Tooltip>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.capitalGainsTaxRate}
                  onChange={(e) => onInputChange('capitalGainsTaxRate', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="15.0"
                />
              </div>
            </>
          )}
          
          {inputs.accountType === 'deferred' && (
            <div>
              <Tooltip content={t.withdrawalTaxRateTooltip}>
                <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                  {t.withdrawalTaxRate}
                </label>
              </Tooltip>
              <input
                type="number"
                step="0.1"
                value={inputs.withdrawalTaxRate}
                onChange={(e) => onInputChange('withdrawalTaxRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="20.0"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* 進階稅務功能 */}
      <AdvancedTaxForm inputs={inputs} onInputChange={onInputChange} />
      


      {/* v2.0 房產模組 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.realEstateModule}</h3>
        
        {/* 房產開關 */}
        <div className="mb-4">
          <Tooltip content={t.useRealEstateTooltip}>
            <label className="flex items-center cursor-help">
              <input
                type="checkbox"
                checked={inputs.useRealEstate}
                onChange={(e) => onInputChange('useRealEstate', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">{t.useRealEstate}</span>
            </label>
          </Tooltip>
        </div>
        
        {inputs.useRealEstate && (
          <div className="text-sm text-gray-600">
            <p>• {t.realEstateInstructions1}</p>
            <p>• {t.realEstateInstructions2}</p>
            <p>• {t.realEstateInstructions3}</p>
          </div>
        )}
      </div>

      {/* 房產表單 */}
      <RealEstateForm inputs={inputs} onInputChange={onInputChange} />

      {/* v2.0 風險熱圖 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.riskHeatmap}</h3>
        
        {/* 風險熱圖開關 */}
        <div className="mb-4">
          <Tooltip content={t.useRiskHeatmapTooltip}>
            <label className="flex items-center cursor-help">
              <input
                type="checkbox"
                checked={inputs.useRiskHeatmap}
                onChange={(e) => onInputChange('useRiskHeatmap', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">{t.useRiskHeatmap}</span>
            </label>
          </Tooltip>
        </div>
        
        {inputs.useRiskHeatmap && (
          <div className="text-sm text-gray-600">
            <p>• {t.riskHeatmapDescription}</p>
            <p>• {t.riskLevelDescription}</p>
            <p>• {t.realEstateImpactTooltip}</p>
          </div>
        )}
      </div>

      {/* Risk Heatmap Form */}
      <RiskHeatmapForm inputs={inputs} onInputChange={onInputChange} />
      
      {/* 驗證提示 */}
      <div className="text-sm text-gray-600">
        <p>• {t.dividendPlusGrowth}</p>
        <p>• {t.taxRateRange}</p>
        <p>• {t.feeRateRange}</p>
      </div>
    </div>
  );
};

export default InputForm; 