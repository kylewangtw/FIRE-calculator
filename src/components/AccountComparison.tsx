import React from 'react';
import { CalculationResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface AccountComparisonProps {
  result: CalculationResult | null;
}

const AccountComparison: React.FC<AccountComparisonProps> = ({ result }) => {
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

  if (!result) {
    return null;
  }

  const accounts = [
    {
      name: t.generalTaxableAccount,
      required: result.taxableRequired,
      color: 'blue'
    },
    {
      name: t.taxDeferredAccount,
      required: result.deferredRequired,
      color: 'green'
    },
    {
      name: t.taxFreeAccount,
      required: result.taxfreeRequired,
      color: 'purple'
    }
  ];

  const minRequired = Math.min(result.taxableRequired, result.deferredRequired, result.taxfreeRequired);
  const maxRequired = Math.max(result.taxableRequired, result.deferredRequired, result.taxfreeRequired);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{t.accountComparison}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account, index) => {
          const percentage = ((account.required - minRequired) / (maxRequired - minRequired)) * 100;
          const isBest = account.required === minRequired;
          const isWorst = account.required === maxRequired;
          
          return (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              isBest ? 'border-green-500 bg-green-50' : 
              isWorst ? 'border-red-500 bg-red-50' : 
              'border-gray-200 bg-gray-50'
            }`}>
              <h4 className={`text-sm font-medium mb-2 ${
                isBest ? 'text-green-800' : 
                isWorst ? 'text-red-800' : 
                'text-gray-700'
              }`}>
                {account.name}
                {isBest && <span className="ml-2 text-xs bg-green-200 px-2 py-1 rounded">{t.best}</span>}
                {isWorst && <span className="ml-2 text-xs bg-red-200 px-2 py-1 rounded">{t.worst}</span>}
              </h4>
              <p className={`text-2xl font-bold ${
                isBest ? 'text-green-900' : 
                isWorst ? 'text-red-900' : 
                'text-gray-900'
              }`}>
                {formatCurrency(account.required)}
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      isBest ? 'bg-green-500' : 
                      isWorst ? 'bg-red-500' : 
                      'bg-blue-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {t.difference}: {formatCurrency(account.required - minRequired)}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">{t.firstYearFees}:</span>
            <span className="ml-2 font-semibold">{formatCurrency(result.firstYearFees)}</span>
          </div>
          <div>
            <span className="text-gray-600">{t.firstYearTaxes}:</span>
            <span className="ml-2 font-semibold">{formatCurrency(result.firstYearTaxes)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountComparison; 