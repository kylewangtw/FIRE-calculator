import { CalculationResult, YearlyData } from '../types';

export const exportToCSV = (result: CalculationResult, language: string): void => {
  const headers = [
    'Year',
    'Beginning Balance',
    'Fees',
    'Dividends',
    'Dividend Tax',
    'Price Growth',
    'Realized Gains',
    'Capital Gains Tax',
    'Withdrawal Tax',
    'Gross Withdrawal',
    'Net Withdrawal',
    'Ending Balance'
  ];

  const csvContent = [
    headers.join(','),
    ...result.yearlyData.map(row => [
      row.year,
      row.beginningBalance,
      row.fees,
      row.dividends,
      row.dividendTax,
      row.priceGrowth,
      row.realizedGains,
      row.capitalGainsTax,
      row.withdrawalTax,
      row.grossWithdrawal,
      row.netWithdrawal,
      row.endingBalance
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `fire-calculator-results-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportSummaryToCSV = (result: CalculationResult, language: string): void => {
  const summary = [
    ['Account Type', 'Required Initial Assets'],
    ['General Taxable', result.taxableRequired],
    ['Tax Deferred', result.deferredRequired],
    ['Tax Free', result.taxfreeRequired],
    [''],
    ['First Year Fees', result.firstYearFees],
    ['First Year Taxes', result.firstYearTaxes],
    ['Four Percent Rule', result.fourPercentRule]
  ];

  const csvContent = summary.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `fire-calculator-summary-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}; 