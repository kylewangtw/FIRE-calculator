import React from 'react';
import { CalculationResult } from '../types';

interface ResultsProps {
  result: CalculationResult | null;
  error: string | null;
}

const Results: React.FC<ResultsProps> = ({ result, error }) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // const formatPercentage = (value: number): string => {
  //   return `${value.toFixed(2)}%`;
  // };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">計算錯誤</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* 卡片結果 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">所需起始資產</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">一般應稅帳戶</h4>
            <p className="text-2xl font-bold text-blue-900">{formatCurrency(result.taxableRequired)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-green-800 mb-2">延稅帳戶</h4>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(result.deferredRequired)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-purple-800 mb-2">免稅帳戶</h4>
            <p className="text-2xl font-bold text-purple-900">{formatCurrency(result.taxfreeRequired)}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">第一年費用</h4>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.firstYearFees)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">第一年稅額</h4>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.firstYearTaxes)}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">4% 法則對照</h4>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.fourPercentRule)}</p>
          <p className="text-sm text-gray-600 mt-1">（僅供參考，未考慮稅負與費用）</p>
        </div>
      </div>

      {/* 年度表 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">年度現金流表</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">期初資產</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">費用</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">股息</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">股息稅</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">價格成長</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">已實現利得</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">資本利得稅</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提領稅</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">稅前提領</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">稅後到手</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">期末資產</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.yearlyData.slice(0, 10).map((yearData) => (
                <tr key={yearData.year} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{yearData.year}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.beginningBalance)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.fees)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.dividends)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.dividendTax)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.priceGrowth)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.realizedGains)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.capitalGainsTax)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.withdrawalTax)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.grossWithdrawal)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.netWithdrawal)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.endingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {result.yearlyData.length > 10 && (
          <p className="text-sm text-gray-600 mt-2">顯示前 10 年，共 {result.yearlyData.length} 年</p>
        )}
      </div>
    </div>
  );
};

export default Results; 