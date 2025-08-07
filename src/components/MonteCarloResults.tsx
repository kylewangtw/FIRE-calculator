import React from 'react';
import { MonteCarloResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface MonteCarloResultsProps {
  result: MonteCarloResult;
}

const MonteCarloResults: React.FC<MonteCarloResultsProps> = ({ result }) => {
  const { t } = useLanguage();

  const formatCurrency = (value: number): string => {
    const locale = t.language === 'zh-TW' ? 'zh-TW' : 'en-US';
    const currency = t.language === 'zh-TW' ? 'TWD' : 'USD';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{t.monteCarlo}</h3>
      
      {/* 成功率與破產機率 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-2">{t.successRate}</h4>
          <p className="text-2xl font-bold text-green-900">{formatPercentage(result.successRate)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-red-800 mb-2">{t.bankruptcyProbability}</h4>
          <p className="text-2xl font-bold text-red-900">{formatPercentage(result.bankruptcyProbability)}</p>
        </div>
      </div>

      {/* 不同情況的所需資產 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">{t.bestCase}</h4>
          <p className="text-xl font-bold text-blue-900">{formatCurrency(result.bestCase)}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">{t.medianCase}</h4>
          <p className="text-xl font-bold text-yellow-900">{formatCurrency(result.medianCase)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-red-800 mb-2">{t.worstCase}</h4>
          <p className="text-xl font-bold text-red-900">{formatCurrency(result.worstCase)}</p>
        </div>
      </div>

      {/* 百分位數分佈 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">百分位數分佈</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-600">5th</p>
            <p className="text-sm font-semibold">{formatCurrency(result.percentiles[0])}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">25th</p>
            <p className="text-sm font-semibold">{formatCurrency(result.percentiles[1])}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">75th</p>
            <p className="text-sm font-semibold">{formatCurrency(result.percentiles[2])}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">95th</p>
            <p className="text-sm font-semibold">{formatCurrency(result.percentiles[3])}</p>
          </div>
        </div>
      </div>

      {/* 風險說明 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">風險說明</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 成功率 {formatPercentage(result.successRate)} 表示在所有模擬中，{formatPercentage(result.successRate)} 的情況下退休計劃會成功</p>
          <p>• 破產機率 {formatPercentage(result.bankruptcyProbability)} 表示在所有模擬中，{formatPercentage(result.bankruptcyProbability)} 的情況下會出現資金耗盡</p>
          <p>• 建議準備至少 {formatCurrency(result.percentiles[2])} (75th percentile) 以應對較差的情況</p>
        </div>
      </div>
    </div>
  );
};

export default MonteCarloResults; 