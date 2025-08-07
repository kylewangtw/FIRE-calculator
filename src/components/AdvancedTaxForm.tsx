import React from 'react';
import { FireInputs, TaxBracket } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import Tooltip from './Tooltip';

interface AdvancedTaxFormProps {
  inputs: FireInputs;
  onInputChange: (field: keyof FireInputs, value: any) => void;
}

const AdvancedTaxForm: React.FC<AdvancedTaxFormProps> = ({ inputs, onInputChange }) => {
  const { t } = useLanguage();

  const addTaxBracket = () => {
    const newBrackets = [...inputs.taxBrackets];
    const lastBracket = newBrackets[newBrackets.length - 1];
    const newMinIncome = lastBracket ? (lastBracket.maxIncome || 0) : 0;
    
    newBrackets.push({
      minIncome: newMinIncome,
      maxIncome: newMinIncome + 1000000,
      rate: 20
    });
    
    onInputChange('taxBrackets', newBrackets);
  };

  const removeTaxBracket = (index: number) => {
    const newBrackets = inputs.taxBrackets.filter((_, i) => i !== index);
    onInputChange('taxBrackets', newBrackets);
  };

  const updateTaxBracket = (index: number, field: keyof TaxBracket, value: any) => {
    const newBrackets = [...inputs.taxBrackets];
    newBrackets[index] = { ...newBrackets[index], [field]: value };
    onInputChange('taxBrackets', newBrackets);
  };

  const updateExemption = (field: keyof typeof inputs.exemptions, value: number) => {
    const newExemptions = { ...inputs.exemptions, [field]: value };
    onInputChange('exemptions', newExemptions);
  };

  const updateWithholdingTax = (field: keyof typeof inputs.withholdingTax, value: any) => {
    const newWithholdingTax = { ...inputs.withholdingTax, [field]: value };
    onInputChange('withholdingTax', newWithholdingTax);
  };

  if (!inputs.useAdvancedTax) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.advancedTaxFeatures}</h3>
      
      {/* Tax Brackets */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <Tooltip content={t.taxBracketsTooltip}>
            <h4 className="text-md font-medium text-gray-600 cursor-help">{t.taxBrackets}</h4>
          </Tooltip>
          <button
            onClick={addTaxBracket}
            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
          >
            {t.addTaxBracket}
          </button>
        </div>
        
        <div className="space-y-2">
          {inputs.taxBrackets.map((bracket, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <input
                type="number"
                value={bracket.minIncome}
                onChange={(e) => updateTaxBracket(index, 'minIncome', parseFloat(e.target.value))}
                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder={t.minIncome}
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={bracket.maxIncome || ''}
                onChange={(e) => updateTaxBracket(index, 'maxIncome', e.target.value ? parseFloat(e.target.value) : null)}
                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder={t.maxIncome}
              />
              <input
                type="number"
                step="0.1"
                value={bracket.rate}
                onChange={(e) => updateTaxBracket(index, 'rate', parseFloat(e.target.value))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder={t.marginalRate}
              />
              <span className="text-gray-500">%</span>
              {inputs.taxBrackets.length > 1 && (
                <button
                  onClick={() => removeTaxBracket(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  {t.removeTaxBracket}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Exemptions */}
      <div className="mb-6">
        <Tooltip content={t.exemptionsTooltip}>
          <h4 className="text-md font-medium text-gray-600 mb-3 cursor-help">{t.exemptions}</h4>
        </Tooltip>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Tooltip content={t.personalExemptionTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.personalExemption}
              </label>
            </Tooltip>
            <input
              type="number"
              value={inputs.exemptions.personalExemption}
              onChange={(e) => updateExemption('personalExemption', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="92000"
            />
          </div>
          
          <div>
            <Tooltip content={t.standardDeductionTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.standardDeduction}
              </label>
            </Tooltip>
            <input
              type="number"
              value={inputs.exemptions.standardDeduction}
              onChange={(e) => updateExemption('standardDeduction', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="124000"
            />
          </div>
          
          <div>
            <Tooltip content={t.dividendExemptionTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.dividendExemption}
              </label>
            </Tooltip>
            <input
              type="number"
              value={inputs.exemptions.dividendExemption}
              onChange={(e) => updateExemption('dividendExemption', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="270000"
            />
          </div>
          
          <div>
            <Tooltip content={t.capitalGainsExemptionTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.capitalGainsExemption}
              </label>
            </Tooltip>
            <input
              type="number"
              value={inputs.exemptions.capitalGainsExemption}
              onChange={(e) => updateExemption('capitalGainsExemption', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="600000"
            />
          </div>
        </div>
      </div>
      
      {/* Withholding Tax */}
      <div className="mb-6">
        <Tooltip content={t.withholdingTaxTooltip}>
          <h4 className="text-md font-medium text-gray-600 mb-3 cursor-help">{t.withholdingTax}</h4>
        </Tooltip>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Tooltip content={t.dividendWithholdingTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.dividendWithholding} (%)
              </label>
            </Tooltip>
            <input
              type="number"
              step="0.1"
              value={inputs.withholdingTax.dividendWithholding}
              onChange={(e) => updateWithholdingTax('dividendWithholding', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="30.0"
            />
          </div>
          
          <div>
            <Tooltip content={t.foreignWithholdingTooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
                {t.foreignWithholding} (%)
              </label>
            </Tooltip>
            <input
              type="number"
              step="0.1"
              value={inputs.withholdingTax.foreignWithholding}
              onChange={(e) => updateWithholdingTax('foreignWithholding', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="15.0"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Tooltip content={t.applyToForeignTooltip}>
            <label className="flex items-center cursor-help">
              <input
                type="checkbox"
                checked={inputs.withholdingTax.applyToForeign}
                onChange={(e) => updateWithholdingTax('applyToForeign', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">{t.applyToForeign}</span>
            </label>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTaxForm; 