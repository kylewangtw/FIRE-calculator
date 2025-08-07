import React from 'react';
import { FireInputs } from '../types';

interface InputFormProps {
  inputs: FireInputs;
  onInputChange: (field: keyof FireInputs, value: any) => void;
}

const InputForm: React.FC<InputFormProps> = ({ inputs, onInputChange }) => {
  const formatNumber = (value: number): string => {
    return value.toLocaleString('zh-TW');
  };

  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">FIRE 提領計算器</h2>
      
      {/* 基本參數 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">基本參數</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              第一年度目標提領 (元)
            </label>
            <input
              type="text"
              value={formatNumber(inputs.withdrawal)}
              onChange={(e) => onInputChange('withdrawal', parseNumber(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1,500,000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              通膨率 (%)
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              年期
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              股息殖利率 (%)
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              價格成長率 (%)
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              提領時點
            </label>
            <select
              value={inputs.timing}
              onChange={(e) => onInputChange('timing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="end">期末</option>
              <option value="begin">期初</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* 稅與費用 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">稅與費用</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              總費用率 (%)
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              帳戶型態
            </label>
            <select
              value={inputs.accountType}
              onChange={(e) => onInputChange('accountType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="taxable">一般應稅</option>
              <option value="deferred">延稅</option>
              <option value="taxfree">免稅</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              目標金額模式
            </label>
            <select
              value={inputs.targetMode}
              onChange={(e) => onInputChange('targetMode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gross">稅前提領</option>
              <option value="net">稅後到手</option>
            </select>
          </div>
          
          {inputs.accountType === 'taxable' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  股息利息稅率 (%)
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  資本利得稅率 (%)
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                提領稅率 (%)
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
        <p>• 股息殖利率 + 價格成長率 = 總報酬率</p>
        <p>• 稅率範圍：0-60%</p>
        <p>• 費用率範圍：0-3%</p>
      </div>
    </div>
  );
};

export default InputForm; 