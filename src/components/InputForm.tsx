import React from 'react';
import { FireInputs } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface InputFormProps {
  inputs: FireInputs;
  onInputChange: (field: keyof FireInputs, value: any) => void;
}

const InputForm: React.FC<InputFormProps> = ({ inputs, onInputChange }) => {
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
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
              title={t.firstYearWithdrawalTooltip}
            >
              {t.firstYearWithdrawal}
            </label>
            <input
              type="text"
              value={formatNumber(inputs.withdrawal)}
              onChange={(e) => onInputChange('withdrawal', parseNumber(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t.language === 'zh-TW' ? "1,500,000" : "1,500,000"}
            />
          </div>
          
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
              title={t.inflationRateTooltip}
            >
              {t.inflationRate}
            </label>
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
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
              title={t.yearsTooltip}
            >
              {t.years}
            </label>
            <input
              type="number"
              value={inputs.years}
              onChange={(e) => onInputChange('years', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
          </div>
          
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
              title={t.dividendYieldTooltip}
            >
              {t.dividendYield}
            </label>
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
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
              title={t.priceGrowthTooltip}
            >
              {t.priceGrowth}
            </label>
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
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
              title={t.withdrawalTimingTooltip}
            >
              {t.withdrawalTiming}
            </label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
              title={t.totalFeeRateTooltip}
            >
              {t.totalFeeRate}
            </label>
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
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
              title={t.accountTypeTooltip}
            >
              {t.accountType}
            </label>
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
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
              title={t.targetAmountModeTooltip}
            >
              {t.targetAmountMode}
            </label>
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
                <label 
                  className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
                  title={t.dividendTaxRateTooltip}
                >
                  {t.dividendTaxRate}
                </label>
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
                <label 
                  className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
                  title={t.capitalGainsTaxRateTooltip}
                >
                  {t.capitalGainsTaxRate}
                </label>
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
              <label 
                className="block text-sm font-medium text-gray-700 mb-2 cursor-help"
                title={t.withdrawalTaxRateTooltip}
              >
                {t.withdrawalTaxRate}
              </label>
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