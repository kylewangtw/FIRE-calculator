import React from 'react';
import { FireInputs } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import Tooltip from './Tooltip';

interface RiskHeatmapFormProps {
  inputs: FireInputs;
  onInputChange: (field: keyof FireInputs, value: any) => void;
}

const RiskHeatmapForm: React.FC<RiskHeatmapFormProps> = ({ inputs, onInputChange }) => {
  const { t } = useLanguage();

  if (!inputs.useRiskHeatmap) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.riskHeatmapSettings}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Tooltip content={t.stockAllocationTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.stockAllocation}
            </label>
          </Tooltip>
          <input
            type="number"
            step="5"
            value={inputs.stockAllocation}
            onChange={(e) => {
              const stockAlloc = parseFloat(e.target.value);
              onInputChange('stockAllocation', stockAlloc);
              onInputChange('bondAllocation', 100 - stockAlloc);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="60"
          />
        </div>
        
        <div>
          <Tooltip content={t.bondAllocationTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.bondAllocation}
            </label>
          </Tooltip>
          <input
            type="number"
            value={inputs.bondAllocation}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            readOnly
            placeholder="40"
          />
        </div>
        
        <div>
          <Tooltip content={t.stockReturnTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.stockReturn}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.stockReturn}
            onChange={(e) => onInputChange('stockReturn', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="7.0"
          />
        </div>
        
        <div>
          <Tooltip content={t.stockVolatilityTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.stockVolatility}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.stockVolatility}
            onChange={(e) => onInputChange('stockVolatility', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="15.0"
          />
        </div>
        
        <div>
          <Tooltip content={t.bondReturnTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.bondReturn}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.bondReturn}
            onChange={(e) => onInputChange('bondReturn', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="3.0"
          />
        </div>
        
        <div>
          <Tooltip content={t.bondVolatilityTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.bondVolatility}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={inputs.bondVolatility}
            onChange={(e) => onInputChange('bondVolatility', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="6.0"
          />
        </div>
        
        <div>
          <Tooltip content={t.stockBondCorrelationTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.stockBondCorrelation}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.05"
            min="-1"
            max="1"
            value={inputs.stockBondCorrelation}
            onChange={(e) => onInputChange('stockBondCorrelation', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.25"
          />
        </div>
        
        <div>
          <Tooltip content={t.stockPropertyCorrelationTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.stockPropertyCorrelation}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.05"
            min="-1"
            max="1"
            value={inputs.stockPropertyCorrelation}
            onChange={(e) => onInputChange('stockPropertyCorrelation', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.40"
          />
        </div>
        
        <div>
          <Tooltip content={t.bondPropertyCorrelationTooltip}>
            <label className="block text-sm font-medium text-gray-700 mb-2 cursor-help">
              {t.bondPropertyCorrelation}
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.05"
            min="-1"
            max="1"
            value={inputs.bondPropertyCorrelation}
            onChange={(e) => onInputChange('bondPropertyCorrelation', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.10"
          />
        </div>
      </div>
    </div>
  );
};

export default RiskHeatmapForm; 