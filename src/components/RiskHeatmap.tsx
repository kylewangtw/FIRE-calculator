import React from 'react';
import { RiskHeatmapResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface RiskHeatmapProps {
  result: RiskHeatmapResult;
}

const RiskHeatmap: React.FC<RiskHeatmapProps> = ({ result }) => {
  const { t } = useLanguage();

  const getColor = (bankruptcyRate: number) => {
    if (bankruptcyRate <= 0.05) return 'bg-green-500';
    if (bankruptcyRate <= 0.10) return 'bg-yellow-500';
    if (bankruptcyRate <= 0.20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {t.riskHeatmapTitle}
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          {t.xAxis}：{t.withdrawalRatePercentage} (2-6%) | {t.yAxis}：{t.stockPercentage} (0-100%)
        </p>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-1"></div>
            <span>≤5%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 mr-1"></div>
            <span>5-10%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-500 mr-1"></div>
            <span>10-20%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 mr-1"></div>
            <span>&gt;20%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Without Real Estate Heatmap */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">{t.withoutRealEstate}</h4>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Table Header */}
              <div className="flex">
                <div className="w-16 h-6 flex items-center justify-center text-xs font-medium text-gray-600 border-r border-b border-gray-300">
                  {t.stockPercentage}
                </div>
                {result.withdrawalRates.map((rate) => (
                  <div key={rate} className="w-12 h-6 flex items-center justify-center text-xs font-medium text-gray-600 border-b border-gray-300">
                    {rate.toFixed(1)}%
                  </div>
                ))}
              </div>

              {/* Heatmap Content */}
              {result.stockAllocations.map((stockAlloc, rowIndex) => (
                <div key={stockAlloc} className="flex">
                  <div className="w-16 h-6 flex items-center justify-center text-xs font-medium text-gray-600 border-r border-gray-300">
                    {stockAlloc.toFixed(0)}%
                  </div>
                  {result.withdrawalRates.map((rate, colIndex) => {
                    const bankruptcyRate = result.withoutRealEstate ? result.withoutRealEstate[rowIndex][colIndex] : result.bankruptcyRates[rowIndex][colIndex];
                    return (
                      <div
                        key={`no-re-${stockAlloc}-${rate}`}
                        className={`w-12 h-6 flex items-center justify-center text-xs text-white ${getColor(bankruptcyRate)} cursor-help`}
                        title={`${t.stockPercentage}: ${stockAlloc.toFixed(0)}%, ${t.withdrawalRatePercentage}: ${rate.toFixed(1)}%, ${t.bankruptcyRatePercentage}: ${formatPercentage(bankruptcyRate)}`}
                      >
                        {(bankruptcyRate * 100).toFixed(0)}%
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* With Real Estate Heatmap */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">{t.withRealEstate}</h4>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Table Header */}
              <div className="flex">
                <div className="w-16 h-6 flex items-center justify-center text-xs font-medium text-gray-600 border-r border-b border-gray-300">
                  {t.stockPercentage}
                </div>
                {result.withdrawalRates.map((rate) => (
                  <div key={rate} className="w-12 h-6 flex items-center justify-center text-xs font-medium text-gray-600 border-b border-gray-300">
                    {rate.toFixed(1)}%
                  </div>
                ))}
              </div>

              {/* Heatmap Content */}
              {result.stockAllocations.map((stockAlloc, rowIndex) => (
                <div key={stockAlloc} className="flex">
                  <div className="w-16 h-6 flex items-center justify-center text-xs font-medium text-gray-600 border-r border-gray-300">
                    {stockAlloc.toFixed(0)}%
                  </div>
                  {result.withdrawalRates.map((rate, colIndex) => {
                    const bankruptcyRate = result.bankruptcyRates[rowIndex][colIndex];
                    return (
                      <div
                        key={`with-re-${stockAlloc}-${rate}`}
                        className={`w-12 h-6 flex items-center justify-center text-xs text-white ${getColor(bankruptcyRate)} cursor-help`}
                        title={`${t.stockPercentage}: ${stockAlloc.toFixed(0)}%, ${t.withdrawalRatePercentage}: ${rate.toFixed(1)}%, ${t.bankruptcyRatePercentage}: ${formatPercentage(bankruptcyRate)}`}
                      >
                        {(bankruptcyRate * 100).toFixed(0)}%
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>• {t.riskHeatmapInstructions1}</p>
        <p>• {t.riskHeatmapInstructions2}</p>
        <p>• {t.riskHeatmapInstructions3}</p>
        <p>• {t.riskHeatmapInstructions4}</p>
      </div>
    </div>
  );
};

export default RiskHeatmap; 