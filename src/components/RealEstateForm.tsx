import React from 'react';
import { FireInputs } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import Tooltip from './Tooltip';

interface RealEstateFormProps {
  inputs: FireInputs;
  onInputChange: (field: keyof FireInputs, value: any) => void;
}

const RealEstateForm: React.FC<RealEstateFormProps> = ({ inputs, onInputChange }) => {
  const { t } = useLanguage();

  if (!inputs.useRealEstate) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.realEstateModule}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Tooltip content={t.propertyValueTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.propertyValue}
            </label>
          </Tooltip>
          <input
            type="number"
            value={inputs.propertyValue}
            onChange={(e) => onInputChange('propertyValue', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="15000000"
          />
        </div>
        
        <div>
          <Tooltip content={t.annualRentTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.annualRent}
            </label>
          </Tooltip>
          <input
            type="number"
            value={inputs.annualRent}
            onChange={(e) => onInputChange('annualRent', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="360000"
          />
        </div>
        
        <div>
          <Tooltip content={t.vacancyRateTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.vacancyRate}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.vacancyRate}
            onChange={(e) => onInputChange('vacancyRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10.0"
          />
        </div>
        
        <div>
          <Tooltip content={t.maintenanceRateTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.maintenanceRate}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.maintenanceRate}
            onChange={(e) => onInputChange('maintenanceRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1.5"
          />
        </div>
        
        <div>
          <Tooltip content={t.propertyGrowthRateTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.propertyGrowthRate}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.propertyGrowthRate}
            onChange={(e) => onInputChange('propertyGrowthRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="3.0"
          />
        </div>
        
        <div>
          <Tooltip content={t.propertyVolatilityTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.propertyVolatility}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.propertyVolatility}
            onChange={(e) => onInputChange('propertyVolatility', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="6.0"
          />
        </div>
        
        <div>
          <Tooltip content={t.mortgageAmountTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.mortgageAmount}
            </label>
          </Tooltip>
          <input
            type="number"
            value={inputs.mortgageAmount}
            onChange={(e) => onInputChange('mortgageAmount', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10000000"
          />
        </div>
        
        <div>
          <Tooltip content={t.mortgageRateTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.mortgageRate}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.mortgageRate}
            onChange={(e) => onInputChange('mortgageRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2.0"
          />
        </div>
        
        <div>
          <Tooltip content={t.mortgageYearsTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.mortgageYears}
            </label>
          </Tooltip>
          <input
            type="number"
            value={inputs.mortgageYears}
            onChange={(e) => onInputChange('mortgageYears', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="20"
          />
        </div>
        
        <div>
          <Tooltip content={t.rentTaxRateTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.rentTaxRate}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.rentTaxRate}
            onChange={(e) => onInputChange('rentTaxRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="15.0"
          />
        </div>
      </div>
    </div>
  );
};

export default RealEstateForm; 